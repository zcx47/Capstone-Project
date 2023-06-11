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

  // Mengirimkan data ke server atau melakukan operasi lain sesuai kebutuhan
  // Contoh: Mengirim data menggunakan Ajax ke server
  var data = {
    name: name,
    email: email,
    area: area,
    latitude: latitude,
    longitude: longitude,
  };

  // Mengirimkan data ke server menggunakan Ajax
  // Gantikan URL_API dengan URL endpoint yang sesuai
  var url = "URL_API";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // Menangani respon dari server
      if (xhr.status === 200) {
        // Laporan berhasil dikirim
        showNotification("Laporan berhasil dikirim!", true);
        document.getElementById("reportForm").reset(); // Mengosongkan form setelah berhasil mengirim
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
