import React, { Component } from "react";

import TableRow from './TableRow.js';

class Display extends Component {

  componentWillReceiveProps(newProp) {
    this.setState({data: newProp.data});
  }

  render() {
    return (
      <div className="container">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(book => {
                return (<TableRow key={book.id} 
                                title={book.title} 
                                author={book.author} />);
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Display;
