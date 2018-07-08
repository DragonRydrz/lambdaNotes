import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputScrollView from 'react-native-input-scroll-view';
import {
  Platform,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  TextInput,
  Button as Button2,
  Dimensions,
} from 'react-native';
import {
  Card,
  CardSection,
  InputNoLabel,
  Button,
} from '../../components/common';
import { newNote } from '../../actions/newNote';

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
    // this.scroll.props.scrollToEnd({ animated: true });
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
      <View style={{ flex: 1 }}>
        <View>
          <Card>
            <CardSection>
              {/* <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                style={styles.inputStyle}
                value={this.state.title}
                placeholder="Note Title"
                autoCorrect={true}
                onChangeText={title => this.titleChange(title)}
              /> */}
              <InputNoLabel
                underlineColorAndroid="rgba(0,0,0,0)"
                style={styles.inputStyle}
                value={this.state.title}
                placeholder="Note Title"
                onChangeText={title => this.titleChange(title)}
                autoCorrect={true}
              />
            </CardSection>
          </Card>
        </View>
        {/* <FlatList
          data={[0]}
          keyExtractor={() => 'listKey'}
          renderItem={() => ( */}
        <KeyboardAvoidingView style={{ flex: 1 }} enabled={true}>
          <Card>
            <CardSection>
              {/* <InputScrollView
              keyboardOffset={100}
              multilineInputStyle={{ flex: 1 }}
            > */}
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                style={styles.inputStyle}
                value={this.state.body}
                placeholder="Note Body"
                onChangeText={body => this.bodyChange(body)}
                multiline={true}
                // onContentSizeChange={this._onContentSizeChange}
                // onContentSizeChange={() =>
                //   this.scroll.props.scrollToFocusedInput()
                // }
                // numberOfLines={7}
                // height={240}
                // maxHeight={
                //   this.state.isKeyboardOpen ? height * 0.3 : height - 250
                // }
              />
              {/* </InputScrollView> */}
            </CardSection>
          </Card>
        </KeyboardAvoidingView>
        {/* )}
        /> */}
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    height: null,
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 23,
    width: '100%',
    flex: 1,
  },
};

export default connect(
  null,
  { newNote }
)(EditNote);
