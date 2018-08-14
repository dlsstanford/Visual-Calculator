import React, { Component } from "react";
import "../App.css";

class Fields extends Component {
  render() {
    return this.props.numFields > 1 ? (
      this.props.numFields === 3 ? 
      <div>
        <div className="operator">{this.props.name}</div>
        <span className="number-name1">Number 1</span>
        <input
          type="number"
          className="number-field"
          name="number1"
          onChange={this.props.handleChange}
        />
        <span className="number-name2">Number 2</span>
        <input
          type="number"
          className="number-field2"
          name="number2"
          onChange={this.props.handleChange}
        />
        <span className="number-name3">Number 3</span>
        <input
          type="number"
          className="number-field3"
          name="number3"
          onChange={this.props.handleChange}
        />
      </div>
     : 
      <div>
        <div className="operator">{this.props.name}</div>
        <span className="number-name4">Number 1</span>
        <input
          type="number"
          className="number-field4"
          name="number1"
          onChange={this.props.handleChange}
        />
        <span className="number-name5">Number 2</span>
        <input
          type="number"
          className="number-field5"
          name="number2"
          onChange={this.props.handleChange}
        />
      </div>
    ) : 
    <div className="operator">{this.props.name}</div>
  }
}

export default Fields;
