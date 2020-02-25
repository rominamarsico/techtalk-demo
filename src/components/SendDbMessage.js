import React from "react";
import styled from "styled-components";

import Button from "./Button";

const StWrapper = styled.div`
  padding: 3em 0;
  margin: 0 15em;
  border-bottom: 2px solid #282c34;
`;

export default class SendDbMessage extends React.Component {
  async sendMessage() {
    await fetch(
      "https://us-central1-techtalk-demo-6ecbb.cloudfunctions.net/helloWorld"
    );
  }

  render() {
    return (
      <StWrapper>
        <Button
          label={"Send Message to Firestore"}
          onClick={this.sendMessage}
        />
        <p>Check the Firestore Dashboard to see the newly added message.</p>
      </StWrapper>
    );
  }
}
