import React from "react";

import { updateFirestore } from "../actions/firestore-actions";
import Button from "./Button";

export default class SetDbValues extends React.Component {
  constructor(props) {
    super(props);
    this.updateFirestore = this.updateFirestore.bind(this);
  }

  updateFirestore(key) {
    const firestoreItems = this.props.firestoreDb;
    switch (key) {
      case "cube":
        updateFirestore({ cake: !firestoreItems.cake });
        break;
      case "donut":
        updateFirestore({ donut: !firestoreItems.donut });
        break;
      case "rectangle":
        updateFirestore({ hamburger: !firestoreItems.hamburger });
        break;
      case "sphere":
        updateFirestore({ icecream: !firestoreItems.icecream });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <Button label={"Cake"} onClick={() => this.updateFirestore("cube")} />
        <Button label={"Donut"} onClick={() => this.updateFirestore("donut")} />
        <Button
          label={"Hamburger"}
          onClick={() => this.updateFirestore("rectangle")}
        />
        <Button
          label={"IceCream"}
          onClick={() => this.updateFirestore("sphere")}
        />
      </div>
    );
  }
}
