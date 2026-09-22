<?php
// Router for PHP built-in server: php -S localhost:8080 router.php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . $path;

if ($path !== '/' && is_file($file)) {
    return false;
}

if ($path === '/' || $path === '') {
    require __DIR__ . '/index.php';
    return true;
}

$php = __DIR__ . $path;
if (is_file($php) && str_ends_with($php, '.php')) {
    require $php;
    return true;
}

http_response_code(404);
echo '404 Not Found';
return true;
