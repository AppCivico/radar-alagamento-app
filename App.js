import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';

import Welcome from './src/scripts/containers/Welcome';

const App = StackNavigator({
    Welcome: {screen: Welcome},
},
{
    initialRouteName: 'Welcome',
    headerMode: 'none'
});

export default App;