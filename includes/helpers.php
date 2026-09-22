<?php

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function nilsca_asset(string $path): string
{
    $path = ltrim($path, '/');
    $full = NILSCA_ROOT . '/' . $path;
    $v = is_file($full) ? (string) filemtime($full) : (string) time();
    return '/' . $path . '?v=' . $v;
}

function nilsca_active(string $needle): string
{
    $uri = $_SERVER['REQUEST_URI'] ?? '/';
    $path = parse_url($uri, PHP_URL_PATH) ?: '/';
    if ($needle === '/' || $needle === '/index.php') {
        return ($path === '/' || $path === '/index.php') ? 'is-active' : '';
    }
    return str_starts_with($path, $needle) ? 'is-active' : '';
}

function nilsca_csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function nilsca_verify_csrf(?string $token): bool
{
    return is_string($token)
        && !empty($_SESSION['csrf_token'])
        && hash_equals($_SESSION['csrf_token'], $token);
}

function nilsca_redirect(string $url): void
{
    header('Location: ' . $url);
    exit;
}

function nilsca_flash(string $type, string $message): void
{
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

function nilsca_get_flash(): ?array
{
    if (empty($_SESSION['flash'])) {
        return null;
    }
    $flash = $_SESSION['flash'];
    unset($_SESSION['flash']);
    return $flash;
}

function nilsca_initials(string $name): string
{
    $parts = preg_split('/\s+/', trim($name)) ?: [];
    $letters = '';
    foreach (array_slice($parts, 0, 2) as $p) {
        $letters .= strtoupper(substr($p, 0, 1));
    }
    return $letters !== '' ? $letters : 'NA';
}
