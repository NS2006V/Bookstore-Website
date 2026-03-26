# PageTurn – PHP Backend

Complete REST API backend for the PageTurn bookstore frontend.

---

## Stack
- PHP 8.0+
- MySQL 5.7+ / MariaDB 10.4+
- Apache with `mod_rewrite`

---

## Setup

### 1. Place files
Copy the `pageturn-backend/` folder into your web server root (e.g. `htdocs/` or `www/`).

### 2. Create the database
Open phpMyAdmin or MySQL CLI and run:

```sql
SOURCE /path/to/pageturn-backend/database/schema.sql;
```

This creates the `pageturn_db` database, all tables, sample books, and a default admin account.

### 3. Configure database credentials
Edit `config/database.php` and set:

```php
define('DB_USER', 'your_mysql_username');
define('DB_PASS', 'your_mysql_password');
```

### 4. Enable Apache mod_rewrite
Make sure `AllowOverride All` is set for your vhost/directory so `.htaccess` rules are respected.

### 5. Connect the frontend
In your `pageturn.html`, update the `API_BASE` constant at the top of the `<script>` block:

```js
const API_BASE = 'http://localhost/pageturn-backend/api';
```

---

## Default Admin Account
| Field    | Value               |
|----------|---------------------|
| Email    | admin@pageturn.com  |
| Password | Admin@123           |

**Change this password immediately after first login.**

---

## API Reference

### Authentication
| Method | Endpoint                          | Description          | Auth     |
|--------|-----------------------------------|----------------------|----------|
| POST   | `/api/auth.php?action=register`   | Register new user    | Public   |
| POST   | `/api/auth.php?action=login`      | Login                | Public   |
| POST   | `/api/auth.php?action=logout`     | Logout               | Session  |
| GET    | `/api/auth.php?action=me`         | Current user info    | Required |

### Books
| Method | Endpoint                              | Description             | Auth     |
|--------|---------------------------------------|-------------------------|----------|
| GET    | `/api/books.php`                      | List books (filters OK) | Public   |
| GET    | `/api/books.php?id=5`                 | Single book             | Public   |
| GET    | `/api/books.php?featured=1`           | Featured books          | Public   |
| GET    | `/api/books.php?category=Fiction`     | By category             | Public   |
| GET    | `/api/books.php?search=harry`         | Search books            | Public   |
| POST   | `/api/books.php`                      | Create book             | Admin    |
| PUT    | `/api/books.php?id=5`                 | Update book             | Admin    |
| DELETE | `/api/books.php?id=5`                 | Delete book             | Admin    |

Query params for GET list: `sort` (default/price-low/price-high/rating), `limit`, `offset`

### Orders
| Method | Endpoint                              | Description            | Auth     |
|--------|---------------------------------------|------------------------|----------|
| POST   | `/api/orders.php`                     | Place order            | Optional |
| GET    | `/api/orders.php`                     | My orders              | Required |
| GET    | `/api/orders.php?id=12`               | Order detail           | Required |
| GET    | `/api/orders.php?all=1`               | All orders             | Admin    |
| PUT    | `/api/orders.php?id=12&action=status` | Update status          | Admin    |

### Users
| Method | Endpoint                    | Description   | Auth          |
|--------|-----------------------------|---------------|---------------|
| GET    | `/api/users.php`            | List users    | Admin         |
| GET    | `/api/users.php?id=5`       | User detail   | Admin or Self |
| PUT    | `/api/users.php?id=5`       | Update user   | Admin or Self |
| DELETE | `/api/users.php?id=5`       | Delete user   | Admin         |

### Newsletter
| Method | Endpoint                           | Description  | Auth   |
|--------|------------------------------------|--------------|--------|
| POST   | `/api/newsletter.php`              | Subscribe    | Public |
| DELETE | `/api/newsletter.php?email=x@y.com`| Unsubscribe  | Public |

### Contact
| Method | Endpoint                   | Description      | Auth   |
|--------|----------------------------|------------------|--------|
| POST   | `/api/contact.php`         | Submit message   | Public |
| GET    | `/api/contact.php`         | List messages    | Admin  |
| PUT    | `/api/contact.php?id=3`    | Mark as read     | Admin  |

### Admin Stats
| Method | Endpoint                  | Description       | Auth  |
|--------|---------------------------|-------------------|-------|
| GET    | `/api/admin/stats.php`    | Dashboard KPIs    | Admin |

---

## Place Order – Request Body Example

```json
{
  "items": [
    { "id": 1, "quantity": 2 },
    { "id": 3, "quantity": 1 }
  ],
  "guest_name": "Jane Doe",
  "guest_email": "jane@example.com",
  "shipping_name": "Jane Doe",
  "shipping_address": "123 Main St",
  "shipping_city": "New York",
  "shipping_state": "NY",
  "shipping_zip": "10001",
  "shipping_country": "US",
  "payment_method": "card"
}
```

---

## File Structure

```
pageturn-backend/
├── .htaccess
├── config/
│   ├── database.php       ← DB credentials & PDO singleton
│   └── helpers.php        ← CORS, JSON response, auth helpers
├── api/
│   ├── auth.php           ← register / login / logout / me
│   ├── books.php          ← full CRUD
│   ├── orders.php         ← place & manage orders
│   ├── users.php          ← user management
│   ├── newsletter.php     ← subscribe / unsubscribe
│   ├── contact.php        ← contact form
│   └── admin/
│       └── stats.php      ← dashboard KPIs
└── database/
    └── schema.sql         ← tables + seed data
```
