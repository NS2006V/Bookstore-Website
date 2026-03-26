<?php
// api/admin/stats.php
// GET /api/admin/stats.php  – dashboard KPIs [admin]

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/helpers.php';

requireAdmin();

$db = Database::getInstance()->getConnection();

// Revenue & order counts
$orderStats = $db->query(
    "SELECT
        COUNT(*)                                          AS total_orders,
        SUM(total)                                        AS total_revenue,
        SUM(CASE WHEN status = 'pending'   THEN 1 ELSE 0 END) AS pending_orders,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed_orders,
        SUM(CASE WHEN status = 'shipped'   THEN 1 ELSE 0 END) AS shipped_orders,
        SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders
     FROM orders"
)->fetch();

// Revenue last 30 days
$recent = $db->query(
    "SELECT DATE(created_at) AS day, SUM(total) AS revenue, COUNT(*) AS orders
     FROM orders
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
     GROUP BY DATE(created_at)
     ORDER BY day ASC"
)->fetchAll();

// Top books by units sold
$topBooks = $db->query(
    "SELECT b.id, b.title, b.author, b.category,
            SUM(oi.quantity) AS units_sold,
            SUM(oi.price * oi.quantity) AS revenue
     FROM order_items oi
     JOIN books b ON b.id = oi.book_id
     GROUP BY oi.book_id
     ORDER BY units_sold DESC
     LIMIT 5"
)->fetchAll();

// Totals
$userCount = (int) $db->query('SELECT COUNT(*) FROM users WHERE role = "customer"')->fetchColumn();
$bookCount = (int) $db->query('SELECT COUNT(*) FROM books')->fetchColumn();
$newsCount = (int) $db->query('SELECT COUNT(*) FROM newsletter_subscribers WHERE subscribed = 1')->fetchColumn();
$unreadMsg = (int) $db->query('SELECT COUNT(*) FROM contact_messages WHERE is_read = 0')->fetchColumn();

respondOk('Stats retrieved.', [
    'orders'               => $orderStats,
    'recent_revenue'       => $recent,
    'top_books'            => $topBooks,
    'total_customers'      => $userCount,
    'total_books'          => $bookCount,
    'newsletter_subscribers' => $newsCount,
    'unread_messages'      => $unreadMsg,
]);
