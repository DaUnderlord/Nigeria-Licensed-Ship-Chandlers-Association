<?php
require_once dirname(__DIR__) . '/includes/bootstrap.php';
nilsca_logout();
nilsca_redirect('/admin/login.php');
