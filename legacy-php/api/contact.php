<?php
require_once dirname(__DIR__) . '/includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    nilsca_redirect('/contact.php');
}

if (!nilsca_verify_csrf($_POST['csrf'] ?? null)) {
    nilsca_flash('error', 'Invalid session. Please try again.');
    nilsca_redirect('/contact.php');
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    nilsca_flash('error', 'Please fill all required fields.');
    nilsca_redirect('/contact.php');
}

$items = nilsca_inquiries();
$items[] = [
    'id' => uniqid('inq_', true),
    'created_at' => date('c'),
    'status' => 'new',
    'name' => $name,
    'email' => $email,
    'subject' => $subject,
    'message' => $message,
];

nilsca_write_json('inquiries.json', ['inquiries' => $items]);
nilsca_flash('success', 'Thank you. Your message has been received.');
nilsca_redirect('/contact.php');
