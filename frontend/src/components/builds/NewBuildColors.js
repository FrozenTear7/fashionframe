import React, { Component } from "react";
import ColorPicker from "./ColorPicker";

const formatName = name => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

class NewBuildColors extends Component {
  render() {
    return (
      <div>
        <div className="row">
          {this.props.colorNames.slice(0, 4).map((colorName, i) => (
            <div className="col-3">
              <ColorPicker
                key={colorName}
                colorName={formatName(colorName)}
                buttonColorOnClick={this.props.getColorOnClickFunction(
                  colorName
                )}
                color={this.props.buildColors[`${colorName}`]}
                colors={this.props.colorPickers}
              />
            </div>
          ))}
        </div>
        <br />
        <div className="row">
          {this.props.colorNames.slice(4, 8).map((colorName, i) => (
            <div className="col-3">
              <ColorPicker
                key={colorName}
                colorName={formatName(colorName)}
                buttonColorOnClick={this.props.getColorOnClickFunction(
                  colorName
                )}
                color={this.props.buildColors[`${colorName}`]}
                colors={this.props.colorPickers}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default NewBuildColors;
