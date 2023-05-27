// Bagian Navbar
//Togle Class Active
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

//Klik di luar sidebar untuk menghilangkan navbar
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Bagian Maps
var map;

function loadMapScenario() {
  // Buat objek peta
  map = new Microsoft.Maps.Map("#map", {
    credentials: "API_KEY",
  });

  // Tambahkan marker pada peta
  var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-6.15767, 107.02037), {
    title: "Rumah Rizka",
  });
  map.entities.push(pin);

  var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(-6.363091, 106.907207), {
    title: "Rumah Nizam",
  });
  map.entities.push(pin);
}

// Bagian Kalkulator
const CO2_PER_KWH = 0.546; // Kg CO2 / KWh
const CO2_PER_LITER_GASOLINE = 2.392; // Kg CO2 / Liter Bensin
const CO2_PER_LITER_DIESEL = 2.663; // Kg CO2 / Liter Solar

// Fungsi untuk menghitung jejak karbon
function calculateCarbonFootprint(kwh, gasoline, diesel) {
  const kwhCarbon = kwh * CO2_PER_KWH;
  const gasolineCarbon = gasoline * CO2_PER_LITER_GASOLINE;
  const dieselCarbon = diesel * CO2_PER_LITER_DIESEL;

  return kwhCarbon + gasolineCarbon + dieselCarbon;
}

// Mengambil elemen-elemen HTML
const electricityInput = document.getElementById("electricity");
const gasolineInput = document.getElementById("gasoline");
const dieselInput = document.getElementById("diesel");
const calculateButton = document.getElementById("calculate-button");
const resultOutput = document.getElementById("result");

// Menambahkan event listener pada tombol "Hitung Jejak Karbon"
calculateButton.addEventListener("click", function () {
  const kwhUsed = parseFloat(electricityInput.value) || 0;
  const gasolineUsed = parseFloat(gasolineInput.value) || 0;
  const dieselUsed = parseFloat(dieselInput.value) || 0;

  const carbonFootprint = calculateCarbonFootprint(kwhUsed, gasolineUsed, dieselUsed);

  resultOutput.textContent = `Jejak karbon Anda adalah ${carbonFootprint.toFixed(2)} kg CO2-eq`;
});
