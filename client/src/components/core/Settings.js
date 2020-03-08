import React, { Component } from "react";
import { fetchAuth, fetchAuthPostJson } from "../../utils/fetchAuth";
import Loading from "../utils/Loading";
import { isUsernameValid } from "../../utils/validators.js";

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
      },
      showValidationMessages: false
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
    this.fetchUserData();
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
    if (isUsernameValid(this.state.userData.data.username)) {
      try {
        const res = await fetchAuthPostJson("/auth/user", {
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
            error: "Could not update user data"
          }
        });
      }
    } else {
      this.setState({ showValidationMessages: true });
    }
  }

  render() {
    const { userData, showValidationMessages } = this.state;

    if (userData.loading) {
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
            <div>
              <label htmlFor="username">Change username</label>
              <input
                className="form-control"
                id="username"
                value={userData.data.username}
                onChange={this.handleUsernameChange}
              />
              {showValidationMessages &&
                !isUsernameValid(userData.data.username) && (
                  <small className="text-error">
                    Username is required, max length: 50
                  </small>
                )}
            </div>
            {userData.error && (
              <div className="alert alert-danger" role="alert">
                {userData.error}
              </div>
            )}
            <br />
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
