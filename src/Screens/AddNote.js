import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput, Button as Button2 } from 'react-native';
import { Card, CardSection, InputNoLabel, Button } from '../components/common';
import { newNote } from '../actions/newNote';

class EditNote extends Component {
  state = {
    body: '',
    title: '',
  };
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: <Button2 title={'Add'} onPress={() => params.addNote()} />,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      addNote: () => {
        this.props.newNote(this.state);
        console.log(this.props.navigation);
        this.props.navigation.pop();
      },
    });
  }

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
          />
        </CardSection>
        <CardSection>
          <TextInput
            style={styles.inputStyle}
            value={this.state.body}
            placeholder="Note Body"
            onChangeText={body => this.bodyChange(body)}
            multiline={true}
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

export default connect(null, { newNote })(EditNote);
