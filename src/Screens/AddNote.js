import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Keyboard,
  SafeAreaView,
  TextInput,
  Button as Button2,
  Dimensions,
} from 'react-native';
import { Card, CardSection, InputNoLabel, Button } from '../components/common';
import { newNote } from '../actions/newNote';

const { height } = Dimensions.get('window');

class EditNote extends Component {
  state = {
    body: '',
    title: '',
    isKeyboardOpen: false,
  };
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: <Button2 title={'Add'} onPress={() => params.addNote()} />,
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
    this.props.navigation.setParams({
      addNote: () => {
        this.props.newNote(this.state);
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
      <SafeAreaView style={{ flex: 1 }}>
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
              // numberOfLines={7}
              // height={240}
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
      </SafeAreaView>
    );
  }
}

const styles = {
  inputStyle: {
    // height: '60%',
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 23,
    flex: 1,
  },
};

export default connect(
  null,
  { newNote }
)(EditNote);
