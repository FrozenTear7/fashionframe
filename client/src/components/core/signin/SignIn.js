import React, { Component } from "react";
import SignInLoginForm from "./SignInLoginForm.js";
import SignInRegisterForm from "./SignInRegisterForm.js";

// eslint-disable-next-line no-unused-vars
const serverUrl = "https://fashionframe.herokuapp.com";
// eslint-disable-next-line no-unused-vars
const localUrl = "http://localhost:3001";
const myUrl = localUrl;

class NotFound extends Component {
  constructor() {
    super();
    this.state = {
      loginMode: true
    };
  }

  render() {
    const { loginMode } = this.state;

    return (
      <div className="center-half">
        <h1 className="display-4">Sign in</h1>
        <br />
        {loginMode ? <SignInLoginForm /> : <SignInRegisterForm />}
        <br />
        <button
          className="btn-sm btn-primary"
          onClick={() => this.setState({ loginMode: !loginMode })}
        >
          <small>{loginMode ? "Register" : "Login"}</small>
        </button>
        <hr className="my-4" />
        <h4>Or sign in using</h4>
        <div className="d-flex flex-wrap center">
          <a
            className="social-media-list-item btn btn-primary btn-lg"
            href={myUrl + "/auth/google"}
            role="button"
          >
            <i className="fa fa-google"></i>
          </a>
          <a
            className="social-media-list-item btn btn-primary btn-lg"
            href={myUrl + "/auth/twitchtv"}
            role="button"
          >
            <i className="fa fa-twitch"></i>
          </a>
          <a
            className="social-media-list-item btn btn-primary btn-lg"
            href={myUrl + "/auth/steam"}
            role="button"
          >
            <i className="fa fa-steam"></i>
          </a>
          <a
            className="social-media-list-item btn btn-primary btn-lg"
            href={myUrl + "/auth/twitter"}
            role="button"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
            className="social-media-list-item btn btn-primary btn-lg"
            href={myUrl + "/auth/github"}
            role="button"
          >
            <i className="fa fa-github"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default NotFound;
