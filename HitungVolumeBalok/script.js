// script.js
document.getElementById('cuboidForm').addEventListener('submit', function(event) {
    // Contoh: tambahkan validasi jika diperlukan
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);

    if (length <= 0 || width <= 0 || height <= 0) {
        alert('Panjang, lebar, dan tinggi harus lebih besar dari 0!');
        event.preventDefault();
    }
});