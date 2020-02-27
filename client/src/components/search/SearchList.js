/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Select from "react-select";
import { fetchAuth } from "../../utils/fetchAuth";
import {
  mapToOption,
  mapToOptions,
  mapToOptionsWithNone
} from "../../utils/mapToOptions";
import SearchPagination from "./SearchPagination";
import SearchListItem from "./SearchListItem";

const fetchLimit = 9;
const setupFilters = ["Popular", "New", "Oldest"];

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
      }
    };

    this.frameSelectOnChange = this.frameSelectOnChange.bind(this);
    this.filterSelectOnChange = this.filterSelectOnChange.bind(this);
    this.fetchSetups = this.fetchSetups.bind(this);
  }

  async fetchSetups(index) {
    try {
      const res = await fetchAuth(
        `/setups?frame=${this.state.frame}&order=${
          this.state.filter
        }&limit=${fetchLimit}&offset=${(index - 1) * fetchLimit}`
      );
      const resJson = await res.json();

      if (res.ok) {
        this.setState({
          currentFetchPage: index,
          numberOfPages: Math.ceil(resJson.setupsCount / fetchLimit) || 1,
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

  async filterSelectOnChange(e) {
    await this.setState({ filter: e.value }, () => this.fetchSetups(1));
  }

  async componentDidMount() {
    await this.fetchSetups(1);
  }

  render() {
    const { frames } = this.props;
    const {
      setups,
      frame,
      numberOfPages,
      currentFetchPage,
      filter
    } = this.state;

    return (
      <div className="center">
        <SearchPagination
          currentFetchPage={currentFetchPage}
          numberOfPages={numberOfPages}
          fetchSetups={this.fetchSetups}
        />
        <br />
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="frameSelect">Filter by frame</label>
              <Select
                id="frameSelect"
                value={mapToOption(frame)}
                options={mapToOptionsWithNone(frames)}
                onChange={this.frameSelectOnChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="filterSelect">Sort by</label>
              <Select
                id="filterSelect"
                value={mapToOption(filter)}
                options={mapToOptions(setupFilters)}
                onChange={this.filterSelectOnChange}
              />
            </div>
          </div>
        </div>
        <ul className="list-group">
          {setups.data.map((setup, i) => (
            <SearchListItem setup={setup} key={i} />
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchList;
