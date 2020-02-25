import React from "react";
import styled from "styled-components";

import { realtimeDB } from "../firebase";
import Button from "./Button";
import SetDbValues from "./SetDbValues";
import { readFromFirestore } from "../actions/firestore-actions";

const StWrapper = styled.div`
  margin-top: 3em;
`;

const StCol = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3em;
  color: #282c34;
`;

const StOutput = styled.div`
  text-align: start;
`;

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.readFromRealtime = this.readFromRealtime.bind(this);
    this.setFirestorePromiseInState = this.setFirestorePromiseInState.bind(
      this
    );
    this.readFromDb = this.readFromDb.bind(this);

    this.state = {
      realtimeDb: null,
      firestoreDb: null
    };
  }

  componentDidMount() {
    this.readFromRealtime();
    this.setFirestorePromiseInState();
  }

  readFromRealtime() {
    let realtimeArray = [];

    realtimeDB
      .ref("UnityObjects/objects")
      .once("value", snapshot => {
        const items = snapshot.val();
        for (let [key, value] of Object.entries(items)) {
          realtimeArray.push(`${key}: ${value}`);
          this.setState({ realtimeDb: realtimeArray });
        }
      })
      .catch(error => {
        console.error("Cannot read from Realtime", error);
      });
  }

  setFirestorePromiseInState() {
    readFromFirestore()
      .then(items => {
        this.setState({ firestoreDb: items });
      })
      .catch(error => {
        console.error("Cannot set fetch of FirestoreDb in state", error);
      });
  }

  async readFromDb() {
    this.readFromRealtime();
    this.setFirestorePromiseInState();
  }

  render() {
    const realtimeValues = this.state.realtimeDb
      ? this.state.realtimeDb.map((item, key) => {
          return <p key={key}>{item}</p>;
        })
      : null;

    const firestoreValues = this.state.firestoreDb
      ? Object.entries(this.state.firestoreDb).map(item => {
          return <p key={item[0]}>{`${item[0]}: ${item[1]}`}</p>;
        })
      : null;

    return (
      <StWrapper>
        <Button label={"Refresh"} onClick={this.readFromDb} />
        <StCol>
          <div>
            <h1>Realtime Database</h1>
            <StOutput>{realtimeValues}</StOutput>
          </div>
          <div>
            <h1>Cloud Firestore</h1>
            <StOutput>{firestoreValues}</StOutput>
          </div>
        </StCol>
        <SetDbValues firestoreDb={this.state.firestoreDb} />
      </StWrapper>
    );
  }
}
