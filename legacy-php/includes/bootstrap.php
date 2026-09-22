<?php
$root = dirname(__DIR__);
$configFile = $root . '/config.php';
if (!is_file($configFile)) {
    $configFile = $root . '/config.example.php';
}
$config = require $configFile;

date_default_timezone_set($config['timezone'] ?? 'Africa/Lagos');

define('NILSCA_ROOT', $root);
define('NILSCA_DATA', NILSCA_ROOT . '/data');
define('NILSCA_UPLOADS', NILSCA_ROOT . '/uploads');
define('NILSCA_CONFIG', $config);

if (session_status() === PHP_SESSION_NONE) {
    session_name($config['session_name'] ?? 'nilsca_admin');
    session_start();
}

require_once NILSCA_ROOT . '/includes/store.php';
require_once NILSCA_ROOT . '/includes/auth.php';
require_once NILSCA_ROOT . '/includes/helpers.php';
