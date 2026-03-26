-- ============================================================
-- PageTurn Database Schema
-- Run this file once to set up all tables
-- ============================================================

CREATE DATABASE IF NOT EXISTS pageturn_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE pageturn_db;

-- ----------------------------------------------------------
-- USERS
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(150)        NOT NULL,
    email        VARCHAR(255)        NOT NULL UNIQUE,
    password     VARCHAR(255)        NOT NULL,        -- bcrypt hash
    role         ENUM('customer','admin') NOT NULL DEFAULT 'customer',
    is_active    TINYINT(1)          NOT NULL DEFAULT 1,
    created_at   TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- BOOKS
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS books (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(255)        NOT NULL,
    author       VARCHAR(150)        NOT NULL,
    category     VARCHAR(100)        NOT NULL,
    price        DECIMAL(8,2)        NOT NULL,
    image        VARCHAR(500)        DEFAULT NULL,
    summary      TEXT                DEFAULT NULL,
    rating       DECIMAL(3,2)        NOT NULL DEFAULT 0.00,
    reviews      INT UNSIGNED        NOT NULL DEFAULT 0,
    year         YEAR                DEFAULT NULL,
    pages        SMALLINT UNSIGNED   DEFAULT NULL,
    stock        INT UNSIGNED        NOT NULL DEFAULT 0,
    is_featured  TINYINT(1)          NOT NULL DEFAULT 0,
    created_at   TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- ORDERS
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED        DEFAULT NULL,   -- NULL = guest
    guest_name      VARCHAR(150)        DEFAULT NULL,
    guest_email     VARCHAR(255)        DEFAULT NULL,
    subtotal        DECIMAL(10,2)       NOT NULL,
    shipping        DECIMAL(8,2)        NOT NULL DEFAULT 0.00,
    total           DECIMAL(10,2)       NOT NULL,
    status          ENUM('pending','confirmed','shipped','delivered','cancelled')
                                        NOT NULL DEFAULT 'pending',
    shipping_name   VARCHAR(150)        DEFAULT NULL,
    shipping_address TEXT               DEFAULT NULL,
    shipping_city   VARCHAR(100)        DEFAULT NULL,
    shipping_state  VARCHAR(100)        DEFAULT NULL,
    shipping_zip    VARCHAR(20)         DEFAULT NULL,
    shipping_country VARCHAR(100)       DEFAULT NULL,
    payment_method  VARCHAR(50)         DEFAULT NULL,
    payment_status  ENUM('pending','paid','failed','refunded')
                                        NOT NULL DEFAULT 'pending',
    notes           TEXT                DEFAULT NULL,
    created_at      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user  (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- ORDER ITEMS
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id    INT UNSIGNED        NOT NULL,
    book_id     INT UNSIGNED        DEFAULT NULL,
    title       VARCHAR(255)        NOT NULL,   -- snapshot at order time
    author      VARCHAR(150)        NOT NULL,
    price       DECIMAL(8,2)        NOT NULL,
    quantity    SMALLINT UNSIGNED   NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id)  REFERENCES books(id)  ON DELETE SET NULL
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- NEWSLETTER SUBSCRIBERS
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email       VARCHAR(255)        NOT NULL UNIQUE,
    subscribed  TINYINT(1)          NOT NULL DEFAULT 1,
    created_at  TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- CONTACT MESSAGES
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(150)        NOT NULL,
    email       VARCHAR(255)        NOT NULL,
    subject     VARCHAR(255)        NOT NULL,
    message     TEXT                NOT NULL,
    is_read     TINYINT(1)          NOT NULL DEFAULT 0,
    created_at  TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- SEED: Sample books
-- ----------------------------------------------------------
INSERT INTO books (title, author, category, price, image, summary, rating, reviews, year, pages, stock, is_featured) VALUES
('The Midnight Library', 'Matt Haig', 'Fiction', 16.99,
 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
 'Between life and death there is a library. When Nora Seeds finds herself there, she realises she has a chance to undo every regret.',
 4.7, 2341, 2020, 288, 50, 1),

('Atomic Habits', 'James Clear', 'Self-Help', 18.99,
 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
 'No matter your goals, Atomic Habits offers a proven framework for improving every day.',
 4.9, 5621, 2018, 320, 80, 1),

('Sapiens', 'Yuval Noah Harari', 'Non-Fiction', 19.99,
 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
 'A brief history of humankind — from the Stone Age to the Silicon Age.',
 4.8, 4312, 2011, 443, 60, 1),

('Dune', 'Frank Herbert', 'Science Fiction', 14.99,
 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
 'Set in the distant future, Dune tells the story of young Paul Atreides whose family accepts stewardship of the desert planet Arrakis.',
 4.6, 3872, 1965, 688, 45, 1),

('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 12.99,
 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
 'A portrait of the Jazz Age in all of its excess and glamour.',
 4.5, 1893, 1925, 180, 70, 0),

('Thinking, Fast and Slow', 'Daniel Kahneman', 'Psychology', 17.99,
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
 'Kahneman reveals where we can and cannot trust our intuitions.',
 4.7, 3104, 2011, 499, 55, 1),

('The Name of the Wind', 'Patrick Rothfuss', 'Fantasy', 15.99,
 'https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=400&h=600&fit=crop',
 'A young man grows up to be the most notorious magician, musician, and trickster his world has ever seen.',
 4.8, 2756, 2007, 662, 40, 1),

('The Silent Patient', 'Alex Michaelides', 'Mystery', 14.99,
 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
 'A famous painter shoots her husband and then never speaks another word.',
 4.5, 2198, 2019, 336, 65, 0),

('A Brief History of Time', 'Stephen Hawking', 'Science', 13.99,
 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=600&fit=crop',
 'Hawking takes us on a journey through space and time to unravel the mysteries of the universe.',
 4.6, 1987, 1988, 212, 35, 0),

('Clean Code', 'Robert C. Martin', 'Technology', 39.99,
 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=600&fit=crop',
 'A handbook of agile software craftsmanship — learn to write clean, maintainable code.',
 4.7, 2543, 2008, 431, 30, 1);

-- Default admin user (password: Admin@123)
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@pageturn.com',
 '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Admin@123
 'admin');
