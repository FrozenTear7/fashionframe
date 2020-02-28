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

  async fetchFrames() {
    try {
      const res = await fetchAuth(`/api/frames`);
      const resJson = await res.json();

      if (res.ok) {
        this.setState({
          frames: {
            ...this.state.frames,
            loading: false,
            error: "",
            data: resJson.frames
          }
        });
      } else {
        this.setState({
          frames: {
            ...this.state.frames,
            loading: false,
            error: resJson.message
          }
        });
      }
    } catch (error) {
      this.setState({
        frames: {
          ...this.state.frames,
          loading: false,
          error: `Could not fetch frames`
        }
      });
    }
  }

  async fetchUserInfo() {
    try {
      const res = await fetchAuth(`/profiles/${this.props.match.params.id}`);
      const resJson = await res.json();

      if (res.ok) {
        this.setState({
          userInfo: {
            ...this.state.userInfo,
            loading: false,
            error: "",
            data: resJson.userInfo
          }
        });
      } else {
        this.setState({
          userInfo: {
            ...this.state.userInfo,
            loading: false,
            error: resJson.message
          }
        });
      }
    } catch (error) {
      this.setState({
        userInfo: {
          ...this.state.userInfo,
          loading: false,
          error: `Could not fetch user info`
        }
      });
    }
  }

  async componentDidMount() {
    await this.fetchUserInfo();
    await this.fetchFrames();
  }

  render() {
    const { userInfo, frames, showOwned } = this.state;
    const { username, likes } = userInfo.data;

    const { isAuthorized, userData, match } = this.props;

    if (userInfo.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <h1>{username}'s profile</h1>
          <br />
          <h4>
            Total likes: {likes}
            <i className="fa fa-star"></i>
          </h4>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ showOwned: true })}
          >
            {username}'s setups
          </button>
          {isAuthorized && userData.id === match.params.id && (
            <button
              className="btn btn-primary"
              onClick={() => this.setState({ showOwned: false })}
            >
              {username}'s liked setups
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
