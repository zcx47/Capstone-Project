// Bagian Maps
var map;

function loadMapScenario() {
  // Buat objek peta
  map = new Microsoft.Maps.Map("#map", {
    credentials: "API_KEY",
  });

  // Tambahkan marker pada peta
  const pins = [
    { lat: -6.15767, lon: 107.02037, title: "Rumah Rizka" },
    { lat: -6.363091, lon: 106.907207, title: "Rumah Nizam" },
  ];

  for (const pinData of pins) {
    const { lat, lon, title } = pinData;
    var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, lon), { title });
    map.entities.push(pin);
  }
}
