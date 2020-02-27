import React, { Component } from "react";
import { fetchAuth } from "../../utils/fetchAuth";
import Loading from "../utils/Loading.js";
import SearchList from "./SearchList";

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
    await this.fetchFrames();
  }

  render() {
    if (this.state.frames.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <SearchList frames={this.state.frames.data} />
        </div>
      );
    }
  }
}

export default Search;
