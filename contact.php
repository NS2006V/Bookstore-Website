<?php
// api/contact.php
// POST /api/contact.php              – submit contact form
// GET  /api/contact.php              – list messages [admin]
// PUT  /api/contact.php?id=3         – mark as read  [admin]

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

$db     = Database::getInstance()->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $body = getBody();

        $name    = sanitize($body['name']    ?? '');
        $email   = sanitizeEmail($body['email']   ?? '');
        $subject = sanitize($body['subject'] ?? '');
        $message = sanitize($body['message'] ?? '');

        if (!$name)    respondError('Name is required.');
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respondError('Invalid email address.');
        if (!$subject) respondError('Subject is required.');
        if (!$message) respondError('Message is required.');

        $stmt = $db->prepare(
            'INSERT INTO contact_messages (name, email, subject, message)
             VALUES (?, ?, ?, ?)'
        );
        $stmt->execute([$name, $email, $subject, $message]);

        respondOk('Your message has been sent. We\'ll get back to you soon!');
        break;

    case 'GET':
        requireAdmin();

        $limit  = max(1, min(100, (int)($_GET['limit']  ?? 20)));
        $offset = max(0, (int)($_GET['offset'] ?? 0));
        $unread = isset($_GET['unread']);

        $where  = $unread ? 'WHERE is_read = 0' : '';
        $count  = (int) $db->query("SELECT COUNT(*) FROM contact_messages $where")->fetchColumn();

        $stmt = $db->prepare(
            "SELECT * FROM contact_messages $where
             ORDER BY created_at DESC LIMIT ? OFFSET ?"
        );
        $stmt->execute([$limit, $offset]);
        $messages = $stmt->fetchAll();

        respondOk('Messages retrieved.', ['messages' => $messages, 'total' => $count]);
        break;

    case 'PUT':
        requireAdmin();
        $id = (int)($_GET['id'] ?? 0);
        if (!$id) respondError('Message ID required.');

        $stmt = $db->prepare('UPDATE contact_messages SET is_read = 1 WHERE id = ?');
        $stmt->execute([$id]);

        respondOk('Message marked as read.');
        break;

    default:
        respondError('Method not allowed.', 405);
}
