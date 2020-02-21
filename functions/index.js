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

/*exports.readFromFirestore = functions.https.onRequest(async res => {
  return await admin
    .firestore()
    .collection("UnityObjects")
    .doc("objects")
    .get()
    .then(doc => {
      return doc.data();
    })
    .catch(error => {
      console.error(error);
    });
});*/

exports.readFromFirestore = functions.firestore
  .document("UnityObjects/objects")
  .onWrite((change, context) => {
    return change;
  });
