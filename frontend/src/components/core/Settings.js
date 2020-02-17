import React, { Component } from "react";
import { fetchAuth } from "../../utils/fetchAuth";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      userData: {
        loading: true,
        data: {
          username: ""
        },
        error: null
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
          error: null,
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
      await fetchAuth("/auth/user", {
        method: "PUT",
        body: JSON.stringify({ userData: this.state.userData.data })
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.userData.loading) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else if (this.state.userData.error) {
      return (
        <div
          className="alert alert-danger"
          role="alert"
          style={{ textAlign: "center" }}
        >
          This is a primary alert—check it out!
        </div>
      );
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
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.handleUserDataSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      );
    }
  }
}

export default Settings;
