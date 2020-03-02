import React, { Component } from "react";
import {
  isUsernameValid,
  isPasswordValid,
  arePasswordsMatching
} from "../../../utils/validators.js";
import { fetchAuthPostJson } from "../../../utils/fetchAuth";

class SignInRegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      loginRedirect: false,
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
        const res = await fetchAuthPostJson(`/auth/local/register`, {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
            password2: password2
          })
        });

        if (res.ok) {
          this.setState({
            loginRedirect: true
          });
        } else {
          const resJson = await res.json();

          this.setState({
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
      loginRedirect,
      error,
      showValidationMessages
    } = this.state;

    if (loginRedirect) {
      window.location.replace("/fashionframe/");
    }

    return (
      <div className="center">
        <form onChange={this.formValueOnChange}>
          <div>
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
          <br />
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <small
              className={`${
                showValidationMessages && !isPasswordValid(password, password2)
                  ? "text-error"
                  : "text-info"
              }`}
            >
              Password needs to be at least 6 characters long
            </small>
          </div>
          <br />
          <div>
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
          <br />
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
