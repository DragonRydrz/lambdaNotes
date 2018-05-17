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
import { deleteNote } from '../actions/deleteNote';
import { signOut } from '../actions/signOut';
import { Card, CardSection, Header } from './common';

const width = Dimensions.get('window').width;

class NotesList extends Component {
  state = { modalVisible: false };
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

  // deleteModal() {
  //   console.log(width);
  //   return (
  //     <SafeAreaView>
  //       <Modal
  //         animationType="slide"
  //         transparent={false}
  //         visible={this.state.modalVisible}
  //         onRequestClose={() => {
  //           alert('Modal has been closed.');
  //         }}
  //       >
  //         <View style={styles.modalContainerStyle}>
  //           <View style={{ marginTop: 22 }}>
  //             <View>
  //               <Text>Hello World!</Text>

  //               {/* <TouchableHighlight
  //               onPress={() => {
  //                 this.setState({ modalVisible: !this.state.modalVisible });
  //               }}
  //             > */}
  //               <Button
  //                 onPress={() => {
  //                   this.setState({ modalVisible: !this.state.modalVisible });
  //                 }}
  //               >
  //                 Hide Modal
  //               </Button>
  //               {/* </TouchableHighlight> */}
  //             </View>
  //           </View>
  //         </View>
  //       </Modal>
  //     </SafeAreaView>
  //   );
  // }

  render() {
    console.log(this.props);
    const { titleStyle, bodyStyle } = styles;
    return (
      <SafeAreaView>
        {/* {this.deleteModal()} */}
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
                    // this.setState({ modalVisible: !this.state.modalVisible })
                    this.props.deleteNote(item._id);
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
