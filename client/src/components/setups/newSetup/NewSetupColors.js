import React from "react";
import ColorPicker from "../ColorPicker";
import { formatColorName } from "../../../utils/nameFormats";

const NewSetupColors = props => {
  const {
    colorNames,
    getColorOnClickFunction,
    setupColors,
    colorPickers
  } = props;

  return (
    <div>
      <div className="d-flex flex-wrap center">
        {colorNames.slice(0, 4).map((colorName, i) => (
          <div className="p-2 center" key={i}>
            <ColorPicker
              key={colorName}
              colorName={formatColorName(colorName)}
              buttonColorOnClick={e => getColorOnClickFunction(colorName, e)}
              color={setupColors[`${colorName}`]}
              colors={colorPickers}
            />
          </div>
        ))}
      </div>
      <div className="d-flex flex-wrap center">
        {colorNames.slice(4, 8).map((colorName, i) => (
          <div className="p-2 center" key={i}>
            <ColorPicker
              key={colorName}
              colorName={formatColorName(colorName)}
              buttonColorOnClick={e => getColorOnClickFunction(colorName, e)}
              color={setupColors[`${colorName}`]}
              colors={colorPickers}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewSetupColors;
