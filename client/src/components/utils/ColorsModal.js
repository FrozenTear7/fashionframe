import React from "react";
import nearestColor from "nearest-color";
import { mapColors } from "../../utils/mapColors.js";
import ColorButton from "./ColorButton.js";

const columnCount = 5;
const rowCount = 18;
const colorDistanceThreshold = 20;

const getColumnRow = (color, colors) => {
  const index = colors.findIndex(e => e === color);

  return {
    column: Math.ceil(index / rowCount) + 1,
    row: Math.ceil(index / columnCount) + 1
  };
};

const ColorsModal = props => {
  const { modalName, color, colorPickers } = props;

  return (
    <div>
      <button
        type="button"
        className={`btn btn-primary${!color ? " disabled" : ""}`}
        data-toggle="modal"
        data-target={`#${modalName}`}
      >
        Check colors
      </button>

      {color && (
        <div
          className="modal fade"
          id={`${modalName}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={`${modalName}Label`}
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${modalName}Label`}>
                  Color choices for {color}
                  {ColorButton(color)}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul className="list-group">
                  {Object.keys(colorPickers).map(colorPicker => {
                    const nearestColorPickersValue = nearestColor.from(
                      mapColors(colorPickers[colorPicker])
                    );

                    const closestColor = nearestColorPickersValue(color);

                    const columnRow = getColumnRow(
                      closestColor.value,
                      colorPickers[colorPicker]
                    );

                    return (
                      <li className="border-normal" key={colorPicker}>
                        {colorPicker}: Column {columnRow.column}, Row{" "}
                        {columnRow.row}
                        {closestColor.distance > colorDistanceThreshold && (
                          <span style={{ color: "#ff0000" }}>
                            {" "}
                            - No close choice
                          </span>
                        )}
                        <br />
                        {ColorButton(closestColor.value)}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorsModal;
