import React, { Component } from "react";

class TableRow extends Component {

  render() {
    return (<tr>
              <td>{this.props.title}</td>
              <td>{this.props.author.first_name} {this.props.author.last_name} ({this.props.author.email})</td>
            </tr>);
  }
}

export default TableRow;
