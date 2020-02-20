import React, { Component } from "react";
import Select from "react-select";
import { mapToOption, mapToOptionsWithNone } from "../../utils/mapToOptions";

class NewBuildAttachments extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.build.attachments !== this.props.build.attachments) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <div
          className="center collapse-button-dark"
          data-toggle="collapse"
          data-target="#collapseAttachments"
          aria-expanded="false"
          aria-controls="collapseAttachments"
        >
          ATTACHMENTS
        </div>
        <div className="collapse show" id="collapseAttachments">
          <div className="card card-body">
            <div className="row">
              <div className="col-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Chest:</h4>
                  </label>
                  <div className="col-sm-8">
                    <Select
                      defaultValue={mapToOption(
                        this.props.build.attachments.chest || "None"
                      )}
                      options={mapToOptionsWithNone(
                        this.props.chestAttachments
                      )}
                      onChange={e => this.props.chestOnChange(e.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Left Arm:</h4>
                  </label>
                  <div className="col-sm-8">
                    <Select
                      defaultValue={mapToOption(
                        this.props.build.attachments.leftArm || "None"
                      )}
                      options={mapToOptionsWithNone(this.props.armAttachments)}
                      onChange={e => this.props.leftArmOnChange(e.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Left Leg:</h4>
                  </label>
                  <div className="col-sm-8">
                    <Select
                      defaultValue={mapToOption(
                        this.props.build.attachments.leftLeg || "None"
                      )}
                      options={mapToOptionsWithNone(this.props.legAttachments)}
                      onChange={e => this.props.leftLegOnChange(e.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Ephemera:</h4>
                  </label>
                  <div className="col-sm-8">
                    <Select
                      defaultValue={mapToOption(
                        this.props.build.attachments.ephemera || "None"
                      )}
                      options={mapToOptionsWithNone(this.props.ephemeras)}
                      onChange={e => this.props.ephemeraOnChange(e.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Right Arm:</h4>
                  </label>
                  <div className="col-sm-8">
                    <Select
                      defaultValue={mapToOption(
                        this.props.build.attachments.rightArm || "None"
                      )}
                      options={mapToOptionsWithNone(this.props.armAttachments)}
                      onChange={e => this.props.rightArmOnChange(e.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Right Leg:</h4>
                  </label>
                  <div className="col-sm-8">
                    <Select
                      defaultValue={mapToOption(
                        this.props.build.attachments.rightLeg || "None"
                      )}
                      options={mapToOptionsWithNone(this.props.legAttachments)}
                      onChange={e => this.props.leftLegOnChange(e.value)}
                    />
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
