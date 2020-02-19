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
            value={this.props.description}
            onChange={this.props.handleDescriptionChange}
          />
        </div>
        <br />
        <br />
        <h2 className="center">SCREENSHOT</h2>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Link</span>
          </div>
          <input
            type="text"
            className="form-control"
            value={this.props.screenshot}
            onChange={this.props.handleScreenshotChange}
          />
        </div>
      </div>
    );
  }
}

export default NewBuildDescription;
