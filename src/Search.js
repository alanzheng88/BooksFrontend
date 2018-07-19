import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';
const API_KEY = 'a1b2c3d4e5f6';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      query: this.search.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('button was clicked: ' + this.state.query);
    this.getInfo();
  }

  getInfo() {
    axios.get(`${API_URL}/books?api_key=${API_KEY}&title=${this.state.query}&limit=7`)
        .then(response => {
          this.props.searchDataCallback(response.data)
        })
        .catch(error => {
          console.error(error);
        });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Search for ..."
          ref={input => this.search = input}
          onChange={this.handleInputChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Search;
