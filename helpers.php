<?php
// config/helpers.php

session_start();

// ── CORS ──────────────────────────────────────────────────
$allowedOrigins = ['http://localhost', 'http://127.0.0.1', 'http://localhost:8080'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── JSON helpers ──────────────────────────────────────────
function respond(bool $success, string $message, array $data = [], int $code = 200): void {
    http_response_code($code);
    echo json_encode(['success' => $success, 'message' => $message, 'data' => $data], JSON_UNESCAPED_UNICODE);
    exit;
}

function respondOk(string $message = 'OK', array $data = []): void {
    respond(true, $message, $data, 200);
}

function respondError(string $message, int $code = 400): void {
    respond(false, $message, [], $code);
}

// ── Request body ──────────────────────────────────────────
function getBody(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        return $_POST;                  // fall back to form-encoded
    }
    return $data ?? [];
}

// ── Sanitize ──────────────────────────────────────────────
function sanitize(string $value): string {
    return trim(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
}

function sanitizeEmail(string $email): string {
    return filter_var(trim($email), FILTER_SANITIZE_EMAIL);
}

// ── Auth helpers ──────────────────────────────────────────
function isLoggedIn(): bool {
    return isset($_SESSION['user_id']);
}

function requireAuth(): void {
    if (!isLoggedIn()) {
        respondError('Authentication required.', 401);
    }
}

function requireAdmin(): void {
    requireAuth();
    if (($_SESSION['user_role'] ?? '') !== 'admin') {
        respondError('Admin access required.', 403);
    }
}

function currentUserId(): ?int {
    return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
}

// ── JWT-style token (simple, stateless alternative to session) ──
// Kept simple; replace with a proper JWT library in production.
function generateToken(array $payload, string $secret): string {
    $header  = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $body    = base64_encode(json_encode($payload));
    $sig     = hash_hmac('sha256', "$header.$body", $secret);
    return "$header.$body.$sig";
}

function verifyToken(string $token, string $secret): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$header, $body, $sig] = $parts;
    $expected = hash_hmac('sha256', "$header.$body", $secret);
    if (!hash_equals($expected, $sig)) return null;
    $payload = json_decode(base64_decode($body), true);
    if (isset($payload['exp']) && $payload['exp'] < time()) return null;
    return $payload;
}
