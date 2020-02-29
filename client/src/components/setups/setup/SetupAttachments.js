import React from "react";
import ColorsBlock from "../../utils/ColorsBlock";

const SetupAttachments = props => {
  const { attachments, colorPickers } = props;

  return (
    <div>
      <div
        className="center collapse-button-dark"
        data-toggle="collapse"
        data-target="#collapseAttachments"
        aria-expanded="false"
        aria-controls="collapseAttachments"
      >
        ATTACHMENTS
      </div>
      <div className="collapse" id="collapseAttachments">
        <div className="card card-body">
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  Chest <h3>{attachments.chest || "None"}</h3>
                  <br />
                  Left Arm <h3>{attachments.leftArm || "None"}</h3>
                  <br />
                  Left Leg <h3>{attachments.leftLeg || "None"}</h3>
                  <br />
                </div>
                <div className="col-6">
                  Ephemera <h3>{attachments.ephemera || "None"}</h3>
                  <br />
                  Right Arm <h3>{attachments.rightArm || "None"}</h3>
                  <br />
                  Left Leg <h3>{attachments.rightArm || "None"}</h3>
                  <br />
                </div>
              </div>
            </div>
            <div className="col-6">
              <ColorsBlock
                colorScheme={attachments.colorScheme}
                colorPickers={colorPickers}
                modalName={"attachments"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupAttachments;