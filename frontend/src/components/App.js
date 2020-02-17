import React, { Component } from "react";
import Navbar from "./core/Navbar.js";
import Main from "./core/Main.js";
import { fetchAuth } from "../utils/fetchAuth";

class App extends Component {
  constructor() {
    super();
    this.state = { loadingUserData: true, isAuthorized: false, userData: {} };
  }

  async componentDidMount() {
    try {
      const res = await fetchAuth("/auth/user");
      const resJson = await res.json();

      if (!resJson.error) {
        this.setState({
          userData: resJson,
          isAuthorized: true,
          loadingUserData: false
        });
      } else {
        this.setState({ isAuthorized: false, loadingUserData: false });
      }
    } catch (err) {
      this.setState({ isAuthorized: false, loadingUserData: false });
    }
  }

  render() {
    if (this.state.loadingUserData) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar
            isAuthorized={this.state.isAuthorized}
            userData={this.state.userData}
          />
          <br />
          <Main
            isAuthorized={this.state.isAuthorized}
            userData={this.state.userData}
          />
        </div>
      );
    }
  }
}

export default App;
