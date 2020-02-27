import React, { Component } from "react";
import ColorsBlock from "../../utils/ColorsBlock";

class SetupPhysique extends Component {
  render() {
    const { setup, colorPickers } = this.props;

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
                Helmet <h3>{setup.helmet}</h3>
                <br />
                Skin <h3>{setup.skin}</h3>
              </div>
              <div className="col-6">
                <ColorsBlock
                  colorScheme={setup.colorScheme}
                  colorPickers={colorPickers}
                  modalName={"physique"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SetupPhysique;
