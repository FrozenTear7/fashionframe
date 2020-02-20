import React, { Component } from "react";
import Select from "react-select";
import { mapToOption, mapToOptions } from "../../utils/mapToOptions";

class NewBuildPhysique extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.build.frame !== this.props.build.frame ||
      nextProps.build.helmet !== this.props.build.helmet ||
      nextProps.build.skin !== this.props.build.skin ||
      nextProps.build.colorScheme !== this.props.build.colorScheme
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const frameMatchRegex = new RegExp(`.*${this.props.build.frame} .*`);

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
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Helmet:</h4>
                  </label>
                  <div className="col-sm-8">
                    <Select
                      value={mapToOption(
                        frameMatchRegex.test(this.props.build.helmet)
                          ? this.props.build.helmet
                          : this.props.build.frame + " Helmet"
                      )}
                      options={mapToOptions(this.props.helmets)}
                      onChange={e => this.props.helmetOnChange(e.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h4>Skin:</h4>
                  </label>
                  <div className="col-sm-8">
                    <Select
                      value={mapToOption(
                        frameMatchRegex.test(this.props.build.skin)
                          ? this.props.build.skin
                          : this.props.build.frame + " Skin"
                      )}
                      options={mapToOptions(this.props.skins)}
                      onChange={e => this.props.skinOnChange(e.value)}
                    />
                  </div>
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

export default NewBuildPhysique;
