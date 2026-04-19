const map = L.map('map').setView([39.9334, 32.8597], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

const markers = {};
const bikeData = {};

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  document.getElementById('status').textContent = '● Connected';
  document.getElementById('status').style.color = '#00ff88';
};

ws.onclose = () => {
  document.getElementById('status').textContent = '● Disconnected';
  document.getElementById('status').style.color = '#ff4444';
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  bikeData[data.bike_id] = data;
  updateMap(data);
  updateCards();
};

function updateMap(data) {
  if (markers[data.bike_id]) {
    markers[data.bike_id].setLatLng([data.lat, data.lon]);
  } else {
    markers[data.bike_id] = L.marker([data.lat, data.lon])
      .addTo(map)
      .bindPopup(data.bike_id);
  }
  markers[data.bike_id].setPopupContent(
    `<b>${data.bike_id}</b><br>Speed: ${data.speed_kmh} km/h<br>Battery: ${data.battery}%`
  );
}

function updateCards() {
  const container = document.getElementById('bikes-container');
  container.innerHTML = '';
  Object.values(bikeData).forEach(bike => {
    const isLow = bike.battery < 20;
    container.innerHTML += `
      <div class="bike-card">
        <h3>${bike.bike_id}</h3>
        <p>🚀 Speed: ${bike.speed_kmh} km/h</p>
        <p>📍 ${bike.lat}, ${bike.lon}</p>
        <p>Status: <span class="${isLow ? 'status-low' : 'status-active'}">${bike.status}</span></p>
        <p>🔋 ${bike.battery}%</p>
        <div class="battery-bar">
          <div class="battery-fill" style="width:${bike.battery}%; background:${isLow ? '#ff4444' : '#00ff88'}"></div>
        </div>
      </div>`;
  });
}