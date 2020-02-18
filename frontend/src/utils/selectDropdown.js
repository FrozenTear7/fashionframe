import React from "react";

export const selectDropdown = elements => {
  return elements.map(colorPicker => (
    <option key={colorPicker.value} value={colorPicker.value}>
      {colorPicker.label}
    </option>
  ));
};
