import React, { Component } from "react";
import Select from "react-select";
import { mapToOption, mapToOptions } from "../../utils/mapToOptions";

class NewBuildTopPanel extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="setupNameInput">Setup name</label>
              <input
                id="setupNameInput"
                type="text"
                className="form-control"
                value={this.props.build.name}
                onChange={this.props.handleNameChange}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="frameSelect">Frame</label>
              <Select
                id="frameSelect"
                defaultValue={mapToOption(this.props.build.frame)}
                options={mapToOptions(this.props.frames)}
                onChange={e => this.props.frameOnChange(e.value)}
              />
            </div>
          </div>
          <div className="col-2">
            <div className="form-group">
              <label htmlFor="frameSelect">Actions</label>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.props.saveBuildOnClick}
                  >
                    Save setup
                  </button>
                </li>
                <li className="list-inline-item">
                  <button type="button" className="btn btn-danger">
                    Delete setup
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBuildTopPanel;
