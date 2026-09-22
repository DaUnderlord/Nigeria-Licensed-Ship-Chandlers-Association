# NILSCA Website

Premium site for the **Nigeria Licensed Ship Chandlers Association** — public pages + password-protected admin.

## Stack

- PHP 8+ (pages, admin, forms)
- Vite + Tailwind (CSS/JS build)
- JSON file storage under `data/` (no database required)

## Local development

```bash
npm install
npm run build
php -S localhost:8080 router.php
```

- Site: http://localhost:8080  
- Admin: http://localhost:8080/admin/login.php  
- Copy `config.example.php` → `config.php` and set `admin_password`

## Deploy (shared hosting / cPanel) — recommended

This project is built for **PHP shared hosting**, not Vercel.

1. `npm install && npm run build`
2. Upload the project to `public_html` (include `assets/build/`, `data/`, `images/`, `uploads/`, PHP files, `.htaccess`)
3. Create `config.php` from `config.example.php` and set a strong password
4. Make `data/` and `uploads/` writable

## GitHub

Repository: https://github.com/DaUnderlord/Nigeria-Licensed-Ship-Chandlers-Association

## Important: Vercel

**Vercel does not run traditional PHP apps** (no PHP runtime for `index.php`, sessions, or writable JSON on disk).  

To host this exact codebase, use:

- cPanel / shared hosting  
- or a PHP-capable host (Railway, Render, DigitalOcean App Platform with PHP)

If you need **Vercel specifically**, the site must be rebuilt as Next.js (or similar). Ask if you want that migration.
