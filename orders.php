<?php
// api/orders.php
// POST   /api/orders.php                       – place a new order
// GET    /api/orders.php                        – list my orders (auth)
// GET    /api/orders.php?id=12                  – single order detail (auth)
// GET    /api/orders.php?all=1                  – all orders [admin]
// PUT    /api/orders.php?id=12&action=status    – update status [admin]

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

$db     = Database::getInstance()->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // ── PLACE ORDER ───────────────────────────────────────
    case 'POST':
        $body = getBody();

        // Items are required
        $items = $body['items'] ?? [];
        if (empty($items) || !is_array($items)) {
            respondError('Order items are required.');
        }

        // Validate each item against the DB
        $validatedItems = [];
        $subtotal = 0.0;

        foreach ($items as $item) {
            $bookId = (int)($item['id'] ?? 0);
            $qty    = max(1, (int)($item['quantity'] ?? 1));

            $stmt = $db->prepare('SELECT id, title, author, price, stock FROM books WHERE id = ?');
            $stmt->execute([$bookId]);
            $book = $stmt->fetch();

            if (!$book) respondError("Book ID $bookId not found.");
            if ($book['stock'] < $qty) {
                respondError("Insufficient stock for \"{$book['title']}\" (available: {$book['stock']}).");
            }

            $validatedItems[] = [
                'book_id'  => $book['id'],
                'title'    => $book['title'],
                'author'   => $book['author'],
                'price'    => (float) $book['price'],
                'quantity' => $qty,
            ];
            $subtotal += $book['price'] * $qty;
        }

        $shipping = 0.00;   // Free shipping
        $total    = $subtotal + $shipping;

        // Shipping address
        $shippingName    = sanitize($body['shipping_name']    ?? '');
        $shippingAddress = sanitize($body['shipping_address'] ?? '');
        $shippingCity    = sanitize($body['shipping_city']    ?? '');
        $shippingState   = sanitize($body['shipping_state']   ?? '');
        $shippingZip     = sanitize($body['shipping_zip']     ?? '');
        $shippingCountry = sanitize($body['shipping_country'] ?? '');
        $paymentMethod   = sanitize($body['payment_method']   ?? 'card');
        $notes           = sanitize($body['notes']            ?? '');

        // Guest info (if not logged in)
        $userId     = currentUserId();
        $guestName  = $userId ? null : sanitize($body['guest_name']  ?? '');
        $guestEmail = $userId ? null : sanitizeEmail($body['guest_email'] ?? '');

        if (!$userId && !filter_var($guestEmail, FILTER_VALIDATE_EMAIL)) {
            respondError('Guest email is required for guest checkout.');
        }

        // Wrap in transaction
        $db->beginTransaction();
        try {
            // Insert order
            $stmt = $db->prepare(
                'INSERT INTO orders
                 (user_id, guest_name, guest_email, subtotal, shipping, total,
                  shipping_name, shipping_address, shipping_city, shipping_state,
                  shipping_zip, shipping_country, payment_method, payment_status, notes)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            );
            $stmt->execute([
                $userId, $guestName, $guestEmail,
                round($subtotal, 2), round($shipping, 2), round($total, 2),
                $shippingName, $shippingAddress, $shippingCity,
                $shippingState, $shippingZip, $shippingCountry,
                $paymentMethod, 'paid',   // mark paid (integrate real payment gateway here)
                $notes,
            ]);
            $orderId = (int) $db->lastInsertId();

            // Insert line items & decrement stock
            $itemStmt = $db->prepare(
                'INSERT INTO order_items (order_id, book_id, title, author, price, quantity)
                 VALUES (?, ?, ?, ?, ?, ?)'
            );
            $stockStmt = $db->prepare(
                'UPDATE books SET stock = stock - ? WHERE id = ?'
            );

            foreach ($validatedItems as $vi) {
                $itemStmt->execute([
                    $orderId, $vi['book_id'], $vi['title'],
                    $vi['author'], $vi['price'], $vi['quantity'],
                ]);
                $stockStmt->execute([$vi['quantity'], $vi['book_id']]);
            }

            $db->commit();

        } catch (Exception $e) {
            $db->rollBack();
            respondError('Failed to place order. Please try again.', 500);
        }

        respondOk('Order placed successfully.', [
            'order_id' => $orderId,
            'total'    => round($total, 2),
            'status'   => 'confirmed',
        ]);
        break;

    // ── GET ───────────────────────────────────────────────
    case 'GET':

        // Admin: all orders
        if (!empty($_GET['all'])) {
            requireAdmin();

            $limit  = max(1, min(100, (int)($_GET['limit']  ?? 20)));
            $offset = max(0, (int)($_GET['offset'] ?? 0));
            $status = sanitize($_GET['status'] ?? '');

            $where  = $status ? 'WHERE o.status = ?' : '';
            $params = $status ? [$status] : [];

            $countStmt = $db->prepare("SELECT COUNT(*) FROM orders o $where");
            $countStmt->execute($params);
            $total = (int) $countStmt->fetchColumn();

            $stmt = $db->prepare(
                "SELECT o.*, u.name AS user_name, u.email AS user_email
                 FROM orders o
                 LEFT JOIN users u ON u.id = o.user_id
                 $where
                 ORDER BY o.created_at DESC
                 LIMIT ? OFFSET ?"
            );
            $stmt->execute([...$params, $limit, $offset]);
            $orders = $stmt->fetchAll();

            respondOk('Orders retrieved.', ['orders' => $orders, 'total' => $total]);
        }

        // Single order
        if (!empty($_GET['id'])) {
            $orderId = (int)$_GET['id'];
            $userId  = currentUserId();

            // Admins can view any order; customers can only view their own
            if (($_SESSION['user_role'] ?? '') === 'admin') {
                $stmt = $db->prepare('SELECT * FROM orders WHERE id = ?');
                $stmt->execute([$orderId]);
            } else {
                requireAuth();
                $stmt = $db->prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?');
                $stmt->execute([$orderId, $userId]);
            }

            $order = $stmt->fetch();
            if (!$order) respondError('Order not found.', 404);

            // Load items
            $iStmt = $db->prepare('SELECT * FROM order_items WHERE order_id = ?');
            $iStmt->execute([$orderId]);
            $order['items'] = $iStmt->fetchAll();

            respondOk('Order retrieved.', ['order' => $order]);
        }

        // My orders (authenticated user)
        requireAuth();
        $userId = currentUserId();
        $stmt   = $db->prepare(
            'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC'
        );
        $stmt->execute([$userId]);
        $orders = $stmt->fetchAll();

        // Attach items to each order
        foreach ($orders as &$order) {
            $iStmt = $db->prepare('SELECT * FROM order_items WHERE order_id = ?');
            $iStmt->execute([$order['id']]);
            $order['items'] = $iStmt->fetchAll();
        }
        unset($order);

        respondOk('My orders retrieved.', ['orders' => $orders]);
        break;

    // ── UPDATE STATUS (admin) ─────────────────────────────
    case 'PUT':
        requireAdmin();
        $orderId = (int)($_GET['id'] ?? 0);
        if (!$orderId) respondError('Order ID required.');

        $body   = getBody();
        $action = sanitize($_GET['action'] ?? 'status');

        $allowed = ['pending','confirmed','shipped','delivered','cancelled'];
        $status  = sanitize($body['status'] ?? '');

        if (!in_array($status, $allowed, true)) {
            respondError('Invalid status value.');
        }

        $stmt = $db->prepare('UPDATE orders SET status = ? WHERE id = ?');
        $stmt->execute([$status, $orderId]);

        if ($stmt->rowCount() === 0) respondError('Order not found.', 404);
        respondOk('Order status updated.', ['status' => $status]);
        break;

    default:
        respondError('Method not allowed.', 405);
}
