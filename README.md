# Bike Sharing IoT - Real-Time Data Streaming

Real-time bike sharing IoT simulation using WebSocket and AWS (Kinesis, Lambda, DynamoDB).

## Architecture

```
[IoT Bike Simulator] → [WebSocket Server] → [AWS Kinesis] → [Lambda] → [DynamoDB]
```

## Technologies

- **Backend:** Node.js
- **Protocol:** WebSocket
- **Cloud:** AWS (Kinesis, Lambda, DynamoDB)
- **Libraries:** ws, aws-sdk, uuid, dotenv

## Project Structure

```
bike-sharing-iot-aws/
├── src/
│   ├── simulator.js        # IoT bike sensor simulator
│   ├── server.js           # WebSocket server
│   └── kinesisProducer.js  # AWS Kinesis producer
├── .env                    # Environment variables (not committed)
├── .gitignore
└── README.md
```

## Simulated Bike Data

Each bike sends the following data every second:

```json
{
  "bike_id": "BIKE_01",
  "lat": 39.933400,
  "lon": 32.859700,
  "speed_kmh": 14.3,
  "battery": 78.0,
  "status": "active",
  "timestamp": "2026-04-19T14:32:05.000Z",
  "event_id": "uuid-here"
}
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
KINESIS_STREAM_NAME=bike-sharing-stream
```

3. Run the server:
```bash
npm start
```

## AWS Setup

- **Kinesis Data Stream:** `bike-sharing-stream`
- **Lambda:** Reads from Kinesis, writes to DynamoDB
- **DynamoDB:** Stores all bike telemetry data