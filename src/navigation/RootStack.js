import { createSwitchNavigator } from 'react-navigation';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: `Auth`,
  }
);
