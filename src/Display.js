import React, { Component } from "react";

import TableRow from './TableRow.js';

class Display extends Component {

  componentWillReceiveProps(newProp) {
    this.setState({data: newProp.data});
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(book => {
              return (<TableRow key={book.id} 
                              title={book.title} 
                              author={`${book.author.firstName}
                                      ${book.author.lastName}`} />);
            })}
        </tbody>
      </table>
    );
  }
}

export default Display;
