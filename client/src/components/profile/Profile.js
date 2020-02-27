import React, { Component } from "react";

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Author's profile</h1>
        <br />
        <h4>
          Total likes: 55<i className="fa fa-star"></i>
        </h4>
        <hr className="divider" />
      </div>
    );
  }
}

export default Profile;
