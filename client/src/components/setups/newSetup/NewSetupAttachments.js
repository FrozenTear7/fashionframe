import React, { Component } from "react";
import Select from "react-select";
import { mapToOption, mapToOptionsWithNone } from "../../../utils/mapToOptions";

class NewSetupAttachments extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.setup.attachments !== this.props.setup.attachments) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      setup,
      chestAttachments,
      chestOnChange,
      armAttachments,
      leftArmOnChange,
      rightArmOnChange,
      legAttachments,
      leftLegOnChange,
      rightLegOnChange,
      ephemeras,
      ephemeraOnChange,
      colorPickerComponent
    } = this.props;

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
        <div className="collapse" id="collapseAttachments">
          <div className="card card-body">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="chestSelect">Chest</label>
                  <Select
                    id="chestSelect"
                    defaultValue={mapToOption(
                      setup.attachments.chest || "None"
                    )}
                    options={mapToOptionsWithNone(chestAttachments)}
                    onChange={e => chestOnChange(e.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="leftArmSelect">Left Arm</label>
                  <Select
                    id="leftArmSelect"
                    defaultValue={mapToOption(
                      setup.attachments.leftArm || "None"
                    )}
                    options={mapToOptionsWithNone(armAttachments)}
                    onChange={e => leftArmOnChange(e.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="leftArmSelect">Left Leg</label>
                  <Select
                    id="leftArmSelect"
                    defaultValue={mapToOption(
                      setup.attachments.leftLeg || "None"
                    )}
                    options={mapToOptionsWithNone(legAttachments)}
                    onChange={e => leftLegOnChange(e.value)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="ephemeraSelect">Ephemera</label>
                  <Select
                    id="ephemeraSelect"
                    defaultValue={mapToOption(
                      setup.attachments.ephemera || "None"
                    )}
                    options={mapToOptionsWithNone(ephemeras)}
                    onChange={e => ephemeraOnChange(e.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rightArmSelect">Right Arm</label>
                  <Select
                    id="rightArmSelect"
                    defaultValue={mapToOption(
                      setup.attachments.rightArm || "None"
                    )}
                    options={mapToOptionsWithNone(armAttachments)}
                    onChange={e => rightArmOnChange(e.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rightLegSelect">Right Leg</label>
                  <Select
                    id="rightLegSelect"
                    defaultValue={mapToOption(
                      setup.attachments.rightLeg || "None"
                    )}
                    options={mapToOptionsWithNone(legAttachments)}
                    onChange={e => rightLegOnChange(e.value)}
                  />
                </div>
              </div>
            </div>
            <br />
            {colorPickerComponent}
          </div>
        </div>
      </div>
    );
  }
}

export default NewSetupAttachments;
