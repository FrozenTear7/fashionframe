/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { fetchAuth } from "../../utils/fetchAuth";
import {
  mapToOption,
  mapToOptions,
  mapToOptionsWithNone
} from "../../utils/mapToOptions";
import Loading from "../utils/Loading.js";
import SearchPagination from "./SearchPagination";

const fetchLimit = 9;
const setupFilters = ["Popular", "New"];

class SearchList extends Component {
  constructor() {
    super();
    this.state = {
      filter: setupFilters[0],
      currentFetchPage: 0,
      numberOfPages: 1,
      frame: "None",
      setups: {
        loading: true,
        data: [],
        error: ""
      },
      frames: {
        loading: true,
        data: [],
        error: ""
      }
    };

    this.frameSelectOnChange = this.frameSelectOnChange.bind(this);
    this.fetchSetups = this.fetchSetups.bind(this);
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

  async fetchSetups(index) {
    console.log(this.state.frame);

    try {
      const res = await fetchAuth(
        `/setups?frame=${this.state.frame}&limit=${fetchLimit}&offset=${(index -
          1) *
          fetchLimit}`
      );
      const resJson = await res.json();

      if (res.ok) {
        this.setState({
          currentFetchPage: index,
          numberOfPages: Math.ceil(resJson.setupsCount / fetchLimit),
          setups: {
            ...this.state.setups,
            loading: false,
            error: "",
            data: resJson.setups
          }
        });
      } else {
        this.setState({
          setups: {
            ...this.state.setups,
            loading: false,
            error: resJson.message
          }
        });
      }
    } catch (error) {
      this.setState({
        setups: {
          ...this.state.setups,
          loading: false,
          error: `Could not fetch setups`
        }
      });
    }
  }

  async frameSelectOnChange(e) {
    await this.setState({ frame: e.value }, () => this.fetchSetups(1));
  }

  async componentDidMount() {
    await this.fetchFrames();
    await this.fetchSetups(1);
  }

  render() {
    if (this.state.frames.loading || this.state.setups.loading) {
      return <Loading />;
    } else {
      return (
        <div className="center">
          <SearchPagination
            currentFetchPage={this.state.currentFetchPage}
            numberOfPages={this.state.numberOfPages}
            fetchSetups={this.fetchSetups}
          />
          <br />
          <div className="row">
            <div className="col-3"></div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="frameSelect">Filter by frame</label>
                <Select
                  id="frameSelect"
                  value={mapToOption(this.state.frame)}
                  options={mapToOptionsWithNone(this.state.frames.data)}
                  onChange={this.frameSelectOnChange}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="filterSelect">Sort by</label>
                <Select
                  id="filterSelect"
                  value={mapToOption(this.state.filter)}
                  options={mapToOptions(setupFilters)}
                  onChange={e => this.setState({ filter: e.value })}
                />
              </div>
            </div>
            <div className="col-3"></div>
          </div>
          <ul className="horizontal-list">
            {this.state.setups.data.map((setup, i) => (
              <Link to={`/setups/${setup.id}`} key={i}>
                <li className="search-list-item center">
                  <h3>{setup.name}</h3>
                  <h4>Frame: {setup.frame}</h4>
                  <hr className="divider" />
                  <h5>Author: {setup.username}</h5>
                  <img
                    src="https://vignette.wikia.nocookie.net/warframe/images/c/cf/Chroma.jpg/revision/latest?cb=20151013193410"
                    alt="Thumbnail"
                    className="search-thumbnail"
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default SearchList;
