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
        updateFirestore({ cube: !firestoreItems.cube });
        break;
      case "donut":
        updateFirestore({ donut: !firestoreItems.donut });
        break;
      case "rectangle":
        updateFirestore({ rectangle: !firestoreItems.rectangle });
        break;
      case "sphere":
        updateFirestore({ sphere: !firestoreItems.sphere });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <Button label={"cube"} onClick={() => this.updateFirestore("cube")} />
        <Button label={"donut"} onClick={() => this.updateFirestore("donut")} />
        <Button
          label={"rectangle"}
          onClick={() => this.updateFirestore("rectangle")}
        />
        <Button
          label={"sphere"}
          onClick={() => this.updateFirestore("sphere")}
        />
      </div>
    );
  }
}
