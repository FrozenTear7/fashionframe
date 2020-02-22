import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchAuth } from "../../utils/fetchAuth";
import Loading from "../utils/Loading.js";

const getColorButton = color => (
  <div
    className={!color ? "color-button transparent-checkered" : "color-button"}
    style={{
      backgroundColor: color ? color : "#d1d1d1"
    }}
  />
);

const getColorsBlock = colorScheme => (
  <div>
    <div className="row">
      {Object.keys(colorScheme)
        .slice(1, 5)
        .map((colorName, i) => (
          <div className="col-3" key={i}>
            <div className="form-group">
              <label htmlFor={colorName}>{colorName}</label>
              <div id={colorName}>{getColorButton(colorScheme[colorName])}</div>
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
              <label htmlFor={colorName}>{colorName}</label>
              <div id={colorName} className="center">
                {getColorButton(colorScheme[colorName])}
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

  async componentDidMount() {
    await this.fetchSetupData();
  }

  render() {
    if (this.state.setup.loading) {
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
        <div className="center">
          <h1>{setup.name}</h1>
          <h3>Frame: {setup.frame}</h3>
          <br />
          <h5>Author: {setup.name}</h5>
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
                  Helmet: {setup.helmet}
                  <br />
                  Skin: {setup.skin}
                  <br />
                </div>
                <div className="col-6">
                  <h4>Colors</h4>
                  {getColorsBlock(setup.colorScheme)}
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
                  Helmet: {setup.helmet}
                  <br />
                  Skin: {setup.skin}
                  <br />
                </div>
                <div className="col-6">
                  <h4>Colors</h4>
                  {getColorsBlock(setup.attachments.colorScheme)}
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
                  Helmet: {setup.helmet}
                  <br />
                  Skin: {setup.skin}
                  <br />
                </div>
                <div className="col-6">
                  <h4>Colors</h4>
                  {getColorsBlock(setup.syandana.colorScheme)}
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
