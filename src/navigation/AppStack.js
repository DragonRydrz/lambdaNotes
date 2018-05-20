import { createBottomTabNavigator } from 'react-navigation';
import Options from '../Screens/Options';
import NoteStack from './NoteStack';

export default createBottomTabNavigator({
  NoteStack: {
    screen: NoteStack,
    navigationOptions: { title: 'Notes' },
  },
  Options: {
    screen: Options,
    navigationOptions: {
      title: 'Settings',
    },
  },
});
