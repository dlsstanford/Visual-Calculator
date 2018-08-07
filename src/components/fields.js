import React, { Component } from "react";
import "../App.css";

const Fields = props => (
  <div>
    <div className="operator">{props.name}</div>
    <span className='number-name1'>Number 1</span>
    <input
      type="number"
      className="number-field"
      name="number1"
      onChange={props.handleChange}
    />
<<<<<<< HEAD
    <span className='number-name2'>Number 2</span>
=======
>>>>>>> 606fb917026532d21d0af64f5860e2d67df284c1
    <input
      type="number"
      className="number-field2"
      name="number2"
      onChange={props.handleChange}
    />
    <span className='number-name3'>Number 3</span>
    <input
      type="number"
      className="number-field3"
      name="number3"
      onChange={props.handleChange}
    />
  </div>
);

export default Fields;
