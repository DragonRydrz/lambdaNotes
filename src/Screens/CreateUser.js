import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, View, Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import { securityQuestions } from '../host';
import { loading } from '../actions/loading';
import { createUser } from '../actions/createUser';
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner,
} from '../components/common';

class CreateUser extends Component {
  // constructor() {
  //   super();
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
    securityQuestion: '',
    securityResponse: '',
  };
  // }
  render() {
    const { buttonViewStyle, errorTextStyle } = styles;
    return (
      <SafeAreaView>
        <Card>
          <CardSection>
            <Input
              placeholder="username"
              label="Username"
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              placeholder="confirm password"
              label="Confirm"
              value={this.state.confirmPassword}
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword })
              }
            />
          </CardSection>
          <CardSection>
            <View style={{ width: '100%', justifyContent: 'center' }}>
              <ModalSelector
                data={securityQuestions}
                initValue="Tap to Choose a Security Question"
                onChange={option => {
                  console.log(option.label);
                  this.setState({ securityQuestion: option.label });
                }}
              />
            </View>
          </CardSection>
          <CardSection>
            <Input
              placeholder="security response"
              label="Answer"
              value={this.state.securityResponse}
              onChangeText={securityResponse =>
                this.setState({ securityResponse })
              }
            />
          </CardSection>

          {this.state.error ? (
            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          ) : null}
          <CardSection>{this.renderButtons()}</CardSection>
        </Card>
      </SafeAreaView>
    );
  }
  renderButtons = () => {
    if (this.props.isLoading) {
      return <Spinner />;
    }
    return (
      <View style={styles.buttonViewStyle}>
        <Button onPress={this.createUserPressed}>Sign Up</Button>
      </View>
    );
  };
  createUserPressed = () => {
    this.props.loading(true);
    this.setState({ error: '' });
    const { password, confirmPassword } = this.state;

    if (this.state.username.length < 4) {
      this.setState({ error: 'Username must be at least 4 characters.' });
      this.props.loading(false);
    } else if (this.state.password.length < 8) {
      this.setState({ error: 'Password must be at least 8 characters.' });
      this.props.loading(false);
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error: 'Passwords do not match!' });
      this.props.loading(false);
    } else if (this.state.securityQuestion === '') {
      this.setState({ error: 'Please choose a security question.' });
      this.props.loading(false);
    } else if (this.state.securityResponse.length < 4) {
      this.setState({ error: 'Answer must be at least 4 characters.' });
      this.props.loading(false);
    } else if (
      this.state.password === this.state.confirmPassword &&
      this.state.password !== ''
    ) {
      this.passwordsMatch();
    }
  };
  passwordsMatch = () => {
    const user = {
      username: this.state.username,
      password: this.state.password,
      security: {
        securityQuestion: this.state.securityQuestion,
        securityResponse: this.state.securityResponse.toLowerCase(),
      },
    };
    this.setState({ username: '', password: '', confirmPassword: '' });
    this.props.createUser(user, this.props.navigation.navigate);
    this.props.loading(false);
  };
}

const styles = {
  buttonViewStyle: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, { createUser, loading })(CreateUser);
