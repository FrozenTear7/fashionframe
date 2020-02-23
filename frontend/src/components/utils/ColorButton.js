import React from "react";

function ColorButton(color) {
  return (
    <div
      className={!color ? "color-button transparent-checkered" : "color-button"}
      style={{
        backgroundColor: color ? color : "#d1d1d1"
      }}
    />
  );
}

export default ColorButton;
