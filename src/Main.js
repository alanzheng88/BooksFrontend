import React, { Component } from "react";

import Search from "./Search";
import Display from "./Display"

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleSearchData = this.handleSearchData.bind(this);
    this.state = { data: [] }
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
