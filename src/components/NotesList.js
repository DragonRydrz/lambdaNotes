import React, { Component } from 'react';
import {
  AsyncStorage,
  FlatList,
  View,
  Text,
  TouchableHighlight,
  Button as Button2,
  SafeAreaView,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Button } from './common/Button';
import { connect } from 'react-redux';
import DeleteModal from './DeleteModal';
import { deleteNote } from '../actions/deleteNote';
import { signOut } from '../actions/signOut';
import { Card, CardSection, Header } from './common';

const width = Dimensions.get('window').width;

class NotesList extends Component {
  state = {
    deleteVisible: false,
    deleteConfirm: null,
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <Button2 title={'Add Note'} onPress={() => params.addNote()} />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      addNote: this.addNote,
    });
  }

  addNote = () => {
    this.props.navigation.navigate('AddNote');
  };

  deleteModal() {
    if (this.state.deleteVisible) {
      return (
        <DeleteModal
          visible={this.state.deleteVisible}
          cancel={() =>
            this.setState({ deleteConfirm: null, deleteVisible: false })
          }
          confirm={() => {
            this.props.deleteNote(this.state.deleteConfirm);
            this.setState({ deleteConfirm: null, deleteVisible: false });
          }}
        />
      );
    }
    return null;
  }

  render() {
    const { titleStyle, bodyStyle } = styles;
    return (
      <SafeAreaView>
        {this.deleteModal()}
        <Header headerText={this.props.username} />
        <FlatList
          style={{ height: '87%' }}
          data={this.props.notes}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Card>
              <CardSection>
                <Text style={titleStyle}>{item.title.toUpperCase()}</Text>
              </CardSection>
              <CardSection>
                <Text style={bodyStyle}>{item.body}</Text>
              </CardSection>
              <CardSection>
                <Button
                  onPress={() =>
                    this.props.navigation.navigate('NoteEdit', { note: item })
                  }
                >
                  Edit
                </Button>
                <Button
                  onPress={() => {
                    this.setState({
                      deleteConfirm: item._id,
                      deleteVisible: true,
                    });
                  }}
                >
                  Delete
                </Button>
              </CardSection>
            </Card>
          )}
        />
      </SafeAreaView>
    );
  }
  componentWillUnmount() {
    this.props.signOut();
  }
}

const styles = {
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bodyStyle: { fontSize: 16 },
  modalContainerStyle: {
    borderColor: 'black',
    // flex: 1,
    // width: width * 0.75,
    // justifyContent: 'center',
    alignItems: 'center',
  },
};

const mapStateToProps = state => {
  return {
    notes: state.notes,
    username: state.activeUser.username,
  };
};

export default connect(mapStateToProps, { signOut, deleteNote })(NotesList);
