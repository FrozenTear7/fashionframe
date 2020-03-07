import React, { Component } from "react";
import { fetchAuth } from "../../utils/fetchAuth";
import Loading from "../utils/Loading";
import SearchList from "../search/SearchList";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      frames: {
        loading: true,
        data: [],
        error: ""
      },
      userInfo: {
        loading: true,
        data: [],
        error: ""
      },
      showOwned: true
    };
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

  async componentDidMount() {
    this.fetchResources(`/profiles/${this.props.match.params.id}`, "userInfo");
    this.fetchResources(`/api/frames`, "frames");
  }

  render() {
    const { userInfo, frames, showOwned } = this.state;
    const { username, likes } = userInfo.data;

    const { isAuthorized, userData, match } = this.props;

    if (userInfo.loading || frames.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <h1>{username}'s profile</h1>
          <h4>
            Total likes: {likes}
            <i className="fa fa-star"></i>
          </h4>
          <button
            className={`btn btn-${showOwned ? "primary" : "secondary"}`}
            onClick={() => this.setState({ showOwned: true })}
          >
            Created setups
          </button>
          {"  "}
          {isAuthorized && userData.id === match.params.id && (
            <button
              className={`btn btn-${showOwned ? "secondary" : "primary"}`}
              onClick={() => this.setState({ showOwned: false })}
            >
              Liked setups
            </button>
          )}
          <hr className="divider" />
          {showOwned ? (
            <SearchList
              key="user"
              mode="user"
              profileId={match.params.id}
              frames={frames.data}
            />
          ) : (
            <SearchList
              key="liked"
              mode="liked"
              profileId={match.params.id}
              frames={frames.data}
            />
          )}
        </div>
      );
    }
  }
}

export default Profile;
