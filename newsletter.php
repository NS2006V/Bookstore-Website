<?php
// api/newsletter.php
// POST /api/newsletter.php             – subscribe
// DELETE /api/newsletter.php?email=x  – unsubscribe

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

$db     = Database::getInstance()->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $body  = getBody();
        $email = sanitizeEmail($body['email'] ?? '');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respondError('Please enter a valid email address.');
        }

        // Upsert — re-subscribe if previously unsubscribed
        $stmt = $db->prepare(
            'INSERT INTO newsletter_subscribers (email, subscribed)
             VALUES (?, 1)
             ON DUPLICATE KEY UPDATE subscribed = 1'
        );
        $stmt->execute([$email]);

        respondOk('Thank you for subscribing!');
        break;

    case 'DELETE':
        $email = sanitizeEmail($_GET['email'] ?? '');
        if (!$email) respondError('Email required.');

        $stmt = $db->prepare(
            'UPDATE newsletter_subscribers SET subscribed = 0 WHERE email = ?'
        );
        $stmt->execute([$email]);

        respondOk('You have been unsubscribed.');
        break;

    default:
        respondError('Method not allowed.', 405);
}
