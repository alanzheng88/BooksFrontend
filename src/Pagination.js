import React, { Component } from 'react';
import axios from 'axios';
import URL from 'url-parse';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      nextUrl: '',
    };

    this.handlePreviousButton = this.handlePreviousButton.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.state.nextUrl !== newProps.nextUrl) {
      this.setState({nextUrl: newProps.nextUrl});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.getInfo();
    }
  }

  handlePreviousButton() {
    if (this.state.page > 1) {
      this.setState((prevState) => {
        return {
          page: prevState.page - 1,
        };
      });
    }
  }

  handleNextButton() {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1,
      };
    });
    this.url = this.state.nextUrl;
  }

  getInfo() {
    console.log(`page is: ${this.state.page}`);
    console.log(`pagination url: ${this.url}`);
    let url = this.url;
    axios.get(url)
        .then(response => {
          let data = response.data;
          this.props.searchDataCallback(data, url);
        })
        .catch(error => {
          console.error(error);
          alert(error)
        });
  }

  render() {
    return (
      <nav>
        <ul className="pagination">

          <li>
            <button 
              className="btn btn-primary"
              onClick={this.handlePreviousButton}>
              Previous
            </button>
          </li>

          <li>
            <button 
              className="btn btn-primary"
              onClick={this.handleNextButton}>
              Next
            </button>
          </li>

        </ul>
      </nav>
    );
  }
}

export default Pagination;