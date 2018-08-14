import React, { Component } from "react";
import "./App.css";
import Fields from "./components/fields";
import Expressions from "./components/expressions";
import Header from "./components/header";
import annyang from './Annyang';
import HomePage from './components/homepage';
import VoiceModal from './components/modal'

class App extends Component {
  state = {
    number1: 1,
    number2: 2,
    number3: 3,
    total: 0,
    showFields: false,
    calculator: false,
    operator: null,
    name: null,
    expression: null,
    random: Math.floor(Math.random() * 10 + 1),
    numFields: 0,
  };

  componentDidMount() {
    annyang.addCommands(this.voiceAdd, this.voiceSubtract, this.voiceFoo, this.randomBox)
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
    console.log(voiceInput[0])
  }
  // page configuration
  viewFields = () => {
    this.setState({ showFields: true });
  };

  showCalculator = () => {
    this.setState({ calculator: true });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // math formulas
  add = (number1, number2) => {
    number1 = this.state.number1;
    number2 = this.state.number2;
    this.setState({
      total: parseInt(number1) + parseInt(number2),
      operator: "+",
      numFields: 2
    })
    this.addBox();
  };
  voiceAdd = (number1, number2) => {
    this.setState({
      showFields: true,
      operator: '+',
      number1: number1,
      number2: number2,
      name: 'Addition'
    })
    this.add();
  };

  subtract = (number1, number2) => {
    number1 = this.state.number1;
    number2 = this.state.number2;
    this.setState({
      total: parseInt(number1) - parseInt(number2),
      operator: "-",
      numFields: 2
    });
    this.subtractBox();
  };

  voiceSubtract = (number1, number2) => {
    this.setState({
      showFields: true,
      operator: '-',
      number1: number1,
      number2: number2,
      name: 'Subtraction',
    })
    this.subtract();
  };

  foo = (number1, number2, number3) => {
    number1 = this.state.number1;
    number2 = this.state.number2;
    number3 = this.state.number3;
    this.setState({
      total: parseInt(number1 * number2) / parseInt(number3),
      operator: "?",
      numFields: 3
    });
    this.fooBox();
  };

  voiceFoo = (number1, number2, number3) => {
    this.setState({
      showFields: true,
      operator: '?',
      number1: number1,
      number2: number2,
      number3: number3,
      name: 'Algebra',
    })
    this.foo();
  };

  random = () => {
    this.setState({
      total: Math.floor(Math.random() * 10000 + 100),
      numFields: 0
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
      this.add();
        return this.add();
      case "-":
      this.subtract();
        return this.subtract();
      case "?":
      this.foo();
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
        return this.randomBox();
      default:
        return null;
    }
  };

  addBox = () => {
    const { number1, number2, total } = this.state;
    this.setState({
      expression: `${number1} + ${number2} = ${total}`,
      numFields: 2
    });
  };

  subtractBox = () => {
    const { number1, number2, total } = this.state;
    this.setState({
      expression: `${number1} - ${number2} = ${total}`,
      numFields: 2
    });
  };

  fooBox = () => {
    const { number1, number2, number3, total } = this.state;
    this.setState({
      expression: `(${number1} * ${number2}) / ${number3} = ${total}`,
      numFields: 3
    });
  };

  randomBox = () => {
    this.setState({
      expression: Math.floor(Math.random() * 10000 + 100),
      name: 'Random',
      numFields: 0
    });
  };

  render() {
    return (
      <div>
        <Header />
        {!this.state.calculator ? <HomePage showCalculator={this.showCalculator.bind(this)}/> :
        <div className='calculator'>
          <div className="container-drag">
          <div
            className="droppable"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, this.state.operator, this.state.name)}
          >
            {this.state.showFields ? (<Fields handleChange={this.handleChange.bind(this)} name={this.state.name} numFields={this.state.numFields}/>) : null}
          </div>
          <Expressions expression={this.state.expression}/>
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
        <VoiceModal size="lg"/>
        </div>
        }
      </div>
        
    );
  }
}

export default App;
