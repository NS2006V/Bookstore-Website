<?php
// api/users.php
// GET    /api/users.php            – list all users    [admin]
// GET    /api/users.php?id=5       – single user       [admin or self]
// PUT    /api/users.php?id=5       – update profile    [admin or self]
// DELETE /api/users.php?id=5       – delete user       [admin]

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

$db     = Database::getInstance()->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // ── LIST / SINGLE ─────────────────────────────────────
    case 'GET':
        requireAuth();

        if (!empty($_GET['id'])) {
            $id = (int)$_GET['id'];

            // Users can only fetch their own record unless admin
            if (($_SESSION['user_role'] ?? '') !== 'admin' && $id !== currentUserId()) {
                respondError('Forbidden.', 403);
            }

            $stmt = $db->prepare(
                'SELECT id, name, email, role, is_active, created_at FROM users WHERE id = ?'
            );
            $stmt->execute([$id]);
            $user = $stmt->fetch();
            if (!$user) respondError('User not found.', 404);
            respondOk('User retrieved.', ['user' => $user]);
        }

        // List all — admin only
        requireAdmin();
        $limit  = max(1, min(100, (int)($_GET['limit']  ?? 50)));
        $offset = max(0, (int)($_GET['offset'] ?? 0));

        $count = (int) $db->query('SELECT COUNT(*) FROM users')->fetchColumn();
        $stmt  = $db->prepare(
            'SELECT id, name, email, role, is_active, created_at
             FROM users
             ORDER BY created_at DESC
             LIMIT ? OFFSET ?'
        );
        $stmt->execute([$limit, $offset]);
        $users = $stmt->fetchAll();

        respondOk('Users retrieved.', ['users' => $users, 'total' => $count]);
        break;

    // ── UPDATE ────────────────────────────────────────────
    case 'PUT':
        requireAuth();
        $id = (int)($_GET['id'] ?? 0);
        if (!$id) respondError('User ID required.');

        $isAdmin = ($_SESSION['user_role'] ?? '') === 'admin';
        if (!$isAdmin && $id !== currentUserId()) respondError('Forbidden.', 403);

        $body   = getBody();
        $fields = [];
        $params = [];

        if (!empty($body['name'])) {
            $fields[] = 'name = ?';
            $params[] = sanitize($body['name']);
        }
        if (!empty($body['email'])) {
            $email = sanitizeEmail($body['email']);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respondError('Invalid email.');
            // Check duplicate
            $chk = $db->prepare('SELECT id FROM users WHERE email = ? AND id != ?');
            $chk->execute([$email, $id]);
            if ($chk->fetch()) respondError('Email already taken.');
            $fields[] = 'email = ?';
            $params[] = $email;
        }
        if (!empty($body['password'])) {
            if (strlen($body['password']) < 6) respondError('Password too short (min 6 chars).');
            $fields[] = 'password = ?';
            $params[] = password_hash($body['password'], PASSWORD_BCRYPT, ['cost' => 12]);
        }
        // Admin-only fields
        if ($isAdmin) {
            if (isset($body['role']) && in_array($body['role'], ['customer','admin'], true)) {
                $fields[] = 'role = ?';
                $params[] = $body['role'];
            }
            if (isset($body['is_active'])) {
                $fields[] = 'is_active = ?';
                $params[] = (int)(bool)$body['is_active'];
            }
        }

        if (!$fields) respondError('No fields to update.');

        $params[] = $id;
        $stmt = $db->prepare('UPDATE users SET ' . implode(', ', $fields) . ' WHERE id = ?');
        $stmt->execute($params);

        respondOk('User updated.');
        break;

    // ── DELETE ────────────────────────────────────────────
    case 'DELETE':
        requireAdmin();
        $id = (int)($_GET['id'] ?? 0);
        if (!$id) respondError('User ID required.');

        // Prevent self-deletion
        if ($id === currentUserId()) respondError('You cannot delete your own account.');

        $stmt = $db->prepare('DELETE FROM users WHERE id = ?');
        $stmt->execute([$id]);
        if ($stmt->rowCount() === 0) respondError('User not found.', 404);

        respondOk('User deleted.');
        break;

    default:
        respondError('Method not allowed.', 405);
}
