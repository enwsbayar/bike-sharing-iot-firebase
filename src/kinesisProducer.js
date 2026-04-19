const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const kinesis = new AWS.Kinesis();
const STREAM_NAME = process.env.KINESIS_STREAM_NAME;

async function sendToKinesis(data) {
  const params = {
    Data: JSON.stringify(data),
    PartitionKey: data.bike_id,
    StreamName: STREAM_NAME,
  };

  try {
    await kinesis.putRecord(params).promise();
  } catch (err) {
    console.error(`❌ Kinesis error: ${err.message}`);
  }
}

module.exports = { sendToKinesis };