import React, { Component } from "react";
import axios from 'axios';
import URL from 'url-parse';

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
    this.lastIds = [];
    this.state = {
      data: [],
      nextUrl: '',
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
          this.handleSearchData(data, url);
        })
        .catch(error => {
          console.error(error);
        });
  }

  handleSearchData(data, lastUrl) {
    let afterId = data[data.length-1].id;
    let prevUrl = '';
    let hasNewAfterId = this.lastIds.indexOf(afterId) === -1;
    if (hasNewAfterId) {
      this.lastIds.push(afterId);
    }
    let parsedUrl = new URL(lastUrl, true);
    parsedUrl.query['after-id'] = afterId;
    let nextUrl = parsedUrl.toString();
    console.log(`next url: ${nextUrl}`);
    this.setState({
      data,
      prevUrl,
      nextUrl,
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
          nextUrl={this.state.nextUrl}
          searchDataCallback={this.handleSearchData} />
        <Display data={this.state.data} />
      </div>
    );
  }
}

export default Main;
