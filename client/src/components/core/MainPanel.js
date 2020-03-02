import React from "react";
import { Link } from "react-router-dom";

const MainPanel = () => {
  return (
    <div className="center">
      <h1>Welcome to Fashionframe</h1>
      <br />
      <br />
      <br />
      <br />
      <Link to={"/fashionframe"} className="btn btn-primary">
        Proceed to app
      </Link>
      <br />
      <br />
      <br />
      <a
        href={
          "https://github.com/FrozenTear7/fashionframe/blob/master/README.md"
        }
        className="btn-sm btn-primary"
      >
        Check to use the API
      </a>
    </div>
  );
};

export default MainPanel;
