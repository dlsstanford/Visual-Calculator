import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaMicrophone } from 'react-icons/fa';
import VoiceTable from './table'

class VoiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <button className='voice-info' onClick={this.toggle}><FaMicrophone /> Instructions</button>
        <Modal size="lg" isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle} className='voice-modal'>
          <ModalHeader toggle={this.toggle}>Voice Control Instructions</ModalHeader>
          <ModalBody>
            <VoiceTable />
          </ModalBody>
          <ModalFooter>
            <button className='got-it' onClick={this.toggle}>Got It!</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default VoiceModal;