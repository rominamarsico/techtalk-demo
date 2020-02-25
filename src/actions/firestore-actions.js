import firebase from "firebase/app";
import { firestoreDB } from "../firebase";

export const readFromFirestore = () => {
  return firestoreDB
    .collection("UnityObjects")
    .doc("objects")
    .get()
    .then(doc => {
      const items = doc.data();
      return items;
    })
    .catch(error => {
      console.error("Cannot fetch from FirestoreDb", error);
    });
};

export const updateFirestore = keyValueObject => {
  firestoreDB
    .collection("UnityObjects")
    .doc("objects")
    .update(keyValueObject)
    .then(function() {
      console.log("Document successfully updated!");
    })
    .catch(function(error) {
      console.error("Error updating document: ", error);
    });
};

export const deleteEntryInFirestore = () => {
  updateFirestore({
    cube: firebase.firestore.FieldValue.delete()
  });
};
