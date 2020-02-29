import React, { Component } from "react";
import Select from "react-select";
import { mapToOption, mapToOptions } from "../../../utils/mapToOptions";

class NewSetupPhysique extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.setup.syandana !== this.props.setup.syandana ||
      nextProps.setup.syandana.colorScheme !==
        this.props.setup.syandana.colorScheme
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      setup,
      syandanas,
      syandanaOnChange,
      colorPickerComponent
    } = this.props;

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
        <div className="collapse" id="collapseSyandana">
          <div className="card card-body">
            <label htmlFor="syandanaSelect">Syandana</label>
            <Select
              id="syandanaSelect"
              defaultValue={mapToOption(setup.attachments.syandana || "None")}
              options={mapToOptions(syandanas)}
              onChange={e => syandanaOnChange(e.value)}
            />
            <br />
            {colorPickerComponent}
          </div>
        </div>
      </div>
    );
  }
}

export default NewSetupPhysique;
