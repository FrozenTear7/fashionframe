import React, { Component } from "react";
import { GithubPicker } from "react-color";
import Select from "react-select";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { mapToOption, mapToOptions } from "../../utils/mapToOptions";

class ColorPicker extends Component {
  constructor() {
    super();
    this.state = {
      colorPicker: "Classic"
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.colorPicker !== this.state.colorPicker ||
      nextProps.color !== this.props.color
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { colorName, colors, buttonColorOnClick, color } = this.props;
    const { colorPicker } = this.state;

    return (
      <div>
        <div style={{ width: "175px" }}>{colorName}</div>
        <OverlayTrigger
          trigger="click"
          placement="right"
          rootClose={true}
          overlay={
            <Popover id="popover-basic" title="Change color">
              <GithubPicker
                onChangeComplete={buttonColorOnClick}
                triangle="hide"
                width="138px"
                colors={colors[colorPicker]}
              />
            </Popover>
          }
        >
          <Button
            className={
              !color ? "transparent-checkered color-button" : "color-button"
            }
            style={{
              backgroundColor: color ? color : "#d1d1d1"
            }}
          />
        </OverlayTrigger>
        <br />
        <Select
          defaultValue={mapToOption("Classic")}
          options={mapToOptions(Object.keys(colors))}
          onChange={e => this.setState({ colorPicker: e.value })}
        />
      </div>
    );
  }
}

export default ColorPicker;
