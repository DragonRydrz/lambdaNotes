import { createStackNavigator } from 'react-navigation';

import NotesList from '../Screens/NotesList';
import EditNote from '../Screens/EditNote';
import AddNote from '../Screens/AddNote/AddNote';

export default createStackNavigator(
  {
    NotesList: {
      screen: NotesList,
      navigationOptions: {
        // title: this.props.username,
      },
    },
    NoteEdit: {
      screen: EditNote,
      navigationOptions: {
        title: 'Notes',
      },
    },
    AddNote: {
      screen: AddNote,
      navigationOptions: {
        title: 'Add New Note',
      },
    },
  },
  {
    initialRouteName: 'NotesList',
  }
);
