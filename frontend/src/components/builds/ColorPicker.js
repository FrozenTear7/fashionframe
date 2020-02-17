import React, { Component } from "react";
import { GithubPicker } from "react-color";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Dropdown } from "semantic-ui-react";

class ColorPicker extends Component {
  constructor() {
    super();

    this.state = {
      colorPicker: "Classic"
    };
  }

  getColorPickersOptions = colorPickers => {
    return Object.keys(colorPickers).map(x => ({ key: x, value: x, text: x }));
  };

  dropdownOnChangeFunction = (event, { value }) => {
    this.setState({ colorPicker: value });
  };

  render() {
    console.log(this.props);

    return (
      <div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <Dropdown
              style={{ width: "150px" }}
              placeholder="Choose color picker"
              fluid
              search
              selection
              value={this.state.colorPicker}
              options={this.getColorPickersOptions(this.props.colors)}
              onChange={this.dropdownOnChangeFunction}
            />
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
                onClick={this.props.buttonColorOnClick}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: this.props.color,
                  borderColor: "#000000"
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
