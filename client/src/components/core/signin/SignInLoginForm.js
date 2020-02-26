import React, { Component } from "react";
import { isUsernameValid, isPasswordValid } from "../../../utils/validators.js";

class SignInLoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    const { username, password } = this.state;

    if (isUsernameValid(username) && isPasswordValid(password)) {
      // Login
    } else {
      this.setState({ showValidationMessages: true });
    }

    e.preventDefault();
  }

  render() {
    const {
      username,
      password,
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
          {error && (
            <div className="alert alert-danger center" role="alert">
              {error}
            </div>
          )}
          <button type="submit" class="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default SignInLoginForm;
