import React, { Component } from "react";

class NewSetupDescription extends Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="descriptionTextarea">Description</label>
          <textarea
            id="descriptionTextarea"
            className="form-control"
            value={this.props.description}
            onChange={this.props.handleDescriptionChange}
          />
        </div>

        <br />
        <div className="form-group">
          <label htmlFor="screenshotInput">Screenshot</label>
          <input
            id="screenshotInput"
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

export default NewSetupDescription;
