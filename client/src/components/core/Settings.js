import React, { Component } from "react";
import { fetchAuth } from "../../utils/fetchAuth";
import Loading from "../utils/Loading";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      userData: {
        loading: true,
        data: {
          username: ""
        },
        error: ""
      }
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleUserDataSubmit = this.handleUserDataSubmit.bind(this);
  }

  async fetchUserData() {
    try {
      const res = await fetchAuth("/auth/user");
      const resJson = await res.json();

      this.setState({
        userData: {
          ...this.state.userData,
          loading: false,
          error: "",
          data: {
            username: resJson.username
          }
        }
      });
    } catch (error) {
      this.setState({
        userData: {
          ...this.state.userData,
          loading: false,
          error: error.message
        }
      });
    }
  }

  async componentDidMount() {
    await this.fetchUserData();
  }

  handleUsernameChange(event) {
    this.setState({
      userData: {
        ...this.state.userData,
        data: { username: event.target.value }
      }
    });
  }

  async handleUserDataSubmit(event) {
    try {
      const res = await fetchAuth("/auth/user", {
        method: "PUT",
        body: JSON.stringify({ userData: this.state.userData.data })
      });

      if (res.ok) {
        window.location.reload();
      } else {
        const resJson = await res.json();
        this.setState({
          userData: {
            ...this.state.userData,
            error: resJson.message
          }
        });
      }
    } catch (err) {
      this.setState({
        userData: {
          ...this.state.userData,
          error: "Server error"
        }
      });
    }
  }

  render() {
    if (this.state.userData.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <form
            className="center-margin"
            style={{
              maxWidth: "50%"
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Change username</label>
              <input
                className="form-control"
                id="username"
                value={this.state.userData.data.username}
                onChange={this.handleUsernameChange}
              />
            </div>
            {this.state.userData.error && (
              <div className="alert alert-danger" role="alert">
                {this.state.userData.error}
              </div>
            )}
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.handleUserDataSubmit}
            >
              Update
            </button>
          </form>
        </div>
      );
    }
  }
}

export default Settings;
