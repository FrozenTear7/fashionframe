import React, { Component } from "react";
import { mapToOptions } from "../../utils/mapToOptions";
import { selectDropdown } from "../../utils/selectDropdown";

class NewBuildAttachments extends Component {
  render() {
    return (
      <div>
        <h2
          className="center"
          data-toggle="collapse"
          data-target="#collapseAttachments"
          aria-expanded="false"
          aria-controls="collapseAttachments"
        >
          ATTACHMENTS
        </h2>
        <div class="collapse show" id="collapseAttachments">
          <div class="card card-body">
            <div className="row">
              <div className="col-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h3>Chest:</h3>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.helmetOnChange(e.target.value)}
                    >
                      {selectDropdown(mapToOptions(this.props.helmets))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h3>Left Arm:</h3>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.helmetOnChange(e.target.value)}
                    >
                      {selectDropdown(mapToOptions(this.props.helmets))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h3>Left Leg:</h3>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.helmetOnChange(e.target.value)}
                    >
                      {selectDropdown(mapToOptions(this.props.helmets))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h3>Ephemera:</h3>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.helmetOnChange(e.target.value)}
                    >
                      {selectDropdown(mapToOptions(this.props.helmets))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h3>Right Arm:</h3>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.helmetOnChange(e.target.value)}
                    >
                      {selectDropdown(mapToOptions(this.props.helmets))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h3>Right Leg:</h3>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.helmetOnChange(e.target.value)}
                    >
                      {selectDropdown(mapToOptions(this.props.helmets))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBuildAttachments;
