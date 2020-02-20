import React, { Component } from "react";

class NotFound extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="center-half">
        <div class="jumbotron">
          <h1 class="display-4">Sign in to create own fashion setups</h1>
          <hr class="my-4" />
          <a
            class="btn btn-primary btn-lg"
            href="http://localhost:3001/auth/google"
            role="button"
          >
            Sign in with<span> </span> <i class="fa fa-google-plus"></i>
          </a>
          <br />
          <br />
          <a
            class="btn btn-primary btn-lg"
            href="http://localhost:3001/auth/twitchtv"
            role="button"
          >
            Sign in with<span> </span> <i class="fa fa-twitch"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default NotFound;
