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
    const frameMatchRegex = new RegExp(`.*${this.props.setup.frame} .*`);

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
          <div className="card card-body">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="helmetSelect">Helmet</label>
                  <Select
                    id="helmetSelect"
                    value={mapToOption(
                      frameMatchRegex.test(this.props.setup.helmet)
                        ? this.props.setup.helmet
                        : this.props.setup.frame + " Helmet"
                    )}
                    options={mapToOptions(this.props.helmets)}
                    onChange={e => this.props.helmetOnChange(e.value)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="skinSelect">Skin</label>
                  <Select
                    id="skinSelect"
                    value={mapToOption(
                      frameMatchRegex.test(this.props.setup.skin)
                        ? this.props.setup.skin
                        : this.props.setup.frame + " Skin"
                    )}
                    options={mapToOptions(this.props.skins)}
                    onChange={e => this.props.skinOnChange(e.value)}
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

export default NewSetupPhysique;
