import React, { Component } from "react";
import { Redirect } from "react-router";
import { fetchAuth } from "../../../utils/fetchAuth";
import NewSetupPhysique from "./NewSetupPhysique";
import NewSetupAttachments from "./NewSetupAttachments";
import NewSetupColors from "./NewSetupColors";
import NewSetupTopPanel from "./NewSetupTopPanel";
import NewSetupDescription from "./NewSetupDescription";
import NewSetupSyandana from "./NewSetupSyandana";
import Loading from "../../utils/Loading";
import {
  isSetupNameValid,
  isSetupDescriptionValid
} from "../../../utils/validators.js";

class NewSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showValidationMessages: false,
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
      },
      postSetupLoading: false
    };

    this.handleSetupChange = this.handleSetupChange.bind(this);
    this.attachmentsElementOnChange = this.attachmentsElementOnChange.bind(
      this
    );
    this.setupElementOnChange = this.setupElementOnChange.bind(this);
    this.setupColorOnChange = this.setupColorOnChange.bind(this);
    this.attachmentsColorOnChange = this.attachmentsColorOnChange.bind(this);
    this.syandanaColorOnChange = this.syandanaColorOnChange.bind(this);
    this.postNewSetup = this.postNewSetup.bind(this);
    this.deleteSetup = this.deleteSetup.bind(this);
    this.copyMainColors = this.copyMainColors.bind(this);

    this.screenshotFileRef = React.createRef();
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
    if (
      isSetupNameValid(this.state.setup.name) &&
      isSetupDescriptionValid(this.state.setup.description) &&
      (this.state.setup.screenshot || this.screenshotFileRef.current.files[0])
    ) {
      try {
        const formData = new FormData();

        this.setState({ postSetupLoading: true });

        if (this.screenshotFileRef.current.files[0])
          formData.append("file", this.screenshotFileRef.current.files[0]);

        formData.append("setup", JSON.stringify(this.state.setup));

        const res = await fetchAuth(
          `/setups${
            this.props.mode === "edit" ? `/${this.props.match.params.id}` : ""
          }`,
          {
            method: this.props.mode === "edit" ? "PUT" : "POST",
            body: formData
          }
        );
        const resJson = await res.json();

        if (res.ok) {
          this.setState({
            createSetupRedirect: true,
            setupId: resJson.setupId,
            postSetupLoading: false
          });
        } else {
          this.setState({
            setupError: resJson.message,
            postSetupLoading: false
          });
        }
      } catch (error) {
        this.setState({
          setupError:
            this.props.mode === "edit"
              ? "Could not update setup"
              : "Could not create setup",
          postSetupLoading: false
        });
      }
    } else {
      this.setState({ showValidationMessages: true });
    }
  }

  async deleteSetup() {
    if (this.props.mode === "edit") {
      try {
        this.setState({ postSetupLoading: true });

        const res = await fetchAuth(`/setups/${this.props.match.params.id}`, {
          method: "DELETE"
        });

        if (res.ok) {
          this.setState({
            deleteSetupRedirect: true,
            postSetupLoading: false
          });
        } else {
          const resJson = await res.json();

          this.setState({
            setupError: resJson.message,
            postSetupLoading: false
          });
        }
      } catch (error) {
        this.setState({
          setupError: "Could not delete setup",
          postSetupLoading: false
        });
      }
    } else if (this.props.mode === "new") {
      this.setState({ deleteSetupRedirect: true });
    }
  }

  async componentDidMount() {
    this.fetchWarframeData("frames");
    this.fetchWarframeData("ephemeras");
    this.fetchWarframeData("skins");
    this.fetchWarframeData("helmets");
    this.fetchWarframeData("colorPickers");
    this.fetchWarframeData("chestAttachments");
    this.fetchWarframeData("armAttachments");
    this.fetchWarframeData("legAttachments");
    this.fetchWarframeData("syandanas");

    if (this.props.mode === "edit") this.fetchSetupData();
  }

  handleSetupChange(e, fieldName) {
    this.setState({
      setup: {
        ...this.state.setup,
        [fieldName]: e.target.value
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
        syandana: {
          ...this.state.setup.syandana,
          [elementName]: value
        }
      }
    });
  }

  setupColorOnChange(colorName, color) {
    this.setState({
      setup: {
        ...this.state.setup,
        colorScheme: {
          ...this.state.setup.colorScheme,
          [`${colorName}`]: color.hex
        }
      }
    });
  }

  attachmentsColorOnChange(colorName, color) {
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
  }

  syandanaColorOnChange(colorName, color) {
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
  }

  getColorPickersComponent(getColorOnClickFunction, setupColors, sectionName) {
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
        sectionName={sectionName}
        copyMainColors={() => this.copyMainColors(sectionName)}
      />
    );
  }

  copyMainColors(sectionName) {
    this.setState({
      setup: {
        ...this.state.setup,
        [sectionName]: {
          ...this.state.setup[sectionName],
          colorScheme: this.state.setup.colorScheme
        }
      }
    });
  }

  render() {
    const {
      showValidationMessages,
      createSetupRedirect,
      setupId,
      deleteSetupRedirect,
      frames,
      ephemeras,
      skins,
      helmets,
      colorPickers,
      chestAttachments,
      armAttachments,
      legAttachments,
      syandanas,
      setupLoading,
      setup,
      postSetupLoading
    } = this.state;

    if (createSetupRedirect) {
      return <Redirect push to={`/fashionframe/setups/${setupId}`} />;
    }

    if (deleteSetupRedirect) {
      return <Redirect push to={`/fashionframe/`} />;
    }

    if (
      frames.loading ||
      ephemeras.loading ||
      skins.loading ||
      helmets.loading ||
      colorPickers.loading ||
      chestAttachments.loading ||
      armAttachments.loading ||
      legAttachments.loading ||
      syandanas.loading ||
      setupLoading
    ) {
      return <Loading />;
    } else {
      return (
        <div>
          <NewSetupTopPanel
            setup={setup}
            frames={frames.data}
            handleNameChange={e => this.handleSetupChange(e, "name")}
            frameOnChange={frame => this.setupElementOnChange("frame", frame)}
            saveSetupOnClick={this.postNewSetup}
            deleteSetupOnClick={this.deleteSetup}
            showValidationMessages={showValidationMessages}
            postSetupLoading={postSetupLoading}
          />
          {this.getErrorMessages()}
          <hr className="divider" />
          <br />
          <div className="d-flex flex-wrap">
            <div className="px-4 py-2">
              <NewSetupDescription
                description={setup.description}
                screenshot={setup.screenshot}
                handleDescriptionChange={e =>
                  this.handleSetupChange(e, "description")
                }
                handleScreenshotChange={this.handleScreenshotChange}
                screenshotFileRef={this.screenshotFileRef}
                showValidationMessages={showValidationMessages}
              />
            </div>
            <div className="px-4 py-2 flex-grow-1">
              <NewSetupPhysique
                setup={setup}
                helmets={helmets.data.filter(helmet =>
                  helmet.match(`.*${setup.frame} .*`)
                )}
                helmetOnChange={helmet =>
                  this.setupElementOnChange("helmet", helmet)
                }
                skins={skins.data.filter(skin =>
                  skin.match(`.*${setup.frame} .*`)
                )}
                skinOnChange={skin => this.setupElementOnChange("skin", skin)}
                colorPickerComponent={this.getColorPickersComponent(
                  this.setupColorOnChange,
                  setup.colorScheme,
                  "setup"
                )}
              />
              <br />
              <NewSetupAttachments
                setup={setup}
                chestAttachments={chestAttachments.data}
                ephemeras={ephemeras.data}
                armAttachments={armAttachments.data}
                legAttachments={legAttachments.data}
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
                  this.attachmentsColorOnChange,
                  setup.attachments.colorScheme,
                  "attachments"
                )}
              />
              <br />
              <NewSetupSyandana
                setup={setup}
                syandanas={syandanas.data}
                syandanaOnChange={syandana =>
                  this.syandanaOnChange("name", syandana)
                }
                colorPickerComponent={this.getColorPickersComponent(
                  this.syandanaColorOnChange,
                  setup.syandana.colorScheme,
                  "syandana"
                )}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default NewSetup;
