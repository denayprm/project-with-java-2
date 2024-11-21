<?php
header('Content-Type: application/json');

$filename = 'data.json';

if (!file_exists($filename)) {
    file_put_contents($filename, json_encode(['books' => []]));
}

$json_data = file_get_contents($filename);
$data = json_decode($json_data, true);

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'add':
        $newBook = $_POST['book'];
        $newBook['id'] = uniqid();
        $data['books'][] = $newBook;
        break;

    case 'update':
        $updatedBook = $_POST['book'];
        foreach ($data['books'] as &$book) {
            if ($book['id'] === $updatedBook['id']) {
                $book['title'] = $updatedBook['title'];
                $book['author'] = $updatedBook['author'];
            }
        }
        break;

    case 'delete':
        $idToDelete = $_POST['id'];
        $data['books'] = array_filter($data['books'], function($book) use ($idToDelete) {
            return $book['id'] !== $idToDelete;
        });
        break;

    case 'read':
        if (isset($_GET['id'])) {
            $bookId = $_GET['id'];
            foreach ($data['books'] as $book) {
                if ($book['id'] === $bookId) {
                    echo json_encode(['book' => $book]);
                    exit;
                }
            }
        }
        echo json_encode(['books' => $data['books']]);
        exit;
}

file_put_contents($filename, json_encode($data));
echo json_encode(['message' => 'Operasi berhasil!']);
?>