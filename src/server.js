const WebSocket = require("ws");
const { bikes, generateBikeData } = require("./simulator");
const { sendToKinesis } = require("./firebaseService");

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`🚲 Bike Sharing IoT Server started on port ${PORT}`);

wss.on("connection", (ws) => {
  console.log("✅ New client connected");

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});

// Send bike data every second
setInterval(() => {
  bikes.forEach((bike) => {
    const data = generateBikeData(bike);

    // Send to all connected WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });

    // Send to AWS Kinesis
    sendToKinesis(data);

    console.log(
      `📡 Sent: ${data.bike_id} | Speed: ${data.speed_kmh} km/h | Battery: ${data.battery}% | Status: ${data.status}`,
    );
  });
}, 1000);
