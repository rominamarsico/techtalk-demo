import React from "react";
import "./App.css";

import ListItem from "./components/ListItems";
import SendDbMessage from "./components/SendDbMessage";

function App() {
  return (
    <div className="app">
      <header className="app-header">Demo</header>
      <SendDbMessage />
      <ListItem />
    </div>
  );
}

export default App;
