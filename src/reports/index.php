<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GreenTechify</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Nunito:wght@300;500&family=Podkova:wght@500&family=Signika+Negative:wght@500&display=swap" rel="stylesheet" />
    <script src="https://www.bing.com/api/maps/mapcontrol?key=Avnu0ji1_4GO78QnO-6TuZN_vuDCUYQtyqL1QgA3hROdiQGbUn514KyTM0b5ESeb&callback=loadMapScenario" async defer></script>
    
    <script src="https://unpkg.com/feather-icons"></script>
    
    <link rel="stylesheet" href="../styles/style.css" />
    <link rel="stylesheet" href="../styles/responsive.css" />

    <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f2f2f2;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 10%;
      background-color: #fff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin-bottom: 20px;
      text-align: center;
      color: #333;
      font-size: large;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #333;
      font-size: small;
    }

    input[type="text"],
    input[type="email"],
    textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      margin-bottom: 15px;
    }

    #map {
      width: 100%;
      height: 400px;
      margin-bottom: 15px;
    }

    input[type="submit"] {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    input[type="submit"]:hover {
      background-color: #45a049;
    }

    .notification {
      margin-top: 20px;
      text-align: center;
      color: #333;
      font-weight: bold;
    }

    .success {
      color: #4CAF50;
    }

    /* Tampilan loading */
    #loading {
      display: none;
      text-align: center;
      margin-top: 20px;
    }

    #loading img {
      width: 50px;
    }

    #loading p {
      margin-top: 10px;
    }

    /* Tampilan data yang diinputkan */
    #reportedData {
      margin-top: 20px;
      border: 1px solid #ccc;
      padding: 20px;
      background-color: #f9f9f9;
    }

    #reportedData p {
      margin-bottom: 10px;
    }

    #reportedData h3 {
      margin-bottom: 20px;
    }

    @media (max-width: 758px){
      .container {
        padding: 15% 10%;
      }
    }

    @media (max-width: 480px){
      .container {
        padding: 20% 10%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Pelaporan Daerah Penghijauan</h2>
    <form id="reportForm" onsubmit="submitForm(event)">
      <label for="name">Nama:</label>
      <input type="text" id="name" required>

      <label for="email">Email:</label>
      <input type="email" id="email" required>

      <label for="area">Daerah yang Dilaporkan:</label>
      <textarea id="area" required></textarea>

      <label for="location">Lokasi:</label>
      <div id="map"></div>

      <input type="hidden" id="latitude">
      <input type="hidden" id="longitude">

      <input type="submit" value="Submit">
    </form>

    <div id="loading">
      <img src="loading.gif" alt="Loading">
      <p>Sedang mengirim laporan...</p>
    </div>

    <div id="notification" class="notification"></div>

    <div id="reportedData"></div>
  </div>

  <footer class="footer">
    <div class="copyright">
      <p>
        copyright © 2023 <a href="#">GreenTechify</a>
      </p>
    </div>  
  </footer>

  <script src="https://www.bing.com/api/maps/mapcontrol?key=Avnu0ji1_4GO78QnO-6TuZN_vuDCUYQtyqL1QgA3hROdiQGbUn514KyTM0b5ESeb&callback=loadMapScenario" async defer></script>
  <script>
    var map, pushpin;

    function loadMapScenario() {
      map = new Microsoft.Maps.Map(document.getElementById("map"), {
        credentials: "Avnu0ji1_4GO78QnO-6TuZN_vuDCUYQtyqL1QgA3hROdiQGbUn514KyTM0b5ESeb",
        center: new Microsoft.Maps.Location(-6.1754, 106.8272), // Koordinat awal (Jakarta)
        zoom: 12,
      });

      Microsoft.Maps.Events.addHandler(map, "click", function (e) {
        var location = e.location;

        if (pushpin) {
          map.entities.remove(pushpin);
        }

        pushpin = new Microsoft.Maps.Pushpin(location, {
          draggable: true,
        });

        map.entities.push(pushpin);

        document.getElementById("latitude").value = location.latitude;
        document.getElementById("longitude").value = location.longitude;
      });
    }

    function submitForm(event) {
      event.preventDefault(); // Menghentikan submit form agar tidak refresh halaman

      // Mendapatkan nilai dari input
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var area = document.getElementById("area").value;
      var latitude = document.getElementById("latitude").value;
      var longitude = document.getElementById("longitude").value;

      // Menampilkan loading
      showLoading();

      // Mengambil data yang diinputkan
      var data = {
        name: name,
        email: email,
        area: area,
        latitude: latitude,
        longitude: longitude,
      };

      // Mengirimkan data ke server menggunakan Ajax
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "submit.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          // Menangani respon dari server
          if (xhr.status === 200) {
            // Laporan berhasil dikirim
            showNotification("Laporan berhasil dikirim!", true);
            document.getElementById("reportForm").reset(); // Mengosongkan form setelah berhasil mengirim
            fetchReportedData(); // Memperbarui data yang diinputkan
          } else {
            // Laporan gagal dikirim
            showNotification("Gagal mengirim laporan. Silakan coba lagi.", false);
          }
          // Menghilangkan loading
          hideLoading();
        }
      };
      xhr.send(JSON.stringify(data));
    }

    function showLoading() {
      var loading = document.getElementById("loading");
      loading.style.display = "block";
    }

    function hideLoading() {
      var loading = document.getElementById("loading");
      loading.style.display = "none";
    }

    function showNotification(message, isSuccess) {
      var notification = document.getElementById("notification");
      notification.textContent = message;
      notification.classList.remove("success");
      notification.classList.remove("error");

      if (isSuccess) {
        notification.classList.add("success");
      } else {
        notification.classList.add("error");
      }

      // Menghilangkan notifikasi setelah beberapa detik
      setTimeout(function () {
        notification.textContent = "";
      }, 3000);
    }

    function fetchReportedData() {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "fetch.php", true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var reportedData = JSON.parse(xhr.responseText);
          displayReportedData(reportedData);
        }
      };
      xhr.send();
    }

    function displayReportedData(reportedData) {
      var reportedDataContainer = document.getElementById("reportedData");
      reportedDataContainer.innerHTML = "";

      if (reportedData.length > 0) {
        var heading = document.createElement("h3");
        heading.textContent = "Data yang Dilaporkan";
        reportedDataContainer.appendChild(heading);

        reportedData.forEach(function (data) {
          var name = document.createElement("p");
          name.textContent = "Nama: " + data.name;

          var email = document.createElement("p");
          email.textContent = "Email: " + data.email;

          var area = document.createElement("p");
          area.textContent = "Daerah Dilaporkan: " + data.area;

          var latitude = document.createElement("p");
          latitude.textContent = "Latitude: " + data.latitude;

          var longitude = document.createElement("p");
          longitude.textContent = "Longitude: " + data.longitude;

          reportedDataContainer.appendChild(name);
          reportedDataContainer.appendChild(email);
          reportedDataContainer.appendChild(area);
          reportedDataContainer.appendChild(latitude);
          reportedDataContainer.appendChild(longitude);

          var divider = document.createElement("hr");
          reportedDataContainer.appendChild(divider);
        });
      }
    }

    // Memuat data yang diinputkan saat halaman pertama kali dimuat
    fetchReportedData();
  </script>

  <script>
    feather.replace();
  </script>

  <script src="../scripts/index.js"></script>
</body>
</html>
