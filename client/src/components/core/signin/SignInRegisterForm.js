import React, { Component } from "react";
import {
  isUsernameValid,
  isPasswordValid,
  arePasswordsMatching
} from "../../../utils/validators.js";
import { fetchAuth } from "../../../utils/fetchAuth";
import { Redirect } from "react-router-dom";

class SignInRegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      logoutRedirect: false,
      error: "",
      showValidationMessages: false
    };

    this.formValueOnChange = this.formValueOnChange.bind(this);
    this.formSubmitRegister = this.formSubmitRegister.bind(this);
  }

  formValueOnChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  async formSubmitRegister() {
    const { username, password, password2 } = this.state;

    if (
      isUsernameValid(username) &&
      isPasswordValid(password) &&
      arePasswordsMatching(password, password2)
    ) {
      try {
        const res = await fetchAuth(`/auth/local/register`, {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
            password2: password2
          })
        });

        if (!res.ok) {
          const resJson = await res.json();

          this.setState({
            logoutRedirect: true,
            error: resJson.message
          });
        }
      } catch (error) {
        this.setState({
          error: `Could not sign in`
        });
      }
    } else {
      this.setState({ showValidationMessages: true });
    }
  }

  render() {
    const {
      username,
      password,
      password2,
      logoutRedirect,
      error,
      showValidationMessages
    } = this.state;

    if (logoutRedirect) {
      this.setState({ logoutRedirect: false });
      return <Redirect push to="/fashionframe/" />;
    }

    return (
      <div className="center">
        <form onChange={this.formValueOnChange}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
            />
            {showValidationMessages && !isUsernameValid(username) && (
              <small className="text-error">Username is required</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            {showValidationMessages && !isPasswordValid(password) && (
              <small className="text-error">
                Password is required - at least 6 characters
              </small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm password</label>
            <input
              type="password"
              className="form-control"
              id="password2"
              placeholder="Password"
            />
            {showValidationMessages &&
              !arePasswordsMatching(password, password2) && (
                <small className="text-error">Passwords don't match</small>
              )}
          </div>
          {error && (
            <div className="alert alert-danger center" role="alert">
              {error}
            </div>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.formSubmitRegister}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default SignInRegisterForm;
