import React, { Component } from "react";
import { GithubPicker } from "react-color";
import { Dropdown } from "semantic-ui-react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { fetchAuth } from "../../utils/fetchAuth";
import ColorPicker from "./ColorPicker";

class NewBuild extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      build: {
        frame: "",
        skin: "",
        helmet: "",
        attachments: {
          chest: "",
          leftArm: "",
          rightArm: "",
          leftLeg: "",
          rightLeg: "",
          ephemera: "",
          colorScheme: {
            primary: "",
            secondary: "",
            tertiary: "",
            accents: "",
            emmissive: "",
            energy: ""
          }
        },
        syandana: {
          name: "",
          colorScheme: {
            primary: "",
            secondary: "",
            tertiary: "",
            accents: "",
            emmissive: "",
            energy: ""
          }
        },
        colorScheme: {
          primary: "",
          secondary: "",
          tertiary: "",
          accents: "",
          emmissive: "",
          energy: ""
        }
      },
      frames: {
        loading: true,
        data: [],
        error: null
      },
      ephemeras: {
        loading: true,
        data: [],
        error: null
      },
      helmets: {
        loading: true,
        data: [],
        error: null
      },
      skins: {
        loading: true,
        data: [],
        error: null
      },
      colorPickers: {
        loading: true,
        data: [],
        error: null
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  mapToOptions(elements) {
    return elements.map(x => ({ key: x, value: x, text: x }));
  }

  async fetchFrames() {
    try {
      const res = await fetchAuth("/api/frames");
      const resJson = await res.json();

      this.setState({
        frames: {
          ...this.state.frames,
          loading: false,
          error: null,
          data: this.mapToOptions(resJson.frames)
        }
      });
    } catch (error) {
      this.setState({
        userData: {
          ...this.state.frames,
          loading: false,
          error: error.message
        }
      });
    }
  }

  async fetchEphemeras() {
    try {
      const res = await fetchAuth("/api/ephemeras");
      const resJson = await res.json();

      this.setState({
        ephemeras: {
          ...this.state.ephemeras,
          loading: false,
          error: null,
          data: this.mapToOptions(resJson.ephemeras)
        }
      });
    } catch (error) {
      this.setState({
        userData: {
          ...this.state.ephemeras,
          loading: false,
          error: error.message
        }
      });
    }
  }

  async fetchHelmets() {
    try {
      const res = await fetchAuth("/api/helmets");
      const resJson = await res.json();

      this.setState({
        helmets: {
          ...this.state.helmets,
          loading: false,
          error: null,
          data: this.mapToOptions(resJson.helmets)
        }
      });
    } catch (error) {
      this.setState({
        userData: {
          ...this.state.helmets,
          loading: false,
          error: error.message
        }
      });
    }
  }

  async fetchSkins() {
    try {
      const res = await fetchAuth("/api/skins");
      const resJson = await res.json();

      this.setState({
        skins: {
          ...this.state.skins,
          loading: false,
          error: null,
          data: this.mapToOptions(resJson.skins)
        }
      });
    } catch (error) {
      this.setState({
        userData: {
          ...this.state.skins,
          loading: false,
          error: error.message
        }
      });
    }
  }

  async fetchColorPickers() {
    try {
      const res = await fetchAuth("/api/colorPickers");
      const resJson = await res.json();

      this.setState({
        colorPickers: {
          ...this.state.colorPickers,
          loading: false,
          error: null,
          data: resJson.colorPickers
        }
      });
    } catch (error) {
      this.setState({
        colorPickers: {
          ...this.state.colorPickers,
          loading: false,
          error: error.message
        }
      });
    }
  }

  async componentDidMount() {
    await this.fetchFrames();
    await this.fetchEphemeras();
    await this.fetchHelmets();
    await this.fetchColorPickers();
    console.log(this.state);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    console.log(this.state.value);

    try {
      const res = await fetchAuth("/auth/user", {
        method: "PUT",
        body: JSON.stringify({ username: this.state.value })
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  colorPicker(color) {
    return (
      <div>
        <OverlayTrigger
          trigger="click"
          placement="right"
          rootClose={true}
          overlay={
            <Popover id="popover-basic" title="Change rating">
              <GithubPicker
                color={color.color}
                onChangeComplete={this.handleChangeComplete}
                triangle="hide"
                width="138px"
                colors={[
                  "#697785",
                  "#5f6b79",
                  "#515c69",
                  "#434c57",
                  "#353d46",
                  "#e6d56f",
                  "#e5d16d",
                  "#e2c969",
                  "#e0c166",
                  "#dfba64",
                  "#13b1e9",
                  "#14a8d7",
                  "#139bbf",
                  "#118ca3",
                  "#11808c",
                  "#cb2f2f",
                  "#c43232",
                  "#ba3434",
                  "#b03838",
                  "#a53a3b",
                  "#7facb8",
                  "#749eaa",
                  "#688d97",
                  "#587882",
                  "#4c676f",
                  "#20ec14",
                  "#23da13",
                  "#2ac213",
                  "#30a613",
                  "#368d12",
                  "#decd9d",
                  "#d8c796",
                  "#cfc08d",
                  "#c5b982",
                  "#bcb179",
                  "#8ade6b",
                  "#83d563",
                  "#78c557",
                  "#6db64a",
                  "#63a93f",
                  "#ecde14",
                  "#ecd714",
                  "#eccd14",
                  "#ecc214",
                  "#ecb814",
                  "#f2f0e9",
                  "#e9f0e9",
                  "#dcefea",
                  "#ceeeeb",
                  "#c1edec",
                  "#6cb4f3",
                  "#67afee",
                  "#5fa7e6",
                  "#589fde",
                  "#5097d5",
                  "#ec1414",
                  "#db1414",
                  "#c21615",
                  "#a61716",
                  "#8d1718",
                  "#5b3f6e",
                  "#573969",
                  "#513361",
                  "#4a2a58",
                  "#442250",
                  "#a2bfa5",
                  "#96af99",
                  "#839886",
                  "#6e7e70",
                  "#5c665e",
                  "#5ad168",
                  "#59ce74",
                  "#57c883",
                  "#54c194",
                  "#52bca4",
                  "#f9f3ea",
                  "#f6ecdb",
                  "#f2e1c4",
                  "#ecd5aa",
                  "#e7ca94",
                  "#dcaa7f",
                  "#daa171",
                  "#d79561",
                  "#d1884e",
                  "#cd7d3d",
                  "#ec9d14",
                  "#ec9814",
                  "#ec9014",
                  "#ec8714",
                  "#ec7e14"
                ]}
              />
            </Popover>
          }
        >
          <Button
            variant="success"
            onClick={() => this.setState({ editedColor: color.id })}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: color.color,
              borderColor: "#000000"
            }}
          />
        </OverlayTrigger>
      </div>
    );
  }

  render() {
    console.log("State color");
    console.log(this.state.build.colorScheme.data);
    console.log(this.state.build.colorScheme.primary);

    if (
      this.state.frames.loading ||
      this.state.ephemeras.loading ||
      this.state.helmets.loading ||
      this.state.colorPickers.loading
    ) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <ColorPicker
            buttonColorOnClick={color =>
              this.setState({
                build: {
                  ...this.state.build,
                  colorScheme: {
                    ...this.state.build.colorScheme,
                    primary: color.hex
                  }
                }
              })
            }
            color={this.state.build.colorScheme.primary}
            colors={this.state.colorPickers.data}
          />
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Build name</label>
              <input
                className="form-control"
                id="username"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
            <Dropdown
              placeholder="Select Frame"
              fluid
              search
              selection
              options={this.state.frames.data}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.handleSubmit}
            >
              Edit
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.handleSubmit}
            >
              Save
            </button>
          </form>
          <div className="row">
            <div className="col-8">
              PHYSIQUE
              <br />
              Helmet:
              <Dropdown
                placeholder="Select Helmet"
                fluid
                search
                selection
                options={this.state.helmets.data}
              />
              Skin:
              <Dropdown
                placeholder="Select Skin"
                fluid
                search
                selection
                options={this.state.skins.data}
              />
              Helmet:
              <Dropdown
                placeholder="Select Country"
                fluid
                search
                selection
                options={this.state.skins.data}
              />
              Helmet:
              <Dropdown
                placeholder="Select Country"
                fluid
                search
                selection
                options={this.state.skins.data}
              />
              <br />
              <hr />
              COLORS <br />
              <ul className="list-inline">
                <li className="list-inline-item">Primary</li>
                <li className="list-inline-item">
                  {this.colorPicker("#FFFFFF")}
                </li>
              </ul>
              <ul className="list-inline">
                <li className="list-inline-item">Secondary</li>
                <li className="list-inline-item">
                  {this.colorPicker("#FFFFFF")}
                </li>
              </ul>
              <ul className="list-inline">
                <li className="list-inline-item">Tertiary</li>
                <li className="list-inline-item">
                  {this.colorPicker("#FFFFFF")}
                </li>
              </ul>
              <ul className="list-inline">
                <li className="list-inline-item">Accents</li>
                <li className="list-inline-item">
                  {this.colorPicker("#FFFFFF")}
                </li>
              </ul>
              <ul className="list-inline">
                <li className="list-inline-item">Emmissive</li>
                <li className="list-inline-item">
                  {this.colorPicker("#FFFFFF")}
                </li>
                <li className="list-inline-item">
                  {this.colorPicker("#FFFFFF")}
                </li>
              </ul>
              <ul className="list-inline">
                <li className="list-inline-item">Energy</li>
                <li className="list-inline-item">
                  {this.colorPicker("#FFFFFF")}
                </li>
                <li className="list-inline-item">
                  {this.colorPicker("#FFFFFF")}
                </li>
              </ul>
            </div>
            <div className="col-4">
              <img
                alt="Frame fashion"
                src="https://lh3.googleusercontent.com/proxy/Rf2DLgnVuIBK9LWDnf4cWW8KbNSrk-yZfCrkXDJf85_UKEmuS5eYU29_G8snimGguOSm2n4nVo3pYmTbY52oNQ"
                className="frame-fasion"
              ></img>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default NewBuild;
