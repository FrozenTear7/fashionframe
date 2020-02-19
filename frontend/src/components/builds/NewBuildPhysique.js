import React, { Component } from "react";
import { mapToOptions } from "../../utils/mapToOptions";
import { selectDropdown } from "../../utils/selectDropdown";

class NewBuildPhysique extends Component {
  render() {
    return (
      <div>
        <h2
          className="center"
          data-toggle="collapse"
          data-target="#collapsePhysique"
          aria-expanded="false"
          aria-controls="collapsePhysique"
        >
          PHYSIQUE
        </h2>
        <div className="collapse show" id="collapsePhysique">
          <div className="card card-body">
            <div className="row">
              <div className="col-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h3>Helmet:</h3>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.helmetOnChange(e.target.value)}
                    >
                      {selectDropdown(mapToOptions(this.props.helmets))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    <h3>Skin:</h3>
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="custom-select"
                      onChange={e => this.props.skinOnChange(e.target.value)}
                    >
                      {selectDropdown(mapToOptions(this.props.skins))}
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

export default NewBuildPhysique;
