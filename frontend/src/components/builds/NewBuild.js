import React, { Component } from "react";
import { Redirect } from "react-router";
import { fetchAuth } from "../../utils/fetchAuth";
import NewBuildPhysique from "./NewBuildPhysique";
import NewBuildAttachments from "./NewBuildAttachments";
import NewBuildColors from "./NewBuildColors";
import NewBuildTopPanel from "./NewBuildTopPanel";
import NewBuildDescription from "./NewBuildDescription";
import NewBuildSyandana from "./NewBuildSyandana";

class NewBuild extends Component {
  constructor() {
    super();
    this.state = {
      buildError: "",
      build: {
        name: "",
        frame: "Ash",
        description: "",
        screenshot: "",
        skin: "Ash Skin",
        helmet: "Ash Helmet",
        attachments: {
          chest: "",
          leftArm: "",
          rightArm: "",
          leftLeg: "",
          rightLeg: "",
          ephemera: "",
          colorScheme: {
            primary: null,
            secondary: null,
            tertiary: null,
            accents: null,
            emmissive1: null,
            emmissive2: null,
            energy1: null,
            energy2: null
          }
        },
        syandana: {
          name: "",
          colorScheme: {
            primary: null,
            secondary: null,
            tertiary: null,
            accents: null,
            emmissive1: null,
            emmissive2: null,
            energy1: null,
            energy2: null
          }
        },
        colorScheme: {
          primary: null,
          secondary: null,
          tertiary: null,
          accents: null,
          emmissive1: null,
          emmissive2: null,
          energy1: null,
          energy2: null
        }
      },
      frames: {
        loading: true,
        data: [],
        error: ""
      },
      ephemeras: {
        loading: true,
        data: [],
        error: ""
      },
      helmets: {
        loading: true,
        data: [],
        error: ""
      },
      skins: {
        loading: true,
        data: [],
        error: ""
      },
      colorPickers: {
        loading: true,
        data: [],
        error: ""
      },
      chestAttachments: {
        loading: true,
        data: [],
        error: ""
      },
      armAttachments: {
        loading: true,
        data: [],
        error: ""
      },
      legAttachments: {
        loading: true,
        data: [],
        error: ""
      },
      syandanas: {
        loading: true,
        data: [],
        error: ""
      }
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleScreenshotChange = this.handleScreenshotChange.bind(this);
    this.postNewBuild = this.postNewBuild.bind(this);
  }

  getErrorMessages() {
    let outputErrorMessage = "";

    const errorArray = [
      this.state.frames.error,
      this.state.ephemeras.error,
      this.state.skins.error,
      this.state.helmets.error,
      this.state.colorPickers.error,
      this.state.chestAttachments.error,
      this.state.armAttachments.error,
      this.state.legAttachments.error,
      this.state.syandanas.error,
      this.state.buildError
    ];

    errorArray.forEach(error => {
      if (error) return (outputErrorMessage += error + ", ");
    });

    if (outputErrorMessage.length > 2)
      outputErrorMessage = outputErrorMessage.slice(
        0,
        outputErrorMessage.length - 2
      );

    if (outputErrorMessage) {
      return (
        <div class="alert alert-danger" role="alert">
          {outputErrorMessage}
        </div>
      );
    } else {
      return <span />;
    }
  }

  async fetchWarframeData(resourceName) {
    try {
      const res = await fetchAuth(`/api/${resourceName}`);
      const resJson = await res.json();

      if (res.ok) {
        this.setState({
          [resourceName]: {
            ...this.state[resourceName],
            loading: false,
            error: "",
            data: resJson[resourceName]
          }
        });
      } else {
        this.setState({
          [resourceName]: {
            ...this.state[resourceName],
            loading: false,
            error: resJson.message
          }
        });
      }
    } catch (error) {
      this.setState({
        [resourceName]: {
          ...this.state[resourceName],
          loading: false,
          error: `Could not fetch ${resourceName}`
        }
      });
    }
  }

  async postNewBuild() {
    try {
      const res = await fetchAuth(`/builds`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ build: this.state.build })
      });

      if (res.ok) {
        return <Redirect push to="/" />;
      } else {
        const resJson = await res.json();
        this.setState({
          buildError: resJson.message
        });
      }
    } catch (error) {
      this.setState({
        buildError: "Could not create build"
      });
    }
  }

  async componentDidMount() {
    await this.fetchWarframeData("frames");
    await this.fetchWarframeData("ephemeras");
    await this.fetchWarframeData("skins");
    await this.fetchWarframeData("helmets");
    await this.fetchWarframeData("colorPickers");
    await this.fetchWarframeData("chestAttachments");
    await this.fetchWarframeData("armAttachments");
    await this.fetchWarframeData("legAttachments");
    await this.fetchWarframeData("syandanas");
  }

  handleNameChange(event) {
    this.setState({
      build: {
        ...this.state.build,
        name: event.target.value
      }
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      build: {
        ...this.state.build,
        description: event.target.value
      }
    });
  }

  handleScreenshotChange(event) {
    this.setState({
      build: {
        ...this.state.build,
        screenshot: event.target.value
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

  syandanaOnChange(elementName, value) {
    this.setState({
      build: {
        ...this.state.build,
        syandanaOnChange: {
          ...this.state.build.syandanaOnChange,
          [elementName]: value
        }
      }
    });
  }

  getColorPickersComponent(getColorOnClickFunction, buildColors) {
    return (
      <NewBuildColors
        getColorOnClickFunction={getColorOnClickFunction}
        buildColors={buildColors}
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
    );
  }

  render() {
    if (
      this.state.frames.loading ||
      this.state.ephemeras.loading ||
      this.state.skins.loading ||
      this.state.helmets.loading ||
      this.state.colorPickers.loading ||
      this.state.chestAttachments.loading ||
      this.state.armAttachments.loading ||
      this.state.legAttachments.loading ||
      this.state.syandanas.loading
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
            build={this.state.build}
            frames={this.state.frames.data}
            handleNameChange={this.handleNameChange}
            frameOnChange={frame => this.buildElementOnChange("frame", frame)}
            saveBuildOnClick={this.postNewBuild}
          />
          {this.getErrorMessages()}
          <hr className="divider" />
          <br />
          <div className="row">
            <div className="col-8">
              <NewBuildPhysique
                build={this.state.build}
                helmets={this.state.helmets.data.filter(helmet =>
                  helmet.match(`.*${this.state.build.frame} .*`)
                )}
                helmetOnChange={helmet =>
                  this.buildElementOnChange("helmet", helmet)
                }
                skins={this.state.skins.data.filter(skin =>
                  skin.match(`.*${this.state.build.frame} .*`)
                )}
                skinOnChange={skin => this.buildElementOnChange("skin", skin)}
                colorPickerComponent={this.getColorPickersComponent(
                  colorName => {
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
                  },
                  this.state.build.colorScheme
                )}
              />
              <br />
              <NewBuildAttachments
                build={this.state.build}
                chestAttachments={this.state.chestAttachments.data}
                ephemeras={this.state.ephemeras.data}
                armAttachments={this.state.armAttachments.data}
                legAttachments={this.state.legAttachments.data}
                chestOnChange={chest =>
                  this.attachmentsElementOnChange("chest", chest)
                }
                ephemeraOnChange={ephemera =>
                  this.attachmentsElementOnChange("ephemera", ephemera)
                }
                leftArmOnChange={leftArm =>
                  this.attachmentsElementOnChange("leftArm", leftArm)
                }
                rightArmOnChange={rightArm =>
                  this.attachmentsElementOnChange("rightArm", rightArm)
                }
                leftLegOnChange={leftLeg =>
                  this.attachmentsElementOnChange("leftLeg", leftLeg)
                }
                rightLegOnChange={rightLeg =>
                  this.attachmentsElementOnChange("rightLeg", rightLeg)
                }
                colorPickerComponent={this.getColorPickersComponent(
                  colorName => {
                    return color =>
                      this.setState({
                        build: {
                          ...this.state.build,
                          attachments: {
                            ...this.state.build.attachments,
                            colorScheme: {
                              ...this.state.build.attachments.colorScheme,
                              [`${colorName}`]: color.hex
                            }
                          }
                        }
                      });
                  },
                  this.state.build.attachments.colorScheme
                )}
              />
              <br />
              <NewBuildSyandana
                build={this.state.build}
                syandanas={this.state.syandanas.data}
                syandanaOnChange={syandana =>
                  this.syandanaOnChange("syandana", syandana)
                }
                colorPickerComponent={this.getColorPickersComponent(
                  colorName => {
                    return color =>
                      this.setState({
                        build: {
                          ...this.state.build,
                          syandana: {
                            ...this.state.build.syandana,
                            colorScheme: {
                              ...this.state.build.syandana.colorScheme,
                              [`${colorName}`]: color.hex
                            }
                          }
                        }
                      });
                  },
                  this.state.build.syandana.colorScheme
                )}
              />
            </div>
            <div className="col-4">
              <NewBuildDescription
                description={this.state.build.description}
                handleDescriptionChange={this.handleDescriptionChange}
                screenshot={this.state.build.screenshot}
                handleScreenshotChange={this.handleScreenshotChange}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default NewBuild;
