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
    return (
      <div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <div style={{ width: "175px" }}>
              {this.props.colorName}
              <Select
                defaultValue={mapToOption("Classic")}
                options={mapToOptions(Object.keys(this.props.colors))}
                onChange={e => this.setState({ colorPicker: e.value })}
              />
            </div>
          </li>
          <li className="list-inline-item">
            <OverlayTrigger
              trigger="click"
              placement="right"
              rootClose={true}
              overlay={
                <Popover id="popover-basic" title="Change color">
                  <GithubPicker
                    onChangeComplete={this.props.buttonColorOnClick}
                    triangle="hide"
                    width="138px"
                    colors={this.props.colors[this.state.colorPicker]}
                  />
                </Popover>
              }
            >
              <Button
                className={
                  !this.props.color
                    ? "transparent-checkered color-button"
                    : "color-button"
                }
                style={{
                  backgroundColor: this.props.color
                    ? this.props.color
                    : "#d1d1d1"
                }}
              />
            </OverlayTrigger>
          </li>
        </ul>
      </div>
    );
  }
}

export default ColorPicker;
