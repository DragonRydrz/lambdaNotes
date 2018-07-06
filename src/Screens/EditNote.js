import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Keyboard,
  Dimensions,
  TextInput,
  Button as Button2,
} from 'react-native';
import { Card, CardSection, InputNoLabel, Button } from '../components/common';
import { editNote } from '../actions/editNote';

const { height } = Dimensions.get('window');

class EditNote extends Component {
  state = {
    body: '',
    title: '',
    _id: '',
  };
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <Button2 title={'Submit'} onPress={() => params.addNote()} />
      ),
    };
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
    const { _id, title, body } = this.props.navigation.state.params.note;
    this.setState({ _id, title, body });
    this.props.navigation.setParams({
      addNote: () => {
        this.props.editNote(this.state);
        this.props.navigation.pop();
      },
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ isKeyboardOpen: true });
  };

  _keyboardDidHide = () => {
    this.setState({ isKeyboardOpen: false });
  };

  titleChange(title) {
    this.setState({ title });
  }
  bodyChange(body) {
    this.setState({ body });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <InputNoLabel
            value={this.state.title}
            placeholder="Note Title"
            onChangeText={title => this.titleChange(title)}
            autoCorrect={true}
          />
        </CardSection>
        <CardSection>
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.inputStyle}
            value={this.state.body}
            placeholder="Note Body"
            onChangeText={body => this.bodyChange(body)}
            multiline={true}
            maxHeight={this.state.isKeyboardOpen ? 240 : height - 250}
          />
        </CardSection>
        {/* <CardSection>
          <Button
            onPress={() => {
              this.props.editNote(this.state);
              this.props.navigation.pop();
            }}
          >
            Submit Changes
          </Button>
        </CardSection> */}
      </Card>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 23,
    flex: 5,
  },
};

export default connect(
  null,
  { editNote }
)(EditNote);
