const { v4: uuidv4 } = require("uuid");

const bikes = Array.from({ length: 5 }, (_, i) => ({
  id: `BIKE_0${i + 1}`,
  lat: 39.9334 + Math.random() * 0.05,
  lon: 32.8597 + Math.random() * 0.05,
  battery: Math.floor(Math.random() * 40) + 60,
}));

function generateBikeData(bike) {
  // Slightly move the bike each time
  bike.lat += (Math.random() - 0.5) * 0.001;
  bike.lon += (Math.random() - 0.5) * 0.001;
  bike.battery = Math.max(0, bike.battery - Math.random() * 0.5);

  return {
    bike_id: bike.id,
    lat: parseFloat(bike.lat.toFixed(6)),
    lon: parseFloat(bike.lon.toFixed(6)),
    speed_kmh: parseFloat((Math.random() * 25).toFixed(1)),
    battery: parseFloat(bike.battery.toFixed(1)),
    status: bike.battery > 10 ? "active" : "low_battery",
    timestamp: new Date().toISOString(),
    event_id: uuidv4(),
  };
}

module.exports = { bikes, generateBikeData };
