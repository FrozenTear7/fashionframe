import React, { Component } from "react";
import {
  isUsernameValid,
  isPasswordValid,
  arePasswordsMatching
} from "../../../utils/validators.js";
import { fetchAuth } from "../../../utils/fetchAuth";

class SignInRegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      loading: false,
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
      loading,
      error,
      showValidationMessages
    } = this.state;

    return (
      <div className="center">
        <form onChange={this.formValueOnChange}>
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Username"
            />
            {showValidationMessages && !isUsernameValid(username) && (
              <small className="text-error">Username is required</small>
            )}
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
            />
            {showValidationMessages && !isPasswordValid(password) && (
              <small className="text-error">
                Password is required - at least 6 characters
              </small>
            )}
          </div>
          <div class="form-group">
            <label for="password2">Confirm password</label>
            <input
              type="password"
              class="form-control"
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
            class="btn btn-primary"
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
