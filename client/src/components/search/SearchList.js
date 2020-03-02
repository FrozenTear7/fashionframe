/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchAuth } from "../../utils/fetchAuth";
import {
  mapToOption,
  mapToOptions,
  mapToOptionsWithNone
} from "../../utils/mapToOptions";
import SearchListItem from "./SearchListItem";
import Loading from "../utils/Loading";

const fetchLimit = 4;
const setupFilters = ["Popular", "New", "Oldest"];

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: setupFilters[0],
      currentFetchPage: 0,
      setupsCount: 0,
      frame: "None",
      setups: {
        loading: true,
        data: [],
        error: ""
      }
    };

    this.fetchSetups = this.fetchSetups.bind(this);
    this.fetchMoreItems = this.fetchMoreItems.bind(this);
  }

  async fetchSetups(index) {
    let queryMode = "";

    if (this.props.mode)
      queryMode += `&mode=${this.props.mode}&profile_id=${this.props.profileId}`;

    try {
      const res = await fetchAuth(
        `/setups?frame=${this.state.frame}&order=${
          this.state.filter
        }&limit=${fetchLimit}&offset=${(index - 1) * fetchLimit}${queryMode}`
      );
      const resJson = await res.json();

      if (res.ok) {
        this.setState({
          currentFetchPage: index,
          setups: {
            ...this.state.setups,
            loading: false,
            error: "",
            data: [...this.state.setups.data, ...resJson.setups]
          },
          setupsCount: resJson.setupsCount
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

  async selectOnChangeFunction(e, resourceName) {
    await this.setState(
      {
        currentFetchPage: 0,
        [resourceName]: e.value,
        setups: {
          ...this.state.setups,
          data: []
        }
      },
      () => this.fetchSetups(1)
    );
  }

  async fetchMoreItems() {
    await this.fetchSetups(this.state.currentFetchPage + 1);
  }

  async componentDidMount() {
    await this.fetchSetups(1);
  }

  render() {
    const { frames } = this.props;
    const { setups, frame, filter, setupsCount } = this.state;

    return (
      <div>
        <div class="d-flex flex-wrap center justify-content-center">
          <div class="px-5 py-2">
            <div>
              <label htmlFor="frameSelect">Filter by frame</label>
              <Select
                id="frameSelect"
                className="select-dropdown-filter"
                value={mapToOption(frame)}
                options={mapToOptionsWithNone(frames)}
                onChange={e => this.selectOnChangeFunction(e, "frame")}
              />
            </div>
          </div>
          <div class="px-5 py-2">
            <div>
              <label htmlFor="filterSelect">Sort by</label>
              <Select
                id="filterSelect"
                className="select-dropdown-filter"
                value={mapToOption(filter)}
                options={mapToOptions(setupFilters)}
                onChange={e => this.selectOnChangeFunction(e, "filter")}
              />
            </div>
          </div>
        </div>
        <br />
        <InfiniteScroll
          dataLength={setups.data.length}
          next={this.fetchMoreItems}
          hasMore={setups.data.length < setupsCount}
          loader={<Loading />}
        >
          {setups.data.map((setup, i) => (
            <SearchListItem setup={setup} key={i} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default SearchList;
