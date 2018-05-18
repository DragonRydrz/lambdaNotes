import React, { Component } from 'react';
import { Modal, View, SafeAreaView, Text } from 'react-native';

import { Button, Card, CardSection } from './common';

export default class DeleteModal extends Component {
  render() {
    const {
      parentViewStyle,
      containerStyle,
      buttonContainerStyles,
      textStyles,
    } = styles;
    return (
      <Modal
        visible={this.props.visible}
        transparent={true}
        onRequestClose={() => {
          this.props.cancel();
        }}
      >
        <SafeAreaView style={parentViewStyle}>
          <View style={containerStyle}>
            <Text style={textStyles}>
              Are you sure you want to delete this note?
            </Text>
            <View style={buttonContainerStyles}>
              <Button onPress={this.props.confirm}>Confirm</Button>
              <Button onPress={this.props.cancel}>Cancel</Button>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = {
  parentViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    width: 275,
    minHeight: 125,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
  },
  buttonContainerStyles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textStyles: {
    marginLeft: 25,
    marginRight: 25,
    fontSize: 16,
    textAlign: 'center',
  },
};
