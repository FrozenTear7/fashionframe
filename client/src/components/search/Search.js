import React, { Component } from "react";
import { fetchAuth } from "../../utils/fetchAuth";
import Loading from "../utils/Loading.js";
import SearchList from "./SearchList";
import { Helmet } from "react-helmet";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      frames: {
        loading: true,
        data: [],
        error: ""
      }
    };
  }

  async fetchFrames() {
    try {
      const res = await fetchAuth(`/api/frames`);
      const resJson = await res.json();

      if (res.ok) {
        this.setState({
          frames: {
            ...this.state.frames,
            loading: false,
            error: "",
            data: resJson.frames
          }
        });
      } else {
        this.setState({
          frames: {
            ...this.state.frames,
            loading: false,
            error: resJson.message
          }
        });
      }
    } catch (error) {
      this.setState({
        frames: {
          ...this.state.frames,
          loading: false,
          error: `Could not fetch frames`
        }
      });
    }
  }

  async componentDidMount() {
    this.fetchFrames();
  }

  render() {
    const { frames } = this.state;

    if (frames.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <Helmet>
            <title>Fashionframe - your own Warframe fashion show</title>
            <meta
              name="description"
              content="Share your fashion ideas with other Warframe players"
            />
          </Helmet>
          <SearchList frames={frames.data} />
        </div>
      );
    }
  }
}

export default Search;
