document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const bookId = document.getElementById('bookId').value;
    const bookTitle = document.getElementById('bookTitle').value;
    const bookAuthor = document.getElementById('bookAuthor').value;

    const bookData = {
        id: bookId,
        title: bookTitle,
        author: bookAuthor
    };

    if (bookId) {
        updateBook(bookData);
    } else {
        addBook(bookData);
    }
});

function addBook(book) {
    fetch('crud.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'add', book })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadBooks();
        clearForm();
    });
}

function updateBook(book) {
    fetch('crud.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'update', book })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadBooks();
        clearForm();
    });
}

function loadBooks() {
    fetch('crud.php?action=read')
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('bookList');
            bookList.innerHTML = '';
            data.books.forEach(book => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <strong>${book.title}</strong> by ${book.author}
                    <button onclick="editBook(${book.id})">Edit</button>
                    <button onclick="deleteBook(${book.id})">Delete</button>
                `;
                bookList.appendChild(div);
            });
        });
}

function clearForm() {
    document.getElementById('bookId').value = '';
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
}

function editBook(id) {
    // Ambil data buku dan munculkan di formulir
    fetch(`crud.php?action=read&id=${id}`)
        .then(response => response.json())
        .then(data => {
            const book = data.book;
            document.getElementById('bookId').value = book.id;
            document.getElementById('bookTitle').value = book.title;
            document.getElementById('bookAuthor').value = book.author;
        });
}

function deleteBook(id) {
    if (confirm('Yakin ingin menghapus buku ini?')) {
        fetch('crud.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'delete', id })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadBooks();
        });
    }
}

window.onload = loadBooks;