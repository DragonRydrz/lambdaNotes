import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { AsyncStorage, Text, View, SafeAreaView } from 'react-native';
import {
  Card,
  CardSection,
  Button,
  Input,
  Spinner,
  Header,
} from '../components/common';

import DeleteModal from '../components/DeleteModal';
import NotesList from './NotesList';

import { loading } from '../actions/loading';
import { login } from '../actions/login';
import { createUser } from '../actions/createUser';
import { authorize } from '../actions/authorize';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    loading: false,
    loggedIn: false,
    visible: true,
  };

  componentDidMount() {
    AsyncStorage.getItem('Dragons')
      .then(token => {
        console.log(token, 'in AS.then');
        if (token) {
          this.props.authorize(token);
        }
      })
      .catch(err => console.log(err));
    // console.log(token);
  }

  render() {
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

          {this.state.error ? (
            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          ) : null}

          {this.props.isLoading ? (
            <Spinner />
          ) : (
            <View>
              <CardSection>
                <Button
                  onPress={() => {
                    const user = {
                      username: this.state.username,
                      password: this.state.password,
                    };
                    this.setState({ username: '', password: '' });
                    this.props.loading(true);
                    return this.props.login(
                      user,
                      this.props.navigation.navigate
                    );
                  }}
                >
                  Log In
                </Button>
              </CardSection>
              <CardSection>
                <Button
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPassword')
                  }
                >
                  Forgot Password?
                </Button>
              </CardSection>
            </View>
          )}
          {/* <CardSection>{this.renderButtons()}</CardSection> */}
        </Card>
      </SafeAreaView>
    );
  }
}
const styles = {
  buttonViewStyle: {
    // flexDirection: 'row',
    height: 85,
    flex: 1,
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
    loggedIn: state.loggedIn,
    notes: state.notes,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, {
  login,
  createUser,
  authorize,
  loading,
})(LoginForm);
