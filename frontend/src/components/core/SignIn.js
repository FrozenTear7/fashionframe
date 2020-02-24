import React, { Component } from "react";

// eslint-disable-next-line no-unused-vars
const serverUrl = "https://fashionframe.herokuapp.com";
// eslint-disable-next-line no-unused-vars
const localUrl = "http://localhost:3001";
class NotFound extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="center-half">
        <div className="jumbotron">
          <h1 className="display-4">Sign in to create own fashion setups</h1>
          <hr className="my-4" />
          <a
            className="btn btn-primary btn-lg"
            href={localUrl + "/auth/google"}
            role="button"
          >
            Sign in with<span> </span> <i className="fa fa-google-plus"></i>
          </a>
          <br />
          <br />
          <a
            className="btn btn-primary btn-lg"
            href={localUrl + "/auth/twitchtv"}
            role="button"
          >
            Sign in with<span> </span> <i className="fa fa-twitch"></i>
          </a>
          <br />
          <br />
          <a
            className="btn btn-primary btn-lg"
            href={localUrl + "/auth/twitchtv"}
            role="button"
          >
            Sign in with<span> </span> <i className="fa fa-facebook"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default NotFound;
