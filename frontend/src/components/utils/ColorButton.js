import React from "react";

export const ColorButton = color => (
  <div
    className={!color ? "color-button transparent-checkered" : "color-button"}
    style={{
      backgroundColor: color ? color : "#d1d1d1"
    }}
  />
);
