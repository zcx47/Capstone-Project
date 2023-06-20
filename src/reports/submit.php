<?php 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "daerah_penghijauan";

$data = json_decode(file_get_contents("php://input"), true);

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi database gagal: " . $conn->connect_error);
}

$name = $data['name'];
$email = $data['email'];
$area = $data['area'];
$latitude = $data['latitude'];
$longitude = $data['longitude'];

$sql = "INSERT INTO reported_areas (name, email, area, latitude, longitude)
        VALUES ('$name', '$email', '$area', '$latitude', '$longitude')";

if ($conn->query($sql) === TRUE) {
    http_response_code(200);
} else {
    http_response_code(500);
}

$conn->close();
?>
