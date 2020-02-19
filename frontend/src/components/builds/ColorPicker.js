import React, { Component } from "react";
import { GithubPicker } from "react-color";
import Select from "react-select";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { mapToOptions } from "../../utils/mapToOptions";

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
              <Select
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
                    color={this.props.color}
                    onChangeComplete={this.props.buttonColorOnClick}
                    triangle="hide"
                    width="138px"
                    colors={this.props.colors[this.state.colorPicker]}
                  />
                </Popover>
              }
            >
              <Button
                variant="success"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: this.props.color,
                  borderColor: "#FFFFFF"
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
