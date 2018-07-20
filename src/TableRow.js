import React, { Component } from "react";

class TableRow extends Component {

  render() {
    return (<tr>
              <td>{this.props.title}</td>
              <td>{this.props.author}</td>
            </tr>);
  }
}

export default TableRow;
