import React, { Component } from "react";
import "./App.css";
import Fields from "./components/fields";
import Expressions from "./components/expressions";
import Header from "./components/header";
import annyang from './Annyang'
class App extends Component {
  state = {
    number1: 7,
    number2: 4,
    number3: 5,
    total: 0,
    showFields: false,
    operator: null,
    name: null,
    expression: null,
    random: Math.floor(Math.random() * 10 + 1)
  };

  componentDidMount() {
    annyang.addCommands(this.add, this.subract, this.foo, this.random, this.random)
    annyang.addCallback(this.engineCallback, this.resultCallback)
    annyang.start()
    this.setState({
      voiceStatus: annyang.isSupported() ? 'Supported' : 'Unsupported'
    })
  }
  // 3
  componentWillUnmount() {
    annyang.abort()
  }
  engineCallback = (status) => {
    // Set engine status
  }
  resultCallback = (voiceInput) => {
    // Match voice input with player commands
  }
  // page configuration
  viewFields = () => {
    this.setState({ showFields: true });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // math formulas
  add = () => {
    const { number1, number2, number3 } = this.state;
    this.setState({
      total: parseInt(number1) + parseInt(number2) + parseInt(number3),
      operator: "+"
    });
    this.addBox();
  };

  subtract = () => {
    const { number1, number2, number3 } = this.state;
    this.setState({
      total: parseInt(number1) - parseInt(number2) - parseInt(number3),
      operator: "-"
    });
    this.subtractBox();
  };

  foo = () => {
    const { number1, number2, number3 } = this.state;
    this.setState({
      total: parseInt(number1 * number2) / parseInt(number3),
      operator: "?"
    });
    this.fooBox();
  };

  random = () => {
    this.setState({
      total: Math.floor(Math.random() * 10000 + 100)
    });
  };

  // drag and drop methods
  onDragOver = ev => {
    ev.preventDefault();
  };

  onDragStart = (ev, operation, name) => {
    ev.dataTransfer.setData("operator", operation);
    ev.dataTransfer.setData("name", name);
    this.setState({
      operator: operation,
      name: name
    });
  };

  onDrop = (e, sign, name) => {
    this.viewFields();
    this.selectBox();
    this.setState({
      operator: sign,
      name: name
    });
  };

  //DOM Rendering
  calculate = e => {
    e.preventDefault();
    const { operator } = this.state;
    switch (operator) {
      case "+":
        return this.add();
      case "-":
        return this.subtract();
      case "?":
        return this.foo();
      default:
        return null;
    }
  };

  selectBox = () => {
    switch (this.state.operator) {
      case "+":
        return this.addBox();
      case "-":
        return this.subtractBox();
      case "?":
        return this.fooBox();
      case "O_o":
      this.setState({
        showFields: false
      })
        return this.randomBox();
      default:
        return null;
    }
  };

  addBox = () => {
    const { number1, number2, number3, total } = this.state;
    this.setState({
      expression: `${number1} + ${number2} + ${number3} = ${total}`
    });
  };

  subtractBox = () => {
    const { number1, number2, number3, total } = this.state;
    this.setState({
      expression: `${number1} - ${number2} - ${number3} = ${total}`
    });
  };

  fooBox = () => {
    const { number1, number2, number3, total } = this.state;
    this.setState({
      expression: `(${number1} * ${number2}) / ${number3} = ${total}`
    });
  };

  randomBox = () => {
    this.setState({
      expression: Math.floor(Math.random() * 10000 + 100)
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container-drag">
          <div
            className="droppable"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, this.state.operator, this.state.name)}
          >
            {this.state.showFields ? (<Fields handleChange={this.handleChange.bind(this)} name={this.state.name}/>) : null}
          </div>
          <Expressions expression={this.state.expression} />
          <button className="total-button" onClick={this.calculate.bind(this)}>
            Calculate
          </button>
        </div>

        <button
          className="add-button"
          draggable
          onDrop={this.add.bind(this)}
          onDragStart={e => this.onDragStart(e, "+", "Addition")}
          name="Addition"
        >
          Add
        </button>
        <button
          className="subtract-button"
          draggable
          onDrop={this.subtract.bind(this)}
          onDragStart={e => this.onDragStart(e, "-", "Subtraction")}
          name="Subtraction"
        >
          Subtract
        </button>
        <button
          className="foo-button"
          draggable
          onDrop={this.foo.bind(this)}
          onDragStart={e => this.onDragStart(e, "?", "Algebra")}
          name="Algebra"
        >
          Arithmatic
        </button>
        <button
          className="complicated-button"
          draggable
          onDrop={this.random.bind(this)}
          onDragStart={e => this.onDragStart(e, "O_o", "Random")}
          name="Algebra"
        >
          Random #
        </button>
      </div>
    );
  }
}

export default App;
