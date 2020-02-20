import React, { Component } from "react";
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
      value: "",
      build: {
        name: "",
        frame: "Ash",
        description: "",
        screenshot: "",
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
            emmissive1: "",
            emmissive2: "",
            energy1: "",
            energy2: ""
          }
        },
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
      },
      syandanas: {
        loading: true,
        data: [],
        error: null
      }
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleScreenshotChange = this.handleScreenshotChange.bind(this);
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
          />
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
                colorPickerComponent={
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
                }
              />
              <br />
              <NewBuildAttachments
                build={this.state.build}
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
                colorPickerComponent={
                  <NewBuildColors
                    getColorOnClickFunction={colorName => {
                      return color =>
                        this.setState({
                          build: {
                            ...this.state.build,
                            syandana: {
                              ...this.state.build.syandana,
                              colorScheme: {
                                ...this.state.build.attachments.colorScheme,
                                [`${colorName}`]: color.hex
                              }
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
                }
              />
              <br />
              <NewBuildSyandana
                build={this.state.build}
                syandanas={this.state.syandanas.data}
                syandanaOnChange={syandana =>
                  this.buildElementOnChange("syandana", syandana)
                }
                colorPickerComponent={
                  <NewBuildColors
                    getColorOnClickFunction={colorName => {
                      return color =>
                        this.setState({
                          build: {
                            ...this.state.build,
                            attachments: {
                              ...this.state.build.attachments,
                              colorScheme: {
                                ...this.state.build.syandana.colorScheme,
                                [`${colorName}`]: color.hex
                              }
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
                }
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
