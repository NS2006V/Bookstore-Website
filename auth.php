<?php
// api/auth.php
// POST /api/auth.php?action=register
// POST /api/auth.php?action=login
// POST /api/auth.php?action=logout
// GET  /api/auth.php?action=me

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

$db     = Database::getInstance()->getConnection();
$method = $_SERVER['REQUEST_METHOD'];
$action = sanitize($_GET['action'] ?? '');

switch ($action) {

    // ── REGISTER ──────────────────────────────────────────
    case 'register':
        if ($method !== 'POST') respondError('POST required.', 405);

        $body = getBody();
        $name  = sanitize($body['name']  ?? '');
        $email = sanitizeEmail($body['email'] ?? '');
        $pass  = $body['password'] ?? '';

        if (!$name)  respondError('Name is required.');
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respondError('Invalid email address.');
        if (strlen($pass) < 6) respondError('Password must be at least 6 characters.');

        // Duplicate check
        $stmt = $db->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->execute([$email]);
        if ($stmt->fetch()) respondError('Email already registered.');

        $hash = password_hash($pass, PASSWORD_BCRYPT, ['cost' => 12]);
        $stmt = $db->prepare(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
        );
        $stmt->execute([$name, $email, $hash]);
        $userId = (int) $db->lastInsertId();

        // Auto-login
        $_SESSION['user_id']   = $userId;
        $_SESSION['user_role'] = 'customer';
        $_SESSION['user_name'] = $name;

        respondOk('Registration successful.', [
            'user' => ['id' => $userId, 'name' => $name, 'email' => $email, 'role' => 'customer'],
        ]);
        break;

    // ── LOGIN ─────────────────────────────────────────────
    case 'login':
        if ($method !== 'POST') respondError('POST required.', 405);

        $body  = getBody();
        $email = sanitizeEmail($body['email'] ?? '');
        $pass  = $body['password'] ?? '';

        if (!$email || !$pass) respondError('Email and password are required.');

        $stmt = $db->prepare('SELECT id, name, email, password, role, is_active FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($pass, $user['password'])) {
            respondError('Invalid email or password.', 401);
        }
        if (!$user['is_active']) {
            respondError('Your account has been disabled.', 403);
        }

        $_SESSION['user_id']   = $user['id'];
        $_SESSION['user_role'] = $user['role'];
        $_SESSION['user_name'] = $user['name'];

        respondOk('Login successful.', [
            'user' => [
                'id'    => $user['id'],
                'name'  => $user['name'],
                'email' => $user['email'],
                'role'  => $user['role'],
            ],
        ]);
        break;

    // ── LOGOUT ────────────────────────────────────────────
    case 'logout':
        session_destroy();
        respondOk('Logged out successfully.');
        break;

    // ── ME (current user) ─────────────────────────────────
    case 'me':
        if (!isLoggedIn()) respondError('Not authenticated.', 401);

        $stmt = $db->prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?');
        $stmt->execute([currentUserId()]);
        $user = $stmt->fetch();

        if (!$user) respondError('User not found.', 404);
        respondOk('User data retrieved.', ['user' => $user]);
        break;

    default:
        respondError("Unknown action '$action'.", 400);
}
