import React, { Component } from "react";
import { Redirect } from "react-router";
import { fetchAuth } from "../../utils/fetchAuth";
import NewSetupPhysique from "./NewSetupPhysique";
import NewSetupAttachments from "./NewSetupAttachments";
import NewSetupColors from "./NewSetupColors";
import NewSetupTopPanel from "./NewSetupTopPanel";
import NewSetupDescription from "./NewSetupDescription";
import NewSetupSyandana from "./NewSetupSyandana";
import Loading from "../utils/Loading";

class NewSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createSetupRedirect: false,
      deleteSetupRedirect: false,
      setupId: "",
      setupError: "",
      setupLoading: this.props.mode === "edit" ? true : false,
      setup: {
        id: "",
        name: "",
        frame: "Ash",
        description: "",
        screenshot: "",
        skin: "Ash Skin",
        helmet: "Ash Helmet",
        attachments: {
          id: "",
          chest: "",
          leftArm: "",
          rightArm: "",
          leftLeg: "",
          rightLeg: "",
          ephemera: "",
          colorScheme: {
            id: "",
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
          id: "",
          name: "",
          colorScheme: {
            id: "",
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
          id: "",
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
    this.postNewSetup = this.postNewSetup.bind(this);
    this.deleteSetup = this.deleteSetup.bind(this);
  }

  getErrorFormMessages() {
    let outputErrorMessage = "";

    if (!this.state.setup.name) outputErrorMessage += ", provide setup name";
    if (!this.state.setup.screenshot)
      outputErrorMessage += ", provide setup screenshot URL";

    return outputErrorMessage;
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
      this.state.setupError
    ];

    errorArray.forEach(error => {
      if (error) return (outputErrorMessage += error + ", ");
    });

    if (outputErrorMessage.length > 2)
      outputErrorMessage = outputErrorMessage.slice(
        0,
        outputErrorMessage.length - 2
      );

    if (outputErrorMessage) outputErrorMessage += this.getErrorFormMessages();

    if (outputErrorMessage) {
      return (
        <div className="alert alert-danger" role="alert">
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

  async fetchSetupData() {
    try {
      const res = await fetchAuth(`/setups/${this.props.match.params.id}`);
      const resJson = await res.json();

      if (res.ok) {
        this.setState({
          setupLoading: false,
          setup: resJson.setup
        });
      } else {
        this.setState({
          setupLoading: false,
          setupError: resJson.message
        });
      }
    } catch (error) {
      this.setState({
        setupLoading: false,
        setupError: `Could not fetch setup data`
      });
    }
  }

  async postNewSetup() {
    try {
      const res = await fetchAuth(
        `/setups${
          this.props.mode === "edit" ? `/${this.props.match.params.id}` : ""
        }`,
        {
          method: this.props.mode === "edit" ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ setup: this.state.setup })
        }
      );
      const resJson = await res.json();

      if (res.ok) {
        this.setState({
          createSetupRedirect: true,
          setupId: resJson.setupId
        });
      } else {
        this.setState({
          setupError: resJson.message
        });
      }
    } catch (error) {
      this.setState({
        setupError:
          this.props.mode === "edit"
            ? "Could not update setup"
            : "Could not create setup"
      });
    }
  }

  async deleteSetup() {
    if (this.props.mode === "edit") {
      try {
        const res = await fetchAuth(`/setups/${this.props.match.params.id}`, {
          method: "DELETE"
        });

        if (res.ok) {
          this.setState({
            deleteSetupRedirect: true
          });
        } else {
          const resJson = await res.json();

          this.setState({
            setupError: resJson.message
          });
        }
      } catch (error) {
        this.setState({
          setupError: "Could delete setup"
        });
      }
    } else if (this.props.mode === "new") {
      this.setState({ deleteSetupRedirect: true });
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

    if (this.props.mode === "edit") await this.fetchSetupData();
  }

  handleNameChange(event) {
    this.setState({
      setup: {
        ...this.state.setup,
        name: event.target.value
      }
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      setup: {
        ...this.state.setup,
        description: event.target.value
      }
    });
  }

  handleScreenshotChange(event) {
    this.setState({
      setup: {
        ...this.state.setup,
        screenshot: event.target.value
      }
    });
  }

  setupElementOnChange(elementName, value) {
    this.setState({
      setup: {
        ...this.state.setup,
        [elementName]: value
      }
    });
  }

  attachmentsElementOnChange(elementName, value) {
    this.setState({
      setup: {
        ...this.state.setup,
        attachments: {
          ...this.state.setup.attachments,
          [elementName]: value
        }
      }
    });
  }

  syandanaOnChange(elementName, value) {
    this.setState({
      setup: {
        ...this.state.setup,
        syandanaOnChange: {
          ...this.state.setup.syandanaOnChange,
          [elementName]: value
        }
      }
    });
  }

  getColorPickersComponent(getColorOnClickFunction, setupColors) {
    return (
      <NewSetupColors
        getColorOnClickFunction={getColorOnClickFunction}
        setupColors={setupColors}
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
    if (this.state.createSetupRedirect) {
      return <Redirect push to={`/setups/${this.state.setupId}`} />;
    }

    if (this.state.deleteSetupRedirect) {
      return <Redirect push to={`/`} />;
    }

    if (
      this.state.frames.loading ||
      this.state.ephemeras.loading ||
      this.state.skins.loading ||
      this.state.helmets.loading ||
      this.state.colorPickers.loading ||
      this.state.chestAttachments.loading ||
      this.state.armAttachments.loading ||
      this.state.legAttachments.loading ||
      this.state.syandanas.loading ||
      this.state.setupLoading
    ) {
      return <Loading />;
    } else {
      return (
        <div>
          <NewSetupTopPanel
            setup={this.state.setup}
            frames={this.state.frames.data}
            handleNameChange={this.handleNameChange}
            frameOnChange={frame => this.setupElementOnChange("frame", frame)}
            saveSetupOnClick={this.postNewSetup}
            deleteSetupOnClick={this.deleteSetup}
          />
          {this.getErrorMessages()}
          <hr className="divider" />
          <br />
          <div className="row">
            <div className="col-8">
              <NewSetupPhysique
                setup={this.state.setup}
                helmets={this.state.helmets.data.filter(helmet =>
                  helmet.match(`.*${this.state.setup.frame} .*`)
                )}
                helmetOnChange={helmet =>
                  this.setupElementOnChange("helmet", helmet)
                }
                skins={this.state.skins.data.filter(skin =>
                  skin.match(`.*${this.state.setup.frame} .*`)
                )}
                skinOnChange={skin => this.setupElementOnChange("skin", skin)}
                colorPickerComponent={this.getColorPickersComponent(
                  colorName => {
                    return color =>
                      this.setState({
                        setup: {
                          ...this.state.setup,
                          colorScheme: {
                            ...this.state.setup.colorScheme,
                            [`${colorName}`]: color.hex
                          }
                        }
                      });
                  },
                  this.state.setup.colorScheme
                )}
              />
              <br />
              <NewSetupAttachments
                setup={this.state.setup}
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
                        setup: {
                          ...this.state.setup,
                          attachments: {
                            ...this.state.setup.attachments,
                            colorScheme: {
                              ...this.state.setup.attachments.colorScheme,
                              [`${colorName}`]: color.hex
                            }
                          }
                        }
                      });
                  },
                  this.state.setup.attachments.colorScheme
                )}
              />
              <br />
              <NewSetupSyandana
                setup={this.state.setup}
                syandanas={this.state.syandanas.data}
                syandanaOnChange={syandana =>
                  this.syandanaOnChange("syandana", syandana)
                }
                colorPickerComponent={this.getColorPickersComponent(
                  colorName => {
                    return color =>
                      this.setState({
                        setup: {
                          ...this.state.setup,
                          syandana: {
                            ...this.state.setup.syandana,
                            colorScheme: {
                              ...this.state.setup.syandana.colorScheme,
                              [`${colorName}`]: color.hex
                            }
                          }
                        }
                      });
                  },
                  this.state.setup.syandana.colorScheme
                )}
              />
            </div>
            <div className="col-4">
              <NewSetupDescription
                description={this.state.setup.description}
                handleDescriptionChange={this.handleDescriptionChange}
                screenshot={this.state.setup.screenshot}
                handleScreenshotChange={this.handleScreenshotChange}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default NewSetup;
