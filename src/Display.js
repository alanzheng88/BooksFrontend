import React, { Component } from "react";

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
              return (<tr>
                <td>{book.title}</td>
                <td>{book.author}</td>
              </tr>)
            })}
        </tbody>
      </table>
    );
  }
}

export default Display;
