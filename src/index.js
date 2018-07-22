import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import 'bootstrap/dist/css/bootstrap.min.css';

console.log(process.env);

ReactDOM.render(
  <Main />,
  document.getElementById("root")
);
