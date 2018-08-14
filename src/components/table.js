import React, {Component} from 'react';
import { Table } from 'reactstrap';

class VoiceTable extends Component {
  render() {
    return (
      <Table dark hover className='voice-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Command</th>
            <th>Example</th>
            <th>Outputs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>'Add (Num 1) + (Num 2)'</td>
            <td>'Add 46 plus 27'</td>
            <td>46 + 27 = 73 </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>'Subtract (Num 1) - (Num 2)'</td>
            <td>'88 minus 44'</td>
            <td>88 - 44 = 44</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>'Multiply (Num 1) and (Num 2) by (Num 3)'</td>
            <td>'Multiplies (60 + 9) and divides by 3'</td>
            <td>(60 * 9) / 3 = 180</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>'Randomize'</td>
            <td>Generates a random number</td>
            <td>1017</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
export default VoiceTable