import React, { Component } from "react";
import { mapToOptions, mapToOptionsWithNone } from "../../utils/mapToOptions";
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
        <div className="collapse show" id="collapseAttachments">
          <div className="card card-body">
            <div className="row">
              <div className="col-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Chest:</h4>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.chestOnChange(e.target.value)}
                    >
                      {selectDropdown(
                        mapToOptionsWithNone(this.props.chestAttachments)
                      )}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Left Arm:</h4>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.leftArmOnChange(e.target.value)}
                    >
                      {selectDropdown(
                        mapToOptionsWithNone(this.props.armAttachments)
                      )}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Left Leg:</h4>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.leftLegOnChange(e.target.value)}
                    >
                      {selectDropdown(
                        mapToOptionsWithNone(this.props.legAttachments)
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Ephemera:</h4>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e =>
                        this.props.ephemeraOnChange(e.target.value)
                      }
                    >
                      {selectDropdown(
                        mapToOptionsWithNone(this.props.ephemeras)
                      )}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Right Arm:</h4>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e =>
                        this.props.rightArmOnChange(e.target.value)
                      }
                    >
                      {selectDropdown(
                        mapToOptionsWithNone(this.props.armAttachments)
                      )}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Right Leg:</h4>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.leftLegOnChange(e.target.value)}
                    >
                      {selectDropdown(
                        mapToOptionsWithNone(this.props.legAttachments)
                      )}
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
