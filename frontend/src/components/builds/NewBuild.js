import React, { Component } from "react";
import { fetchAuth } from "../../utils/fetchAuth";
import NewBuildPhysique from "./NewBuildPhysique";
import NewBuildAttachments from "./NewBuildAttachments";
import NewBuildColors from "./NewBuildColors";
import NewBuildTopPanel from "./NewBuildTopPanel";
import NewBuildDescription from "./NewBuildDescription";

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
      },
      chestAttachments: {
        loading: true,
        data: [],
        error: null
      },
      armAttachments: {
        loading: true,
        data: [],
        error: null
      },
      legAttachments: {
        loading: true,
        data: [],
        error: null
      }
    };

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  async fetchWarframeData(resourceName) {
    try {
      const res = await fetchAuth(`/api/${resourceName}`);
      const resJson = await res.json();

      this.setState({
        [resourceName]: {
          ...this.state[resourceName],
          loading: false,
          error: null,
          data: resJson[resourceName]
        }
      });
    } catch (error) {
      this.setState({
        [resourceName]: {
          ...this.state[resourceName],
          loading: false,
          error: error.message
        }
      });
    }
  }

  async componentDidMount() {
    await this.fetchWarframeData("frames");
    await this.fetchWarframeData("ephemeras");
    await this.fetchWarframeData("helmets");
    await this.fetchWarframeData("colorPickers");
    await this.fetchWarframeData("chestAttachments");
    await this.fetchWarframeData("armAttachments");
    await this.fetchWarframeData("legAttachments");
  }

  handleNameChange(event) {
    this.setState({
      build: {
        ...this.state.build,
        name: event.target.value
      }
    });
  }

  buildElementOnChange(elementName, value) {
    this.setState({
      build: {
        ...this.state.build,
        [elementName]: value
      }
    });
  }

  attachmentsElementOnChange(elementName, value) {
    this.setState({
      build: {
        ...this.state.build,
        attachments: {
          ...this.state.build.attachments,
          [elementName]: value
        }
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
            frameOnChange={frame => this.buildElementOnChange("frame", frame)}
          />
          <div className="row">
            <div className="col-8">
              <NewBuildPhysique
                helmets={this.state.helmets.data.filter(helmet =>
                  helmet.match(`.*${this.state.build.frame} .*`)
                )}
                helmetOnChange={helmet =>
                  this.buildElementOnChange("helmet", helmet)
                }
              />
              <br />
              <NewBuildAttachments
                chestAttachments={this.state.chestAttachments.data}
                ephemeras={this.state.ephemeras.data}
                armAttachments={this.state.armAttachments.data}
                legAttachments={this.state.legAttachments.data}
                chestOnChange={chest =>
                  this.buildElementOnChange("chest", chest)
                }
                ephemeraOnChange={ephemera =>
                  this.buildElementOnChange("ephemera", ephemera)
                }
                leftArmOnChange={leftArm =>
                  this.buildElementOnChange("leftArm", leftArm)
                }
                rightArmOnChange={rightArm =>
                  this.buildElementOnChange("rightArm", rightArm)
                }
                leftLegOnChange={leftLeg =>
                  this.buildElementOnChange("leftLeg", leftLeg)
                }
                rightLegOnChange={rightLeg =>
                  this.buildElementOnChange("rightLeg", rightLeg)
                }
              />
              <NewBuildColors
                getColorOnClickFunction={colorName => {
                  return color =>
                    this.setState({
                      build: {
                        ...this.state.build,
                        colorScheme: {
                          ...this.state.build.colorScheme,
                          [`${colorName}`]: color.hex
                        }
                      }
                    });
                }}
                buildColors={this.state.build.colorScheme}
                colorNames={[
                  "primary",
                  "secondary",
                  "tertiary",
                  "accents",
                  "emmissive1",
                  "emmissive2",
                  "energy1",
                  "energy2"
                ]}
                colorPickers={this.state.colorPickers.data}
              />
            </div>
            <div className="col-4">
              <NewBuildDescription />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default NewBuild;
