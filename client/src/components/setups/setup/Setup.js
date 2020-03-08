import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchAuth, fetchAuthPostJson } from "../../../utils/fetchAuth";
import Loading from "../../utils/Loading.js";
import SetupPhysique from "./SetupPhysique";
import SetupAttachments from "./SetupAttachments";
import SetupSyandana from "./SetupSyandana";
import SetupTopPanel from "./SetupTopPanel";
import { Helmet } from "react-helmet";

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

    this.likeSetup = this.likeSetup.bind(this);
  }

  async fetchResources(url, resourceName) {
    try {
      const res = await fetchAuth(url);
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

  async likeSetup() {
    try {
      const res = await fetchAuthPostJson(
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

  async componentDidMount() {
    this.fetchResources(`/api/colorPickers`, "colorPickers");
    this.fetchResources(`/setups/${this.props.match.params.id}`, "setup");
  }

  render() {
    const { setup, colorPickers } = this.state;
    const { match, isAuthorized, userId } = this.props;

    if (setup.loading || colorPickers.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <Helmet>
            <title>Fashionframe - your own Warframe fashion show</title>
            <meta
              name="description"
              content="Check out how to create this fashion setup in game on your own"
            />
          </Helmet>
          {setup.error && (
            <div className="alert alert-danger center" role="alert">
              {setup.error}
              <br />
              <Link to={"/fashionframe/"}>Go back to setups</Link>
            </div>
          )}
          <SetupTopPanel
            setup={setup.data}
            isAuthorized={isAuthorized}
            userId={userId}
            setupId={match.params.id}
            likeSetup={this.likeSetup}
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
