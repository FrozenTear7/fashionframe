import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Main from "./Main.js";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <br />
        <Main />
      </div>
    );
  }
}

export default App;
