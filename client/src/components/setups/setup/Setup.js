import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchAuth } from "../../../utils/fetchAuth";
import Loading from "../../utils/Loading.js";
import SetupPhysique from "./SetupPhysique";
import SetupAttachments from "./SetupAttachments";
import SetupSyandana from "./SetupSyandana";
import SetupTopPanel from "./SetupTopPanel";

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

  async likeSetup() {
    try {
      const res = await fetchAuth(
        `/setups/like/${this.props.match.params.id}`,
        {
          method: "POST",
          body: JSON.stringify({ like: !this.state.setup.data.likedbyyou })
        }
      );

      if (res.ok) {
        this.setState({
          setup: {
            ...this.state.setup,
            loading: false,
            error: "",
            data: {
              ...this.state.setup.data,
              likedbyyou: !this.state.setup.data.likedbyyou,
              liked:
                parseInt(this.state.setup.data.liked) +
                (this.state.setup.data.likedbyyou ? -1 : 1)
            }
          }
        });
      } else {
        const resJson = await res.json();
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
          error: `Could not like setup - please try again`
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
    const { setup, colorPickers } = this.state;

    if (setup.loading || colorPickers.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          {setup.error && (
            <div className="alert alert-danger center" role="alert">
              {setup.error}
              <br />
              <Link to={"/fashionframe/"}>Go back to setups</Link>
            </div>
          )}
          <SetupTopPanel
            setup={setup.data}
            isAuthorized={this.props.isAuthorized}
            userId={this.props.userId}
            setupId={this.props.match.params.id}
          />
          <hr className="divider" />
          <SetupPhysique setup={setup.data} colorPickers={colorPickers.data} />
          <br />
          <SetupAttachments
            attachments={setup.data.attachments}
            colorPickers={colorPickers.data}
          />
          <br />
          <SetupSyandana
            syandana={setup.data.syandana}
            colorPickers={colorPickers.data}
          />
        </div>
      );
    }
  }
}

export default Setup;
