import React, { Component } from "react";
import { isUsernameValid, isPasswordValid } from "../../../utils/validators.js";
import { fetchAuth } from "../../../utils/fetchAuth";

class SignInLoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loginRedirect: false,
      error: "",
      showValidationMessages: false
    };

    this.formValueOnChange = this.formValueOnChange.bind(this);
    this.formSubmitLogin = this.formSubmitLogin.bind(this);
  }

  formValueOnChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  async formSubmitLogin() {
    const { username, password } = this.state;

    if (isUsernameValid(username) && isPasswordValid(password)) {
      try {
        const res = await fetchAuth(`/auth/local/login`, {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password
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
          {error && (
            <div className="alert alert-danger center" role="alert">
              {error}
            </div>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.formSubmitLogin}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default SignInLoginForm;
