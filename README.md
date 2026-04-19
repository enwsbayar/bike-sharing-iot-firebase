# 🚲 Bike Sharing IoT — Real-Time Data Streaming

Real-time bike sharing IoT simulation using WebSocket, Firebase Firestore, and a live dashboard.

## 🏗️ Architecture

```
[IoT Bike Simulator] → [WebSocket Server] → [Firebase Firestore]
                              ↓
                     [Live Web Dashboard]
```

## 🛠️ Technologies

- **Backend:** Node.js
- **Protocol:** WebSocket
- **Cloud Database:** Firebase Firestore
- **Frontend:** HTML, CSS, JavaScript
- **Map:** Leaflet.js + OpenStreetMap
- **Libraries:** ws, firebase-admin, uuid, dotenv

## 📁 Project Structure

```
bike-sharing-iot-aws/
├── src/
│   ├── simulator.js        # IoT bike sensor simulator
│   ├── server.js           # WebSocket + HTTP server
│   ├── firebaseService.js  # Firebase Firestore integration
│   └── public/
│       ├── index.html      # Live dashboard
│       ├── style.css       # Dashboard styles
│       └── app.js          # WebSocket client + map logic
├── serviceAccountKey.json  # Firebase credentials (not committed)
├── .env                    # Environment variables (not committed)
├── .gitignore
└── README.md
```

## 🚴 Simulated Bike Data

Each bike sends the following data every second:

```json
{
  "bike_id": "BIKE_01",
  "lat": 39.9334,
  "lon": 32.8597,
  "speed_kmh": 14.3,
  "battery": 78.0,
  "status": "active",
  "timestamp": "2026-04-19T14:32:05.000Z",
  "event_id": "uuid-here"
}
```

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Firebase Setup

- Go to [console.firebase.google.com](https://console.firebase.google.com)
- Create a new project
- Enable Firestore Database
- Go to Project Settings → Service Accounts → Generate new private key
- Save the file as `serviceAccountKey.json` in the root directory

### 3. Run the server

```bash
npm start
```

### 4. Open the dashboard

```
http://localhost:8080
```

## 📊 Features

- **Real-time simulation** of 5 bikes sending telemetry every second
- **WebSocket** connection between server and dashboard
- **Live map** showing bike locations using Leaflet.js
- **Bike cards** showing speed, battery, and status
- **Firebase Firestore** cloud storage for all telemetry data
- **Auto-clear** database on every server restart

## Images

![Dashboard](images/image.png)

## 🔒 Security

- `serviceAccountKey.json` and `.env` are excluded from Git via `.gitignore`
- Never commit sensitive credentials to version control
