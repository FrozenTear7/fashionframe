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
        <div class="form-group">
          <label htmlFor="screenshotInput">Screenshot</label>
          <input
            id="screenshotInput"
            type="file"
            class="form-control-file"
            accept=".jpg,.png"
            ref={this.props.screenshotFileRef}
          />
        </div>
      </div>
    );
  }
}

export default NewSetupDescription;
