import React, { Component } from "react";
import "../App.css";
import { Jumbotron, Button } from 'reactstrap';

class HomePage extends Component {
  render() {
    return (
        <div className='start-container'>
          <jumbotron>
            <h1 className="display-3">TI-Drag n' Speak</h1>
            <p className="lead">The calculator that responds to your voice!</p>

            <p>To begin, click on the voice instructions, or drag one of the four operator buttons into the purple square to make different math equations appear on the screen. Use the number fields to create all kinds of crazy equations!</p>
            <p className="lead">
              <button className='start-button' onClick={this.props.showCalculator}>Math Time!</button>
            </p>
          </jumbotron>
        </div>
      );
    };
  }

export default HomePage;
