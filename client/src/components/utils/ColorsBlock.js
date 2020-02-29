import React from "react";
import ColorsModal from "./ColorsModal.js";
import ColorButton from "./ColorButton.js";
import { formatColorName } from "../../utils/nameFormats.js";

const getColorButton = (color, colorPickers, modalName) => {
  return (
    <div>
      {ColorButton(color)}
      <ColorsModal
        color={color}
        colorPickers={colorPickers}
        modalName={modalName}
        disabled={color}
      />
    </div>
  );
};

const colorNamesToButtons = (
  colorScheme,
  colorPickers,
  modalName,
  colorNames
) => {
  return colorNames.map((colorName, i) => (
    <div key={i}>
      <div className="form-group center" style={{ marginInline: "25px" }}>
        <label htmlFor={colorName}>{formatColorName(colorName)}</label>
        <div id={colorName}>
          {getColorButton(
            colorScheme[colorName],
            colorPickers,
            modalName + colorName
          )}
        </div>
      </div>
    </div>
  ));
};

const ColorsBlock = props => {
  const { colorScheme, colorPickers, modalName } = props;

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap center">
        {colorNamesToButtons(
          colorScheme,
          colorPickers,
          modalName,
          Object.keys(colorScheme).slice(1, 5)
        )}
      </div>
      <br />
      <div className="d-flex justify-content-between flex-wrap center">
        {colorNamesToButtons(
          colorScheme,
          colorPickers,
          modalName,
          Object.keys(colorScheme).slice(5, 9)
        )}
      </div>
    </div>
  );
};

export default ColorsBlock;
