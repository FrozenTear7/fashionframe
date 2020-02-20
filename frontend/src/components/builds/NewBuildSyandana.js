import React, { Component } from "react";
import Select from "react-select";
import { mapToOption, mapToOptions } from "../../utils/mapToOptions";

class NewBuildPhysique extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.build.attachments.syandana !==
      this.props.build.attachments.syandana
    ) {
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
          data-target="#collapseSyandana"
          aria-expanded="false"
          aria-controls="collapseSyandana"
        >
          SYANDANA
        </div>
        <div className="collapse show" id="collapseSyandana">
          <div className="card card-body">
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">
                <h4>Syandana:</h4>
              </label>
              <div className="col-sm-8">
                <Select
                  defaultValue={mapToOption(
                    this.props.build.attachments.syandana || "None"
                  )}
                  options={mapToOptions(this.props.syandanas)}
                  onChange={e => this.props.syandanaOnChange(e.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBuildPhysique;
