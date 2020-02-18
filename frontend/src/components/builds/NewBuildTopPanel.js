import React, { Component } from "react";
import { mapToOptions } from "../../utils/mapToOptions";
import { selectDropdown } from "../../utils/selectDropdown";

class NewBuildTopPanel extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-8">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                <h3>Setup name:</h3>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={this.props.name}
                  onChange={this.props.handleNameChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                <h3>Frame:</h3>
              </label>
              <div className="col-sm-10">
                <select
                  className="custom-select"
                  onChange={e => this.props.frameOnChange(e.target.value)}
                >
                  {selectDropdown(mapToOptions(this.props.frames))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBuildTopPanel;
