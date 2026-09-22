<?php

function nilsca_is_admin(): bool
{
    return !empty($_SESSION['nilsca_admin_ok']);
}

function nilsca_require_admin(): void
{
    if (!nilsca_is_admin()) {
        header('Location: /admin/login.php');
        exit;
    }
}

function nilsca_attempt_login(string $password): bool
{
    $expected = NILSCA_CONFIG['admin_password'] ?? '';
    if ($expected !== '' && hash_equals((string) $expected, $password)) {
        $_SESSION['nilsca_admin_ok'] = true;
        session_regenerate_id(true);
        return true;
    }
    return false;
}

function nilsca_logout(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
}
