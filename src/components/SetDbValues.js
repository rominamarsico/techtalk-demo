import React from "react";

import { updateFirestore } from "../actions/firestore-actions";
import Button from "./Button";

export default class SetDbValues extends React.Component {
  constructor(props) {
    super(props);
    this.getFirestoreItems = this.getFirestoreItems.bind(this);
    this.updateFirestore = this.updateFirestore.bind(this);
  }

  getFirestoreItems() {
    const firestoreItems = this.props.firestoreDb;
    return firestoreItems.map(item => {
      return JSON.parse(item);
    });
  }

  updateFirestore(index, key) {
    const firestoreItems = this.getFirestoreItems();
    switch (key) {
      case "cube":
        updateFirestore("objects", { cube: !firestoreItems[index].cube });
        break;
      case "donut":
        updateFirestore("objects", { donut: !firestoreItems[index].donut });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <Button
          label={"cube"}
          onClick={() => this.updateFirestore(0, "cube")}
        />
        <Button
          label={"donut"}
          onClick={() => this.updateFirestore(1, "donut")}
        />
        <Button label={"rectangle"} />
        <Button label={"sphere"} />
      </div>
    );
  }
}
