import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchAuth } from "../../utils/fetchAuth";
import Loading from "../utils/Loading.js";
import ColorsModal from "../utils/ColorsModal.js";
import { ColorButton } from "../utils/ColorButton.js";

const formatName = name => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const getColorButton = (color, colorPickers, modalName) => {
  return (
    <div>
      {ColorButton(color)}
      <br />
      {color && (
        <ColorsModal
          color={color}
          colorPickers={colorPickers}
          modalName={modalName}
        />
      )}
    </div>
  );
};

const getColorsBlock = (colorScheme, colorPickers, modalName) => (
  <div>
    <div className="row">
      {Object.keys(colorScheme)
        .slice(1, 5)
        .map((colorName, i) => (
          <div className="col-3" key={i}>
            <div className="form-group">
              <label htmlFor={colorName}>{formatName(colorName)}</label>
              <div id={colorName}>
                {getColorButton(
                  colorScheme[colorName],
                  colorPickers,
                  modalName + colorName
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
    <br />
    <div className="row">
      {Object.keys(colorScheme)
        .slice(5, 9)
        .map((colorName, i) => (
          <div className="col-3" key={i}>
            <div className="form-group">
              <label htmlFor={colorName}>{formatName(colorName)}</label>
              <div id={colorName}>
                {getColorButton(
                  colorScheme[colorName],
                  colorPickers,
                  modalName + colorName
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
);

class Setup extends Component {
  constructor() {
    super();
    this.state = {
      setup: {
        loading: true,
        data: {},
        error: ""
      },
      colorPickers: {
        loading: true,
        data: [],
        error: ""
      }
    };
  }

  async fetchSetupData() {
    try {
      const res = await fetchAuth(`/setups/${this.props.match.params.id}`);
      const resJson = await res.json();

      if (res.ok) {
        this.setState({
          setup: {
            ...this.state.setup,
            loading: false,
            error: "",
            data: resJson.setup
          }
        });
      } else {
        this.setState({
          setup: {
            ...this.state.setup,
            loading: false,
            error: resJson.message
          }
        });
      }
    } catch (error) {
      this.setState({
        setup: {
          ...this.state.setup,
          loading: false,
          error: `Could not fetch setup data`
        }
      });
    }
  }

  async fetchColorPickers() {
    try {
      const res = await fetchAuth(`/api/colorPickers`);
      const resJson = await res.json();

      if (res.ok) {
        this.setState({
          colorPickers: {
            ...this.state.colorPickers,
            loading: false,
            error: "",
            data: resJson.colorPickers
          }
        });
      } else {
        this.setState({
          colorPickers: {
            ...this.state.colorPickers,
            loading: false,
            error: resJson.message
          }
        });
      }
    } catch (error) {
      this.setState({
        colorPickers: {
          ...this.state.colorPickers,
          loading: false,
          error: `Could not fetch colors data`
        }
      });
    }
  }

  async componentDidMount() {
    await this.fetchSetupData();
    await this.fetchColorPickers();
  }

  render() {
    if (this.state.setup.loading || this.state.colorPickers.loading) {
      return <Loading />;
    } else if (this.state.setup.error) {
      return (
        <div className="alert alert-danger center" role="alert">
          {this.state.setup.error}
          <br />
          <Link to={"/search"}>Go back to setups</Link>
        </div>
      );
    } else {
      const setup = this.state.setup.data;

      return (
        <div>
          <h1 className="center">{setup.name}</h1>
          <br />
          <div className="row">
            <div className="col-4">
              <h3>Frame: {setup.frame}</h3>
              <br />
              <h5>Description: {setup.description}</h5>
              <br />
              <h5>Author: {setup.name}</h5>
            </div>
            <div className="col-8">
              <img
                src="https://vignette.wikia.nocookie.net/warframe/images/c/cf/Chroma.jpg/revision/latest?cb=20151013193410"
                alt="Thumbnail"
                className="setup-image"
              />
            </div>
          </div>
          <hr className="divider" />
          <div
            className="center collapse-button-dark"
            data-toggle="collapse"
            data-target="#collapsePhysique"
            aria-expanded="false"
            aria-controls="collapsePhysique"
          >
            PHYSIQUE
          </div>
          <div className="collapse show" id="collapsePhysique">
            <div className="card card-body">
              <div className="row">
                <div className="col-6">
                  Helmet <h3>{setup.helmet}</h3>
                  <br />
                  Skin <h3>{setup.skin}</h3>
                </div>
                <div className="col-6">
                  {getColorsBlock(
                    setup.colorScheme,
                    this.state.colorPickers.data,
                    "physique"
                  )}
                </div>
              </div>
            </div>
          </div>
          <br />
          <div
            className="center collapse-button-dark"
            data-toggle="collapse"
            data-target="#collapseAttachments"
            aria-expanded="false"
            aria-controls="collapseAttachments"
          >
            ATTACHMENTS
          </div>
          <div className="collapse" id="collapseAttachments">
            <div className="card card-body">
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="col-6">
                      Chest <h3>{setup.attachments.chest || "None"}</h3>
                      <br />
                      Left Arm <h3>{setup.attachments.leftArm || "None"}</h3>
                      <br />
                      Left Leg <h3>{setup.attachments.leftLeg || "None"}</h3>
                      <br />
                    </div>
                    <div className="col-6">
                      Ephemera <h3>{setup.attachments.ephemera || "None"}</h3>
                      <br />
                      Right Arm <h3>{setup.attachments.rightArm || "None"}</h3>
                      <br />
                      Left Leg <h3>{setup.attachments.rightArm || "None"}</h3>
                      <br />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  {getColorsBlock(
                    setup.attachments.colorScheme,
                    this.state.colorPickers.data,
                    "attachments"
                  )}
                </div>
              </div>
            </div>
          </div>
          <br />
          <div
            className="center collapse-button-dark"
            data-toggle="collapse"
            data-target="#collapseSyandana"
            aria-expanded="false"
            aria-controls="collapseSyandana"
          >
            SYANDANA
          </div>
          <div className="collapse" id="collapseSyandana">
            <div className="card card-body">
              <div className="row">
                <div className="col-6">
                  Syandana <h3>{setup.syandana.name || "None"}</h3>
                </div>
                <div className="col-6">
                  {getColorsBlock(
                    setup.syandana.colorScheme,
                    this.state.colorPickers.data,
                    "syandana"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Setup;
