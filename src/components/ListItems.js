import firebase from "firebase/app";
import React from "react";
import styled from "styled-components";

import { realtimeDB, firestoreDB } from "../firebase";
import Button from "./Button";
import SetDbValues from "./SetDbValues";
import { updateFirestore } from "../actions/firestore-actions";

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
    this.readFromFirestore = this.readFromFirestore.bind(this);
    this.readFromDb = this.readFromDb.bind(this);

    this.state = {
      realtimeDb: null,
      firestoreDb: null
    };
  }

  componentDidMount() {
    this.readFromRealtime();
    this.readFromFirestore();
  }

  readFromRealtime() {
    let realtimeArray = [];

    realtimeDB
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

  readFromFirestore() {
    let firestoreArray = [];

    firestoreDB
      .collection("UnityObjects")
      .get()
      .then(collection => {
        const items = collection.docs.reduce(
          (res, item) => ({ ...res, [item.id]: item.data() }),
          {}
        );
        for (let [key, value] of Object.entries(items.objects)) {
          firestoreArray.push(`${key}: ${value}`);
          this.setState({ firestoreDb: firestoreArray });
        }
      })
      .catch(error => {
        console.error("Cannot read from Firestore", error);
      });
  }

  async readFromDb() {
    this.readFromRealtime();
    this.readFromFirestore();
  }

  deleteEntry() {
    updateFirestore("objects", {
      key: firebase.firestore.FieldValue.delete()
    });
  }

  render() {
    const realtimeValues = this.state.realtimeDb
      ? this.state.realtimeDb.map((item, key) => {
          return <p key={key}>{item}</p>;
        })
      : null;

    const firestoreValues = this.state.firestoreDb
      ? this.state.firestoreDb.map((item, key) => {
          return <p key={key}>{item}</p>;
        })
      : null;

    return (
      <StWrapper>
        <Button label={"Refresh"} onClick={this.readFromDb} />
        <Button label={"Delete Entry"} onClick={this.deleteEntry} />
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
        <SetDbValues />
      </StWrapper>
    );
  }
}
