import React, { Component } from 'react';
import axios from 'axios';
import URL from 'url-parse';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookIds: props.bookIds,
      page: 1,
      dataEntriesCount: -1,
    };

    this.handlePreviousButton = this.handlePreviousButton.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.state.lastUrl !== newProps.lastUrl) {
      this.setState({lastUrl: newProps.lastUrl});
    }

    if (this.state.dataEntriesCount 
          !== newProps.dataEntriesCount) {
      this.setState({dataEntriesCount: newProps.dataEntriesCount});
    }

    if (this.state.bookIds.length
          !== newProps.bookIds.length) {
      this.setState({bookIds: newProps.bookIds});
    }

    if (this.state.task !== newProps.task) {
      this.setState({task: newProps.task});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.bookIds !== prevState.bookIds
          && this.state.task === 'pagination') {
      this.getInfo();
    }
  }

  handlePreviousButton() {
    if (this.state.bookIds.length > 1) {
      let prevId = this.state.bookIds[this.state.bookIds.length-2];
      let parsedUrl = new URL(this.state.lastUrl, true);
      parsedUrl.query['after-id'] = prevId;
      let url = parsedUrl.toString(); 
      this.setState((prevState) => {
        return {
          task: 'pagination',
          page: prevState.page - 1,
          bookIds: prevState
                      .bookIds
                      .slice(0, prevState.bookIds.length-1),
          url,
        };
      });
    }
  }

  handleNextButton() {
    let parsedUrl = new URL(this.state.lastUrl, true);
    let nextId = this.state.dataEntriesCount;
    parsedUrl.query['after-id'] = nextId;
    let url = parsedUrl.toString();
    this.setState((prevState) => {
      // console.log(prevState);
      return {
        task: 'pagination',
        page: prevState.page + 1,
        bookIds: prevState.bookIds.concat([nextId]),
        url,
      };
    });
  }

  getInfo() {
    if (!this.state.url) {
      // url property is not set on the first componentAtUpdate
      return;
    }
    // console.log(`page is: ${this.state.page}`);
    // console.log(`pagination url: ${this.state.url}`);
    let url = this.state.url;
    axios.get(url)
        .then(response => {
          let data = response.data;
          this.props.searchDataCallback(
            data, url, 'pagination', this.state.bookIds);
        })
        .catch(error => {
          console.error(error);
          alert(error);
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
