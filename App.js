import { StackNavigator } from 'react-navigation';

import Welcome from './src/containers/Welcome';
import Tutorial from './src/containers/Tutorial';

const App = StackNavigator(
	{
		Welcome: { screen: Welcome },
		Tutorial: { screen: Tutorial },
	},
	{
		initialRouteName: 'Tutorial',
		headerMode: 'none',
	},
);

export default App;
