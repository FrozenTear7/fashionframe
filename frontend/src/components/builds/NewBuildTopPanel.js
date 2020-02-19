import React, { Component } from "react";
import Select from "react-select";
import { mapToOption, mapToOptions } from "../../utils/mapToOptions";

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
                  value={this.props.build.name}
                  onChange={this.props.handleNameChange}
                />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                <h3>Frame:</h3>
              </label>
              <div className="col-sm-10">
                <Select
                  defaultValue={mapToOption(this.props.build.frame)}
                  options={mapToOptions(this.props.frames)}
                  onChange={e => this.props.frameOnChange(e.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBuildTopPanel;
