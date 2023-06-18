<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "daerah_penghijauan";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi database gagal: " . $conn->connect_error);
}

$sql = "SELECT * FROM reported_areas";
$result = $conn->query($sql);
$reportedData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reportedData[] = [
            'name' => $row['name'],
            'email' => $row['email'],
            'area' => $row['area'],
            'latitude' => $row['latitude'],
            'longitude' => $row['longitude']
        ];
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($reportedData);
?>
