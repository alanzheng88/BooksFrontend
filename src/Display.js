import React, { Component } from "react";

class Display extends Component {

  componentWillReceiveProps(newProp) {
    this.setState({data: newProp.data});
    debugger
  }

  render() {
    return (
      <ul>{this.props.data.map(book => {
              return <li>{book.title}</li> 
          })}</ul>
    );
  }
}

export default Display;
