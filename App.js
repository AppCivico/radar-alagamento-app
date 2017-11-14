import { StackNavigator } from 'react-navigation';

import Welcome from './src/containers/Welcome';

const App = StackNavigator(
	{
		Welcome: { screen: Welcome },
	},
	{
		initialRouteName: 'Welcome',
		headerMode: 'none',
	},
);

export default App;
