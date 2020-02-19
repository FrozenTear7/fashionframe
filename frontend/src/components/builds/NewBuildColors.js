import React, { Component } from "react";
import ColorPicker from "./ColorPicker";

class NewBuildColors extends Component {
  render() {
    return (
      <div>
        COLORS <br />
        <ul>
          {this.props.colorNames.map(colorName => (
            <ColorPicker
              key={colorName}
              buttonColorOnClick={this.props.getColorOnClickFunction(colorName)}
              color={this.props.buildColors[`${colorName}`]}
              colors={this.props.colorPickers}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default NewBuildColors;
