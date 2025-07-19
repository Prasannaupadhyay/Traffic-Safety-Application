document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");

  // Login Functionality
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if ((username === 'user' && password === 'pass') || (username === 'admin' && password === 'pass')) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', username); // Store the user role
        window.location.href = "index.html";
      } else {
        alert('Invalid credentials');
      }
    });
  }

  // Logout Functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      window.location.href = "login.html";
    });
  }

  // Redirect if not logged in
  if (!localStorage.getItem("isLoggedIn") && window.location.pathname.includes("index.html")) {
    window.location.href = "login.html";
  }

  // Show admin controls if admin is logged in
  if (localStorage.getItem("userRole") === "admin") {
    document.getElementById('admin-controls').classList.remove('hidden');
  }

  // Navigation Functionality
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      // Remove active class from all links
      navLinks.forEach(lnk => lnk.classList.remove('active'));
      this.classList.add('active');
      // Show the selected section and hide others
      const sectionId = this.getAttribute('data-section');
      document.querySelectorAll('.section').forEach(sec => {
        sec.classList.add('hidden');
      });
      document.getElementById(sectionId).classList.remove('hidden');

      // Show admin controls if on Dashboard and user is admin
      if (sectionId === 'dashboard' && localStorage.getItem('userRole') === 'admin') {
        document.getElementById('admin-controls').classList.remove('hidden');
      }
    });
  });

  // Initialize Map with Leaflet (in the Dashboard)
  let map; // Declare map globally so it can be accessed by other functions
  let markers = []; // Array to store map markers

  function initializeMap() {
    map = L.map('map').setView([27.7172, 85.3240], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Load high-risk zones from localStorage
    updateMapMarkers();
  }

  // Function to update map markers
  function updateMapMarkers() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Load high-risk zones from localStorage
    const riskZones = JSON.parse(localStorage.getItem('riskZones')) || [
      { coords: [27.7200, 85.3200], message: 'Accident-prone intersection near Thapathali.' },
      { coords: [27.7100, 85.3300], message: 'Frequent incidents reported around Teku Crossing.' }
    ];

    // Add new markers to the map
    riskZones.forEach(zone => {
      const marker = L.marker(zone.coords).addTo(map)
        .bindPopup(zone.message);
      markers.push(marker); // Store the marker in the array
    });
  }

  // Function to validate coordinates
  function isValidCoordinates(coords) {
    // Check if the input is in the format "lat, lng"
    const regex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
    return regex.test(coords);
  }

  // Function to add or update high-risk zones
  function addOrUpdateZone() {
    const zoneName = document.getElementById('zone-name').value;
    const zoneCoordsInput = document.getElementById('zone-coords').value;

    // Validate coordinates
    if (!isValidCoordinates(zoneCoordsInput)) {
      alert('Invalid coordinates. Please enter coordinates in the format "lat, lng".');
      return; // Stop execution if coordinates are invalid
    }

    const zoneCoords = zoneCoordsInput.split(',').map(Number);

    if (zoneName && zoneCoords.length === 2) {
      let riskZones = JSON.parse(localStorage.getItem('riskZones')) || [];
      riskZones.push({ coords: zoneCoords, message: zoneName });
      localStorage.setItem('riskZones', JSON.stringify(riskZones));
      alert('Zone added/updated successfully');
      
      // Update the UI dynamically
      loadRiskZones();
      loadZones();
      updateMapMarkers(); // Update the map markers dynamically
    } else {
      alert('Invalid input. Please fill in all fields.');
    }
  }

  // Function to remove a high-risk zone
  function removeZone(index) {
    let riskZones = JSON.parse(localStorage.getItem('riskZones')) || [];
    riskZones.splice(index, 1); // Remove the zone at the specified index
    localStorage.setItem('riskZones', JSON.stringify(riskZones));
    alert('Zone removed successfully');
    
    // Update the UI dynamically
    loadRiskZones();
    loadZones();
    updateMapMarkers(); // Update the map markers dynamically
    window.location.reload();
  }

  // Function to clear localStorage and reset the application
  function clearLocalStorage() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.clear(); // Clear all data in localStorage
      alert('All data has been cleared.');
      window.location.reload(); // Refresh the page to reflect the changes
    }
  }

  // Function to add or update traffic updates
  function addOrUpdateTrafficUpdate() {
    const updateText = document.getElementById('update-text').value;

    if (updateText) {
      let trafficUpdates = JSON.parse(localStorage.getItem('trafficUpdates')) || [];
      trafficUpdates.push(updateText);
      localStorage.setItem('trafficUpdates', JSON.stringify(trafficUpdates));
      alert('Traffic update added/updated successfully');
      
      // Update the UI dynamically
      loadTrafficUpdates();
      loadUpdates();
    } else {
      alert('Invalid input. Please fill in the update text.');
    }
  }

  // Function to remove a traffic update
  function removeUpdate(index) {
    let trafficUpdates = JSON.parse(localStorage.getItem('trafficUpdates')) || [];
    trafficUpdates.splice(index, 1); // Remove the update at the specified index
    localStorage.setItem('trafficUpdates', JSON.stringify(trafficUpdates));
    alert('Traffic update removed successfully');
    
    // Update the UI dynamically
    loadTrafficUpdates();
    loadUpdates();
  }

  // Load traffic updates from localStorage
  function loadTrafficUpdates() {
    const trafficUpdates = JSON.parse(localStorage.getItem('trafficUpdates')) || [];
    const container = document.getElementById('traffic-updates-container');
    container.innerHTML = '';

    trafficUpdates.forEach(update => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <i class="fa-solid fa-triangle-exclamation"></i>
        <div>
          <p><strong>Update:</strong> ${update}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Load high-risk zones from localStorage
  function loadRiskZones() {
    const riskZones = JSON.parse(localStorage.getItem('riskZones')) || [];
    const container = document.getElementById('risk-zones-container');
    container.innerHTML = ''; // Clear existing data

    riskZones.forEach(zone => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <i class="fa-solid fa-skull-crossbones"></i>
            <div>
                <p>${zone.message}</p>
            </div>
        `;
        container.appendChild(card);
    });
  }


  // Load and display existing zones in the Admin Controls section
  function loadZones() {
    const riskZones = JSON.parse(localStorage.getItem('riskZones')) || [];
    const container = document.getElementById('zone-list');
    container.innerHTML = '';

    riskZones.forEach((zone, index) => {
      const zoneItem = document.createElement('div');
      zoneItem.className = 'card';
      zoneItem.innerHTML = `
        <div>
          <p><strong>Zone:</strong> ${zone.message}</p>
          <p><strong>Coordinates:</strong> ${zone.coords.join(', ')}</p>
        </div>
        <button onclick="removeZone(${index})">Remove</button>
      `;
      container.appendChild(zoneItem);
    });
  }

  // Load and display existing traffic updates in the Admin Controls section
  function loadUpdates() {
    const trafficUpdates = JSON.parse(localStorage.getItem('trafficUpdates')) || [];
    const container = document.getElementById('update-list');
    container.innerHTML = '';

    trafficUpdates.forEach((update, index) => {
      const updateItem = document.createElement('div');
      updateItem.className = 'card';
      updateItem.innerHTML = `
        <div>
          <p><strong>Update:</strong> ${update}</p>
        </div>
        <button onclick="removeUpdate(${index})">Remove</button>
      `;
      container.appendChild(updateItem);
    });
  }

  // Call these functions when the page loads
  window.onload = function () {
    // Initialize default data if localStorage is empty
    if (!localStorage.getItem('riskZones')) {
      localStorage.setItem('riskZones', JSON.stringify([
        { coords: [27.7200, 85.3200], message: 'Accident-prone intersection near Thapathali.' },
        { coords: [27.7100, 85.3300], message: 'Frequent incidents reported around Teku Crossing.' }
      ]));
    }

    if (!localStorage.getItem('trafficUpdates')) {
      localStorage.setItem('trafficUpdates', JSON.stringify([
        'Heavy traffic reported near Durbar Marg due to construction work.',
        'Smooth flow on Ring Road.'
      ]));
    }

    // Load data and initialize the map
    initializeMap();
    loadTrafficUpdates();
    loadRiskZones();
    loadZones(); // Load existing zones
    loadUpdates(); // Load existing traffic updates
  };
});