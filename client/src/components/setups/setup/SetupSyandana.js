import React, { Component } from "react";
import ColorsBlock from "../../utils/ColorsBlock";

class SetupSyandana extends Component {
  render() {
    const { syandana, colorPickers } = this.props;

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
            <div className="row">
              <div className="col-6">
                Syandana <h3>{syandana.name || "None"}</h3>
              </div>
              <div className="col-6">
                <ColorsBlock
                  colorScheme={syandana.colorScheme}
                  colorPickers={colorPickers}
                  modalName={"syandana"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SetupSyandana;
