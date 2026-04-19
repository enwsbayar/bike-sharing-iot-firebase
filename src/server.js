const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");
const { bikes, generateBikeData } = require("./simulator");
const { saveBikeData, clearCollection } = require('./firebaseService');

// HTTP server for static files
const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url,
  );
  const ext = path.extname(filePath);
  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentTypes[ext] || "text/plain" });
    res.end(data);
  });
});

// WebSocket server
const wss = new WebSocket.Server({ server });

server.listen(8080, async () => {
  await clearCollection();
  console.log('🚲 Bike Sharing IoT Server started on port 8080');
  console.log('📊 Dashboard: http://localhost:8080');
});

wss.on("connection", (ws) => {
  console.log("✅ New client connected");
  ws.on("close", () => console.log("❌ Client disconnected"));
});

// Send bike data every second
setInterval(() => {
  bikes.forEach((bike) => {
    const data = generateBikeData(bike);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });

    saveBikeData(data);

    console.log(
      `📡 Sent: ${data.bike_id} | Speed: ${data.speed_kmh} km/h | Battery: ${data.battery}% | Status: ${data.status}`,
    );
  });
}, 1000);
