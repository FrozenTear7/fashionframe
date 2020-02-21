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
                <div className="form-group">
                  <label htmlFor="chestSelect">Chest</label>
                  <Select
                    id="chestSelect"
                    defaultValue={mapToOption(
                      this.props.build.attachments.chest || "None"
                    )}
                    options={mapToOptionsWithNone(this.props.chestAttachments)}
                    onChange={e => this.props.chestOnChange(e.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="leftArmSelect">Left Arm</label>
                  <Select
                    id="leftArmSelect"
                    defaultValue={mapToOption(
                      this.props.build.attachments.leftArm || "None"
                    )}
                    options={mapToOptionsWithNone(this.props.armAttachments)}
                    onChange={e => this.props.leftArmOnChange(e.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="leftArmSelect">Left Leg</label>
                  <Select
                    id="leftArmSelect"
                    defaultValue={mapToOption(
                      this.props.build.attachments.leftLeg || "None"
                    )}
                    options={mapToOptionsWithNone(this.props.legAttachments)}
                    onChange={e => this.props.leftLegOnChange(e.value)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="ephemeraSelect">Ephemera</label>
                  <Select
                    id="ephemeraSelect"
                    defaultValue={mapToOption(
                      this.props.build.attachments.ephemera || "None"
                    )}
                    options={mapToOptionsWithNone(this.props.ephemeras)}
                    onChange={e => this.props.ephemeraOnChange(e.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rightArmSelect">Right Arm</label>
                  <Select
                    id="rightArmSelect"
                    defaultValue={mapToOption(
                      this.props.build.attachments.rightArm || "None"
                    )}
                    options={mapToOptionsWithNone(this.props.armAttachments)}
                    onChange={e => this.props.rightArmOnChange(e.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rightLegSelect">Right Leg</label>
                  <Select
                    id="rightLegSelect"
                    defaultValue={mapToOption(
                      this.props.build.attachments.rightLeg || "None"
                    )}
                    options={mapToOptionsWithNone(this.props.legAttachments)}
                    onChange={e => this.props.leftLegOnChange(e.value)}
                  />
                </div>
              </div>
            </div>
            <br />
            {this.props.colorPickerComponent}
          </div>
        </div>
      </div>
    );
  }
}

export default NewBuildAttachments;
