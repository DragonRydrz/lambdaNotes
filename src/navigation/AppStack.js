import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Options from '../Screens/Options';
import NoteStack from './NoteStack';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default createBottomTabNavigator(
  {
    NoteStack: {
      screen: NoteStack,
      // navigationOptions: { title: 'Notes' },
    },
    Options: {
      screen: Options,
      // navigationOptions: {
      //   title: 'Settings',
      // },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'NoteStack') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Options') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
