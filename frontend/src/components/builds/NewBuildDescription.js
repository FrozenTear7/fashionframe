import React, { Component } from "react";

class NewBuildDescription extends Component {
  render() {
    return (
      <div>
        <h2 className="center">DESCRIPTION</h2>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Description</span>
          </div>
          <textarea
            className="form-control"
            aria-label="With textarea"
          ></textarea>
        </div>
      </div>
    );
  }
}

export default NewBuildDescription;
