import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { loading } from '../actions/loading';
import {
  Header,
  Card,
  CardSection,
  Input,
  Button,
  Spinner,
} from '../components/common';

class ForgotPassword extends Component {
  state = {
    response: '',
  };

  render() {
    const question = this.props.navigation.getParam('question').data.question;
    const { inputStyle } = styles;

    return (
      <SafeAreaView>
        <Card>
          <Header headerText={question} />
        </Card>
        <Card>
          <CardSection>
            <TextInput
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Please answer the question"
              autoCorrect={false}
              style={inputStyle}
              value={this.state.response}
              onChangeText={response => this.setState({ response })}
            />
          </CardSection>
          <CardSection>
            {this.props.isLoading ? (
              <Spinner />
            ) : (
              <Button onPress={this.submitPress}>Submit</Button>
            )}
          </CardSection>
        </Card>
      </SafeAreaView>
    );
  }

  submitPress = () => {
    this.props.loading(true);
  };
}
const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 5,
    height: 40,
  },
};

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, { loading })(ForgotPassword);
