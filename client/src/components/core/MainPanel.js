import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MainPanel = () => {
  return (
    <div className="center">
      <Helmet>
        <title>Fashionframe - your own Warframe fashion show</title>
        <meta
          name="description"
          content="Share your fashion ideas with other Warframe players"
        />
      </Helmet>
      <h1>Welcome to Fashionframe</h1>
      <br />
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="Logo"
        className="rounded-lg"
      ></img>
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
          "https://github.com/FrozenTear7/fashionframe/blob/master/README.md#server-endpoints"
        }
        className="btn-sm btn-primary"
      >
        Check how to use the API
      </a>
    </div>
  );
};

export default MainPanel;
