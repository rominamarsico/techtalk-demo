const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./techtalk-demo-6ecbb-firebase-adminsdk-5l17d-ac9c8dd4d5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://techtalk-demo-6ecbb.firebaseio.com"
});

exports.helloWorld = functions.https.onRequest(async () => {
  return await admin
    .firestore()
    .collection("messages")
    .add({ original: "Hello World" });
});

exports.readFromFirestore = functions.https.onRequest(async (req, res) => {
  return await admin
    .firestore()
    .collection("UnityObjects")
    .doc("objects")
    .get()
    .then(async doc => {
      const data = await doc.data();
      if (data) {
        return res.status(200).send(data);
      }
      return res.status(404);
    })
    .catch(error => {
      console.error(error);
    });
});
