import React from "react";

import { updateFirestore } from "../actions/firestore-actions";
import Button from "./Button";

export default class SetDbValues extends React.Component {
  updateDonut() {
    updateFirestore("objects", { donut: true });
  }

  render() {
    return (
      <div>
        <Button label={"cube"} />
        <Button label={"donut"} onClick={this.updateDonut} />
        <Button label={"rectangle"} />
        <Button label={"sphere"} />
      </div>
    );
  }
}
