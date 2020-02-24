import React, { Component } from "react";

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
            href="http://localhost:3001/auth/google"
            role="button"
          >
            Sign in with<span> </span> <i className="fa fa-google-plus"></i>
          </a>
          <br />
          <br />
          <a
            className="btn btn-primary btn-lg"
            href="http://localhost:3001/auth/twitchtv"
            role="button"
          >
            Sign in with<span> </span> <i className="fa fa-twitch"></i>
          </a>
          <br />
          <br />
          <a
            className="btn btn-primary btn-lg"
            href="http://localhost:3001/auth/facebook"
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
