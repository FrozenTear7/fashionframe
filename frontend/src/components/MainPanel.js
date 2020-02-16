import React, { Component } from "react";

class MainPanel extends Component {
  // constructor() {
  //   super();
  //   this.state = { userData: {} };
  // }

  // async componentDidMount() {
  //   const res = await fetch("http://localhost:3001/auth/user", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "http://localhost:3000",
  //       "Access-Control-Allow-Credentials": true
  //     }
  //   });
  //   const resJson = await res.json();

  //   localStorage.setItem("userId", resJson.id);
  //   localStorage.setItem("username", resJson.username);

  //   this.setState({ userData: resJson });
  // }

  render() {
    return <div>Main panel</div>;
  }
}

export default MainPanel;
