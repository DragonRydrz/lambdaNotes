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
// import AddNote from '../Screens/AddNote/AddNote';

import { connect } from 'react-redux';
import DeleteModal from '../components/DeleteModal';
import { deleteNote } from '../actions/deleteNote';
import { signOut } from '../actions/signOut';
import { getNotes } from '../actions/getNotes';
import { loading } from '../actions/loading';
import {
  Card,
  CardSection,
  Header,
  Button,
  InputNoLabel,
} from '../components/common';

const { width, height } = Dimensions.get('window').width;

class NotesList extends Component {
  state = {
    search: '',
    deleteVisible: false,
    deleteConfirm: null,
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <Button2 title={'Add Note'} onPress={() => params.addNote()} />
      ),
      headerLeft: (
        <Button2 title={'Sign Out'} onPress={() => params.signOut()} />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      addNote: this.addNote,
      signOut: this.signOut,
    });
    this.setState({ filteredNotes: this.props.notes });
  }
  signOut = () => {
    this.props.signOut();
    this.props.navigation.navigate('Auth');
  };
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

  filteredNotes = notes => {
    const filteredNotes = notes.filter(
      item =>
        item.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
        item.body.toLowerCase().includes(this.state.search.toLowerCase())
    );
    return filteredNotes;
  };

  render() {
    const { titleStyle, bodyStyle } = styles;
    return (
      <View style={{ flex: 1 }}>
        {this.deleteModal()}
        <View>
          <Card>
            <Header headerText={this.props.username} />
          </Card>
          <Card>
            <CardSection>
              <InputNoLabel
                // value={this.state.title}
                placeholder="Search"
                onChangeText={search => this.setState({ search })}
                autoCorrect={false}
              />
            </CardSection>
          </Card>
        </View>
        <FlatList
          data={this.filteredNotes(this.props.notes)}
          keyExtractor={item => item._id}
          // onRefresh={() => {
          //   this.props.loading(true);
          //   this.props.getNotes();
          // }}
          // refreshing={this.props.isLoading}
          renderItem={({ item }) => (
            <Card>
              {console.log(this.props.isLoading)}
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
      </View>
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
    isLoading: state.isLoading,
  };
};

export default connect(
  mapStateToProps,
  { signOut, deleteNote, getNotes, loading }
)(NotesList);
