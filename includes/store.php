<?php

function nilsca_read_json(string $filename, $default = [])
{
    $path = NILSCA_DATA . '/' . ltrim($filename, '/');
    if (!is_file($path)) {
        return $default;
    }
    $raw = file_get_contents($path);
    if ($raw === false || $raw === '') {
        return $default;
    }
    $data = json_decode($raw, true);
    return json_last_error() === JSON_ERROR_NONE ? $data : $default;
}

function nilsca_write_json(string $filename, $data): bool
{
    if (!is_dir(NILSCA_DATA)) {
        mkdir(NILSCA_DATA, 0755, true);
    }
    $path = NILSCA_DATA . '/' . ltrim($filename, '/');
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        return false;
    }
    $tmp = $path . '.tmp';
    if (file_put_contents($tmp, $json . "\n", LOCK_EX) === false) {
        return false;
    }
    return rename($tmp, $path);
}

function nilsca_content(): array
{
    return nilsca_read_json('content.json', []);
}

function nilsca_members(): array
{
    $data = nilsca_read_json('members.json', ['members' => []]);
    return $data['members'] ?? [];
}

function nilsca_executives(): array
{
    $data = nilsca_read_json('executives.json', ['executives' => []]);
    return $data['executives'] ?? [];
}

function nilsca_applications(): array
{
    $data = nilsca_read_json('applications.json', ['applications' => []]);
    return $data['applications'] ?? [];
}

function nilsca_inquiries(): array
{
    $data = nilsca_read_json('inquiries.json', ['inquiries' => []]);
    return $data['inquiries'] ?? [];
}

function nilsca_media(): array
{
    return nilsca_read_json('media.json', ['files' => []]);
}
