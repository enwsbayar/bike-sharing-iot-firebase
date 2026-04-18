const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function clearCollection() {
  const snapshot = await db.collection('bike_telemetry').get();
  const batch = db.batch();
  snapshot.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
  console.log('🗑️ Cleared old bike data from Firestore');
}
async function saveBikeData(data) {
  try {
    await db.collection('bike_telemetry').add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`✅ Saved to Firestore: ${data.bike_id}`);
  } catch (err) {
    console.error(`❌ Firestore error: ${err.message}`);
  }
}

module.exports = { saveBikeData, clearCollection };