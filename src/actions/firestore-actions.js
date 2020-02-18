import { firestoreDB } from "../firebase";

export const updateFirestore = (document, keyValueObject) => {
  firestoreDB
    .collection("UnityObjects")
    .doc(document)
    .update(keyValueObject)
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};
