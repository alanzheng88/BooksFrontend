import React, { Component } from "react";
import axios from 'axios';

import Search from "./Search";
import Display from "./Display";
import Pagination from "./Pagination";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleSearchData = this.handleSearchData.bind(this);
    this.limit = 9;
    this.state = {
      bookIds: [0],
      data: [],
    }
  }

  // invoked immediately after component is mounted (inserted into tree)
  // load data from remote endpoint
  componentDidMount() {
    let url = `${API_URL}/books/?` +
              `api_key=${API_KEY}&` +
              `limit=${this.limit}&` +
              `after-id=0`;
    console.log(`main url: ${url}`);
    axios.get(url)
        .then(response => {
          let data = response.data;
          this.handleSearchData(data, url, 'search');
        })
        .catch(error => {
          console.error(error);
        });
  }

  handleSearchData(data, lastUrl, task, lastBookIds=null) {
    let bookIds;
    if (task === 'search') {
      bookIds = [0];
    } else {
      bookIds = lastBookIds || this.state.bookIds;
    }
    let dataEntriesCount = data[data.length-1].id;
    this.setState({
      data,
      lastUrl,
      dataEntriesCount,
      bookIds,
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Books</h1>
        <Search
          limit={this.limit}
          searchDataCallback={this.handleSearchData} />
        <Pagination
          limit={this.limit}
          bookIds={this.state.bookIds}
          lastUrl={this.state.lastUrl}
          dataEntriesCount={this.state.dataEntriesCount}
          searchDataCallback={this.handleSearchData} />
        <Display data={this.state.data} />
      </div>
    );
  }
}

export default Main;
