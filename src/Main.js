import React, { Component } from "react";
import axios from 'axios';

import Search from "./Search";
import Display from "./Display"

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleSearchData = this.handleSearchData.bind(this);
    this.state = { data: [] }
  }

  // invoked immediately after component is mounted (inserted into tree)
  // load data from remote endpoint
  componentDidMount() {
    axios.get(`${API_URL}/books?api_key=${API_KEY}`)
        .then(response => {
          this.setState({data: response.data});
        })
        .catch(error => {
          console.error(error);
        });
  }

  handleSearchData(searchData) {
    this.setState({data: searchData});
  }

  render() {
    return (
      <div>
        <h1>Books</h1>
        <Search searchDataCallback={this.handleSearchData} />
        <Display data={this.state.data} />
      </div>
    );
  }
}

export default Main;
