import React, { Component } from "react";
import Select from "react-select";
import { mapToOption, mapToOptions } from "../../utils/mapToOptions";

class NewBuildPhysique extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.build.syandana !== this.props.build.syandana ||
      nextProps.build.syandana.colorScheme !==
        this.props.build.syandana.colorScheme
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
            <label htmlFor="syandanaSelect">Syandana</label>
            <Select
              id="syandanaSelect"
              defaultValue={mapToOption(
                this.props.build.attachments.syandana || "None"
              )}
              options={mapToOptions(this.props.syandanas)}
              onChange={e => this.props.syandanaOnChange(e.value)}
            />
            <br />
            {this.props.colorPickerComponent}
          </div>
        </div>
      </div>
    );
  }
}

export default NewBuildPhysique;
