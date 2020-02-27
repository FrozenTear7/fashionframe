import React, { Component } from "react";
import { fetchAuth } from "../../utils/fetchAuth";
import Loading from "../utils/Loading";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        loading: true,
        data: [],
        error: ""
      }
    };
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
  }

  render() {
    console.log(this.state);

    const { userInfo } = this.state;
    const { username, likes } = userInfo.data;

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
          <hr className="divider" />
        </div>
      );
    }
  }
}

export default Profile;
