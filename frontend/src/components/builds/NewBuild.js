import React, { Component } from "react";
import { fetchAuth } from "../../utils/fetchAuth";
import ColorPicker from "./ColorPicker";
import NewBuildPhysique from "./NewBuildPhysique";
import NewBuildTopPanel from "./NewBuildTopPanel";

class NewBuild extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      build: {
        name: "",
        frame: "Ash",
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
            emmissive1: "",
            emmissive2: "",
            energy1: "",
            energy2: ""
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

    this.handleNameChange = this.handleNameChange.bind(this);
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
          data: resJson.frames
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
          data: resJson.ephemeras
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
          data: resJson.helmets
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
          data: resJson.skins
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
  }

  handleNameChange(event) {
    this.setState({
      build: {
        ...this.state.build,
        name: event.target.value
      }
    });
  }

  render() {
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
          <NewBuildTopPanel
            name={this.state.build.name}
            frames={this.state.frames.data}
            handleNameChange={this.handleNameChange}
            frameOnChange={frame =>
              this.setState({
                build: {
                  ...this.state.build,
                  frame: frame
                }
              })
            }
          />
          <div className="row">
            <div className="col-8">
              <NewBuildPhysique
                helmets={this.state.helmets.data.filter(helmet => {
                  console.log(this.state.build.frame);
                  return helmet.match(`.*${this.state.build.frame} .*`);
                })}
                helmetOnChange={helmet =>
                  this.setState({
                    build: {
                      ...this.state.build,
                      helmet: helmet
                    }
                  })
                }
              />
              COLORS <br />
              <ul className="list-inline">
                <li className="list-inline-item">Primary</li>
                <li className="list-inline-item">
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
                </li>
              </ul>
              <ul className="list-inline">
                <li className="list-inline-item">Secondary</li>
                <li className="list-inline-item">
                  <ColorPicker
                    buttonColorOnClick={color =>
                      this.setState({
                        build: {
                          ...this.state.build,
                          colorScheme: {
                            ...this.state.build.colorScheme,
                            secondary: color.hex
                          }
                        }
                      })
                    }
                    color={this.state.build.colorScheme.secondary}
                    colors={this.state.colorPickers.data}
                  />
                </li>
              </ul>
              <ul className="list-inline">
                <li className="list-inline-item">Tertiary</li>
                <li className="list-inline-item">
                  <ColorPicker
                    buttonColorOnClick={color =>
                      this.setState({
                        build: {
                          ...this.state.build,
                          colorScheme: {
                            ...this.state.build.colorScheme,
                            tertiary: color.hex
                          }
                        }
                      })
                    }
                    color={this.state.build.colorScheme.tertiary}
                    colors={this.state.colorPickers.data}
                  />
                </li>
              </ul>
              <ul className="list-inline">
                <li className="list-inline-item">Accents</li>
                <li className="list-inline-item">
                  <ColorPicker
                    buttonColorOnClick={color =>
                      this.setState({
                        build: {
                          ...this.state.build,
                          colorScheme: {
                            ...this.state.build.colorScheme,
                            accents: color.hex
                          }
                        }
                      })
                    }
                    color={this.state.build.colorScheme.accents}
                    colors={this.state.colorPickers.data}
                  />
                </li>
              </ul>
              <ul className="list-inline">
                <li className="list-inline-item">Emmissive</li>
                <li className="list-inline-item">
                  <ColorPicker
                    buttonColorOnClick={color =>
                      this.setState({
                        build: {
                          ...this.state.build,
                          colorScheme: {
                            ...this.state.build.colorScheme,
                            emmissive1: color.hex
                          }
                        }
                      })
                    }
                    color={this.state.build.colorScheme.emmissive1}
                    colors={this.state.colorPickers.data}
                  />
                </li>
                <li className="list-inline-item">
                  <ColorPicker
                    buttonColorOnClick={color =>
                      this.setState({
                        build: {
                          ...this.state.build,
                          colorScheme: {
                            ...this.state.build.colorScheme,
                            emmissive2: color.hex
                          }
                        }
                      })
                    }
                    color={this.state.build.colorScheme.emmissive2}
                    colors={this.state.colorPickers.data}
                  />
                </li>
              </ul>
              <ul className="list-inline">
                <li className="list-inline-item">Energy</li>
                <li className="list-inline-item">
                  <ColorPicker
                    buttonColorOnClick={color =>
                      this.setState({
                        build: {
                          ...this.state.build,
                          colorScheme: {
                            ...this.state.build.colorScheme,
                            energy1: color.hex
                          }
                        }
                      })
                    }
                    color={this.state.build.colorScheme.energy1}
                    colors={this.state.colorPickers.data}
                  />
                </li>
                <li className="list-inline-item">
                  <ColorPicker
                    buttonColorOnClick={color =>
                      this.setState({
                        build: {
                          ...this.state.build,
                          colorScheme: {
                            ...this.state.build.colorScheme,
                            energy2: color.hex
                          }
                        }
                      })
                    }
                    color={this.state.build.colorScheme.energy2}
                    colors={this.state.colorPickers.data}
                  />
                </li>
              </ul>
            </div>
            <div className="col-4">xd</div>
          </div>
        </div>
      );
    }
  }
}

export default NewBuild;
