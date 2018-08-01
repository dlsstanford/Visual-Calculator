import React, { Component } from "react";
import "../App.css";

const Fields = props => (
  <div>
    <div className="operator">{props.name}</div>
    <input
      type="number"
      className="number-field"
      name="number1"
      onChange={props.handleChange}
    />

    <input
      type="number"
      className="number-field2"
      name="number2"
      onChange={props.handleChange}
    />
    <input
      type="number"
      className="number-field3"
      name="number3"
      onChange={props.handleChange}
    />
  </div>
);

export default Fields;
