<?php
require_once dirname(__DIR__) . '/includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    nilsca_redirect('/apply.php');
}

if (!nilsca_verify_csrf($_POST['csrf'] ?? null)) {
    nilsca_flash('error', 'Invalid session. Please try again.');
    nilsca_redirect('/apply.php');
}

$required = ['surname', 'other_names', 'email', 'phone', 'business_address', 'home_address', 'license_number', 'nationality', 'state_of_origin', 'lga'];
foreach ($required as $field) {
    if (trim((string) ($_POST[$field] ?? '')) === '') {
        nilsca_flash('error', 'Please fill all required fields.');
        nilsca_redirect('/apply.php');
    }
}

$photoPath = '';
if (!empty($_FILES['photo']['tmp_name']) && is_uploaded_file($_FILES['photo']['tmp_name'])) {
    $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $_FILES['photo']['tmp_name']);
    finfo_close($finfo);
    if (isset($allowed[$mime]) && ($_FILES['photo']['size'] ?? 0) <= 3 * 1024 * 1024) {
        if (!is_dir(NILSCA_UPLOADS . '/applications')) {
            mkdir(NILSCA_UPLOADS . '/applications', 0755, true);
        }
        $name = 'app_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $allowed[$mime];
        $dest = NILSCA_UPLOADS . '/applications/' . $name;
        if (move_uploaded_file($_FILES['photo']['tmp_name'], $dest)) {
            $photoPath = '/uploads/applications/' . $name;
        }
    }
}

$apps = nilsca_applications();
$apps[] = [
    'id' => uniqid('app_', true),
    'created_at' => date('c'),
    'status' => 'pending',
    'surname' => trim($_POST['surname']),
    'other_names' => trim($_POST['other_names']),
    'email' => trim($_POST['email']),
    'phone' => trim($_POST['phone']),
    'business_address' => trim($_POST['business_address']),
    'home_address' => trim($_POST['home_address']),
    'license_number' => trim($_POST['license_number']),
    'nationality' => trim($_POST['nationality']),
    'state_of_origin' => trim($_POST['state_of_origin']),
    'lga' => trim($_POST['lga']),
    'company' => trim((string) ($_POST['company'] ?? '')),
    'photo' => $photoPath,
];

nilsca_write_json('applications.json', ['applications' => $apps]);
nilsca_flash('success', 'Application submitted successfully. The Association will review it.');
nilsca_redirect('/apply.php');
