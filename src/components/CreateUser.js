import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateUser extends Component {
  state = {
    username: '',
    password: '',
  };

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

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>

          <CardSection>{this.renderButtons()}</CardSection>
        </Card>
      </SafeAreaView>
    );
  }
}

export default connect()(CreateUser);
