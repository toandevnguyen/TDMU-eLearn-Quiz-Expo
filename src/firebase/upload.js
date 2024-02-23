const admin = require("firebase-admin");

const data = require("./data.json");
const serviceAccount = require("./serviceAccKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

async function uploadData() {
  for (const doc of data) {
    await db.collection("questions").add(doc);
  }
}
uploadData();
