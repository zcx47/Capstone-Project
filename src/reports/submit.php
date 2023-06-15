<?php
// Konfigurasi database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "daerah_penghijauan";

// Menerima data dari request
$data = json_decode(file_get_contents("php://input"), true);

// Membuat koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa koneksi database
if ($conn->connect_error) {
    die("Koneksi database gagal: " . $conn->connect_error);
}

// Menyimpan data ke database
$name = $data['name'];
$email = $data['email'];
$area = $data['area'];
$latitude = $data['latitude'];
$longitude = $data['longitude'];

$sql = "INSERT INTO reported_areas (name, email, area, latitude, longitude)
        VALUES ('$name', '$email', '$area', '$latitude', '$longitude')";

if ($conn->query($sql) === TRUE) {
    http_response_code(200); // Respon OK
} else {
    http_response_code(500); // Respon Internal Server Error
}

$conn->close();
?>
