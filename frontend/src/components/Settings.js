import React, { Component } from "react";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    console.log(this.state.value);

    try {
      const res = await fetch("http://localhost:3001/auth/user", {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ username: this.state.value })
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Change username</label>
          <input
            className="form-control"
            id="username"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default Settings;
