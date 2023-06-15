var map, infobox;

function loadMapScenario() {
  // Buat objek peta
  map = new Microsoft.Maps.Map("#map", {
    credentials: "Avnu0ji1_4GO78QnO-6TuZN_vuDCUYQtyqL1QgA3hROdiQGbUn514KyTM0b5ESeb",
    // mapTypeId: Microsoft.Maps.MapTypeId.aerial,
    zoom: 5,
    customMapStyle: {
      elements: {
        area: { fillColor: "#b6e591" },
        water: { fillColor: "#75cff0" },
        tollRoad: { fillColor: "#a964f4", strokeColor: "#a964f4" },
        arterialRoad: { fillColor: "#ffffff", strokeColor: "#d7dae7" },
        road: { fillColor: "#ffa35a", strokeColor: "#ff9c4f" },
        street: { fillColor: "#ffffff", strokeColor: "#ffffff" },
        transit: { fillColor: "#000000" },
      },
      settings: {
        landColor: 318162,
      },
    },
  });

  // Buat infobox di tengah peta namun jangan tampilkan.
  infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
    visible: false,
  });

  // Assign infobox ke objek peta.
  infobox.setMap(map);

  // Tambahkan marker pada peta
  const pins = [
    { lat: -7.3064464, lon: 112.8007539, title: "Ekowisata Mangrove Wonorejo", description: "Jawa Timur" },
    { lat: -4.8639876, lon: 105.6084852, title: "Taman Nasional Way Kambas", description: "Lampung" },
    { lat: -8.361369, lon: 114.624172, title: "Kabupaten Jembrana" },
    { lat: -7.7592862, lon: 111.9236133, title: "Gunung  Sawur", description: "Jawa Timur" },
    { lat: -7.6391252, lon: 110.9747409, title: "Hutan Desa Kembang Jawa Tengah ", description: "Jawa Tengah" },
    { lat: -8.0080291, lon: 110.2806377, title: "Pantai Baros", description: "DIY" },
    { lat: -7.3899785, lon: 110.359978, title: "Gunung Andong", description: "Jawa Tengah" },
    { lat: -7.0806266, lon: 110.4327588, title: "Jabungan", description: "Jawa Tengah" },
    { lat: -6.9376782, lon: 110.2769424, title: "Pantai Mangunharjo", description: "Jawa Tengah" },
    { lat: -7.6632325, lon: 108.8030573, title: "Kampung Laut", description: "Jawa Tengah" },
    { lat: -7.7411715, lon: 108.6830108, title: "Pantai Alam", description: "Jawa Tengah" },
    { lat: -6.8080635, lon: 108.8018893, title: "Kawasan Hutan Mangrove Ambulu", description: "Jawa Timur" },
    { lat: -7.1064531, lon: 107.6365878, title: "Awi Poleng", description: "Jawa Barat" },
    { lat: -6.8963452, lon: 107.3922995, title: "Talaga Sunda", description: "Jawa Barat" },
    { lat: -6.1815766, lon: 107.559371, title: "Pantai Tangkolak", description: "Jawa Timur" },
    { lat: -6.3518432, lon: 106.8976345, title: "Hutan Kota Munjul", description: "DKI Jakarta" },
    { lat: -0.7571579, lon: 109.4563355, title: "Desa Batu Ampar", description: "Kalimantan Barat" },
    { lat: -2.9950556, lon: 111.5748911, title: "Kecamatan Kumai", description: "Kalimantan Tengah" },
    { lat: -2.7785905, lon: 111.6784301, title: "Sungai Sintuk", description: "Kalimantan Tengah" },
    { lat: -3.0633956, lon: 112.2597446, title: "Tatah Ji", description: "Kalimantan Tengah Kab.Seruyan" },
    { lat: 1.5934513, lon: 124.8350401, title: "Pantai Tiwoho", description: "Kabupaten Minahasa Utara" },
    { lat: 0.9328658, lon: 120.2473558, title: "Pesisir Ogotua", description: "Sulawesi Tengah Kabupaten Toli-toli" },
    { lat: -3.9585356, lon: 119.5675656, title: "Pantai Lowita", description: "Kabupaten Pinrang" },
    { lat: -5.0677516, lon: 119.4656536, title: "Pesisir Untia", description: "Sulawesi Selatan Kota Makassar" },
    { lat: -5.137722, lon: 119.452722, title: "Pusat Kawasan Lingkungan Hidup", description: "Sulawesi Selatan Kabupaten Takalar" },
    { lat: -5.0786732, lon: 119.4647147, title: "Ekowisata Mangrove Hubbat", description: "Sulawesi Selatan Kabupaten Sinjai" },
    { lat: -5.8792339, lon: 117.8868514, title: "Pulau Sumanga", description: "Sulawesi Selatan Kabupaten Wakatobi" },
    { lat: -2.812722, lon: 108.283695, title: "Pesisir Belitung", description: "Bangka Belitung Kabupaten Belitung Timur" },
  ];

  for (const pinData of pins) {
    const { lat, lon, title, description } = pinData;
    var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, lon), { title, icon: "./src/public/image/pin.png" });

    // Tambahkan metadata ke pushpin.
    pin.metadata = {
      title: title,
      description: description,
    };

    // Tambahkan event click handler ke pushpin.
    Microsoft.Maps.Events.addHandler(pin, "click", pushpinClicked);

    // Tambahkan pushpin ke peta.
    map.entities.push(pin);
  }
}

function pushpinClicked(e) {
  // Pastikan infobox memiliki metadata untuk ditampilkan.
  if (e.target.metadata) {
    // Set opsi infobox dengan metadata dari pushpin.
    infobox.setOptions({
      location: e.target.getLocation(),
      title: e.target.metadata.title,
      description: e.target.metadata.description,
      visible: true,
    });
  }
}
