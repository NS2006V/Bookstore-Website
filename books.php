<?php
// api/books.php
// Endpoints:
//   GET    /api/books.php                  – list all (with filters & sort)
//   GET    /api/books.php?id=5             – single book
//   GET    /api/books.php?featured=1       – featured books only
//   GET    /api/books.php?category=Fiction – books by category
//   POST   /api/books.php                  – create book  [admin]
//   PUT    /api/books.php?id=5             – update book  [admin]
//   DELETE /api/books.php?id=5             – delete book  [admin]

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

$db  = Database::getInstance()->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// ── Route ─────────────────────────────────────────────────
switch ($method) {

    // ── GET ───────────────────────────────────────────────
    case 'GET':
        // Single book
        if (!empty($_GET['id'])) {
            $id   = (int) $_GET['id'];
            $stmt = $db->prepare('SELECT * FROM books WHERE id = ?');
            $stmt->execute([$id]);
            $book = $stmt->fetch();
            if (!$book) respondError('Book not found.', 404);
            respondOk('Book retrieved.', ['book' => $book]);
        }

        // Build dynamic query
        $conditions = [];
        $params     = [];

        if (!empty($_GET['featured'])) {
            $conditions[] = 'is_featured = 1';
        }
        if (!empty($_GET['category'])) {
            $conditions[] = 'category = ?';
            $params[]     = sanitize($_GET['category']);
        }
        if (!empty($_GET['search'])) {
            $conditions[] = '(title LIKE ? OR author LIKE ? OR category LIKE ?)';
            $term = '%' . sanitize($_GET['search']) . '%';
            array_push($params, $term, $term, $term);
        }

        $where = $conditions ? 'WHERE ' . implode(' AND ', $conditions) : '';

        // Sort
        $sortMap = [
            'price-low'  => 'price ASC',
            'price-high' => 'price DESC',
            'rating'     => 'rating DESC',
            'default'    => 'id ASC',
        ];
        $sort = $sortMap[$_GET['sort'] ?? 'default'] ?? 'id ASC';

        // Pagination
        $limit  = max(1, min(100, (int)($_GET['limit']  ?? 50)));
        $offset = max(0, (int)($_GET['offset'] ?? 0));

        $countStmt = $db->prepare("SELECT COUNT(*) FROM books $where");
        $countStmt->execute($params);
        $total = (int) $countStmt->fetchColumn();

        $stmt = $db->prepare("SELECT * FROM books $where ORDER BY $sort LIMIT ? OFFSET ?");
        $stmt->execute([...$params, $limit, $offset]);
        $books = $stmt->fetchAll();

        respondOk('Books retrieved.', [
            'books'  => $books,
            'total'  => $total,
            'limit'  => $limit,
            'offset' => $offset,
        ]);
        break;

    // ── POST (create) ─────────────────────────────────────
    case 'POST':
        requireAdmin();
        $body = getBody();

        $required = ['title', 'author', 'category', 'price'];
        foreach ($required as $field) {
            if (empty($body[$field])) respondError("Field '$field' is required.");
        }

        $stmt = $db->prepare(
            'INSERT INTO books
             (title, author, category, price, image, summary, rating, reviews, year, pages, stock, is_featured)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            sanitize($body['title']),
            sanitize($body['author']),
            sanitize($body['category']),
            (float)  $body['price'],
            sanitize($body['image']   ?? ''),
            sanitize($body['summary'] ?? ''),
            (float)  ($body['rating'] ?? 0),
            (int)    ($body['reviews'] ?? 0),
            !empty($body['year'])  ? (int)$body['year']  : null,
            !empty($body['pages']) ? (int)$body['pages'] : null,
            (int)    ($body['stock']      ?? 0),
            (int)    ($body['is_featured'] ?? 0),
        ]);

        $newId = (int) $db->lastInsertId();
        respondOk('Book created.', ['id' => $newId]);
        break;

    // ── PUT (update) ──────────────────────────────────────
    case 'PUT':
        requireAdmin();
        $id = (int)($_GET['id'] ?? 0);
        if (!$id) respondError('Book ID required.');

        $body = getBody();

        $fields = [];
        $params = [];

        $allowed = ['title','author','category','price','image','summary',
                    'rating','reviews','year','pages','stock','is_featured'];

        foreach ($allowed as $col) {
            if (array_key_exists($col, $body)) {
                $fields[] = "$col = ?";
                $params[] = in_array($col, ['price','rating'])
                    ? (float)$body[$col]
                    : (in_array($col, ['reviews','year','pages','stock','is_featured'])
                        ? (int)$body[$col]
                        : sanitize((string)$body[$col]));
            }
        }

        if (!$fields) respondError('No fields to update.');

        $params[] = $id;
        $stmt = $db->prepare('UPDATE books SET ' . implode(', ', $fields) . ' WHERE id = ?');
        $stmt->execute($params);

        respondOk('Book updated.');
        break;

    // ── DELETE ────────────────────────────────────────────
    case 'DELETE':
        requireAdmin();
        $id = (int)($_GET['id'] ?? 0);
        if (!$id) respondError('Book ID required.');

        $stmt = $db->prepare('DELETE FROM books WHERE id = ?');
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) respondError('Book not found.', 404);
        respondOk('Book deleted.');
        break;

    default:
        respondError('Method not allowed.', 405);
}
