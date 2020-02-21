import React, { Component } from "react";

class NotFound extends Component {
  render() {
    return (
      <div className="center">
        <h1>
          404 not found <br />
          <br />
        </h1>
        <img
          src="./vay_hek.jpg"
          alt="Screaming Vay Hek"
          style={{ maxWidth: "60%" }}
        ></img>
      </div>
    );
  }
}

export default NotFound;
