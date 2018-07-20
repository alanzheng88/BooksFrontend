import React, { Component } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      query: '',
      selectedFilter: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      query: this.search.value,
      selectedFilter: this.dropdown.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault(); 
    this.getInfo();
  }

  getInfo() {
    axios.get(`${API_URL}/books?api_key=${API_KEY}&${this.state.selectedFilter}=${this.state.query}&limit=7`)
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
          ref={element => this.search = element}
          onChange={this.handleInputChange} />
        <select 
            name="filterOption"
            defaultValue="title"
            ref={element => this.dropdown = element}>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Search;
