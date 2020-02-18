import React from "react";
import styled from "styled-components";

const StButton = styled.button`
  background-color: #282c34;
  color: #fff;
  font-size: 1em;
  padding: 0.5em 1em;
  border-radius: 5px;
`;

export default class Button extends React.Component {
  render() {
    return <StButton onClick={this.props.onClick}>{this.props.label}</StButton>;
  }
}
