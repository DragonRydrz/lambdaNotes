import React, { Component } from 'react';
import { Modal, SafeAreaView, Text } from 'react-native';
import { Button } from './common';

export default class DeleteModal extends Component {
  render() {
    return (
      <Modal>
        <SafeAreaView>
          <Text>This is the modal!</Text>
        </SafeAreaView>
      </Modal>
    );
  }
}
