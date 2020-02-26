import React, { Component } from "react";
import SignInLoginForm from "./SignInLoginForm.js";
import SignInRegisterForm from "./SignInRegisterForm.js";

// eslint-disable-next-line no-unused-vars
const serverUrl = "https://fashionframe.herokuapp.com";
// eslint-disable-next-line no-unused-vars
const localUrl = "http://localhost:3001";

class NotFound extends Component {
  constructor() {
    super();
    this.state = {
      loginMode: true
    };
  }

  render() {
    return (
      <div className="center-half">
        <div className="jumbotron">
          <h1 className="display-4">Sign in</h1>
          <br />
          {this.state.loginMode ? <SignInLoginForm /> : <SignInRegisterForm />}
          <br />
          <button
            className="btn-sm btn-primary"
            onClick={() => this.setState({ loginMode: !this.state.loginMode })}
          >
            <small>{this.state.loginMode ? "Register" : "Login"}</small>
          </button>
          <hr className="my-4" />
          <h4>Or sign in using</h4>
          <ul class="list-group list-group-horizontal center">
            <li className="social-media-list-item">
              <a
                className="btn btn-primary btn-lg"
                href={localUrl + "/auth/google"}
                role="button"
              >
                <span> </span> <i className="fa fa-google-plus"></i>
              </a>
            </li>
            <li className="social-media-list-item">
              <a
                className="btn btn-primary btn-lg"
                href={localUrl + "/auth/twitchtv"}
                role="button"
              >
                <span> </span> <i className="fa fa-twitch"></i>
              </a>
            </li>
            <li className="social-media-list-item">
              <a
                className="btn btn-primary btn-lg"
                href={localUrl + "/auth/facebook"}
                role="button"
              >
                <span> </span> <i className="fa fa-facebook"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default NotFound;
