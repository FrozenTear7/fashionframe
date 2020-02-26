import React, { Component } from "react";
import {
  isUsernameValid,
  isPasswordValid,
  arePasswordsMatching
} from "../../../utils/validators.js";

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
    this.formSubmitLogin = this.formSubmitLogin.bind(this);
  }

  formValueOnChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  formSubmitLogin(e) {
    const { username, password, password2 } = this.state;

    if (
      isUsernameValid(username) &&
      isPasswordValid(password) &&
      arePasswordsMatching(password, password2)
    ) {
      // Register
    } else {
      this.setState({ showValidationMessages: true });
    }

    e.preventDefault();
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
        <form onSubmit={this.formSubmitLogin} onChange={this.formValueOnChange}>
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
          <button type="submit" class="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default SignInRegisterForm;
