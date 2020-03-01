import React, { Component } from "react";
import Select from "react-select";
import { mapToOption, mapToOptions } from "../../../utils/mapToOptions";

class NewSetupPhysique extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.setup.frame !== this.props.setup.frame ||
      nextProps.setup.helmet !== this.props.setup.helmet ||
      nextProps.setup.skin !== this.props.setup.skin ||
      nextProps.setup.colorScheme !== this.props.setup.colorScheme
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      setup,
      helmets,
      helmetOnChange,
      skins,
      skinOnChange,
      colorPickerComponent
    } = this.props;

    const frameMatchRegex = new RegExp(`.*${setup.frame} .*`);

    return (
      <div>
        <div
          className="center collapse-button-dark"
          data-toggle="collapse"
          data-target="#collapsePhysique"
          aria-expanded="false"
          aria-controls="collapsePhysique"
        >
          PHYSIQUE
        </div>
        <div className="collapse show" id="collapsePhysique">
          <div className="card card-body d-flex flex-wrap">
            <div className="p-2 flex-fill select-dropdown">
              <label htmlFor="helmetSelect">Helmet</label>
              <Select
                id="helmetSelect"
                value={mapToOption(
                  frameMatchRegex.test(setup.helmet)
                    ? setup.helmet
                    : setup.frame + " Helmet"
                )}
                options={mapToOptions(helmets)}
                onChange={e => helmetOnChange(e.value)}
              />
            </div>
            <div className="p-2 flex-fill select-dropdown">
              <label htmlFor="skinSelect">Skin</label>
              <Select
                id="skinSelect"
                value={mapToOption(
                  frameMatchRegex.test(setup.skin)
                    ? setup.skin
                    : setup.frame + " Skin"
                )}
                options={mapToOptions(skins)}
                onChange={e => skinOnChange(e.value)}
              />
            </div>
            {colorPickerComponent}
          </div>
          {/* <ColorsBlock
                  colorScheme={setup.colorScheme}
                  colorPickers={colorPickers}
                  modalName={"physique"}
                /> */}
        </div>
      </div>
    );
  }
}

export default NewSetupPhysique;
