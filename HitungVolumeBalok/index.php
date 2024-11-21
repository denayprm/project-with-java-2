<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Hitung Volume Balok</title>
</head>

<body>
    <div class="container">
        <h1>Hitung Volume Balok</h1>
        <p>Rumus Menghitung Volume Balok : Volume = Panjang x Lebar x Tinggi</p>
        <form id="cuboidForm" method="POST" action="">
            <label for="length">Panjang (cm)</label>
            <input type="number" id="length" name="length" required>
            <label for="width">Lebar (cm)</label>
            <input type="number" id="width" name="width" required>
            <label for="height">Tinggi (cm)</label>
            <input type="number" id="height" name="height" required>
            <button type="submit">Hitung Volume</button>
        </form>

        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $length = $_POST['length'];
            $width = $_POST['width'];
            $height = $_POST['height'];

            $volume = $length * $width * $height;

            echo "<div id='result'>Volume Balok: " . htmlspecialchars($volume) . " cm³</div>";
        }
        ?>
    </div>
    <script src="script.js"></script>
</body>

<p>
    <b>Tugas Siti Maesaroh</b>
</p>



</html>