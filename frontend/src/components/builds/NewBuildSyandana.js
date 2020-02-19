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
          data-target="#collapseSyandana"
          aria-expanded="false"
          aria-controls="collapseSyandana"
        >
          SYANDANA
        </h2>
        <div className="collapse show" id="collapseSyandana">
          <div className="card card-body">
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">
                <h3>Syandana:</h3>
              </label>
              <div className="col-sm-8">
                <select
                  className="custom-select"
                  onChange={e => this.props.syandanaOnChange(e.target.value)}
                >
                  {selectDropdown(mapToOptions(this.props.syandanas))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBuildPhysique;
