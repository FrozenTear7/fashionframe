import React, { Component } from "react";
import Navbar from "./core/Navbar.js";
import Main from "./core/Main.js";
import { fetchAuth } from "../utils/fetchAuth";
import Loading from "./utils/Loading.js";

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
    const { loadingUserData, isAuthorized, userData } = this.state;

    if (loadingUserData) {
      return <Loading />;
    } else {
      return (
        <div>
          <Navbar isAuthorized={isAuthorized} userData={userData} />
          <br />
          <Main isAuthorized={isAuthorized} userData={userData} />
        </div>
      );
    }
  }
}

export default App;
