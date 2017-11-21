import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AppLoading, Font } from 'expo';

import Raleway from './src/assets/fonts/Raleway-Regular.ttf';
import RalewayMedium from './src/assets/fonts/Raleway-Medium.ttf';
import RalewayBold from './src/assets/fonts/Raleway-Bold.ttf';

import Welcome from './src/containers/Welcome';
import Tutorial from './src/containers/Tutorial';
import Districts from './src/containers/Districts';

const FirstLaunchNavigation = StackNavigator(
	{
		Welcome: { screen: Welcome },
		Tutorial: { screen: Tutorial },
		Districts: { screen: Districts },
	},
	{
		initialRouteName: 'Welcome',
		headerMode: 'none',
	},
);

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
		};
	}

	componentWillMount() {
		this.loadAssetsAsync();
	}

	loadAssetsAsync = async () => {
		await Font.loadAsync({
			raleway: Raleway,
			ralewayMedium: RalewayMedium,
			ralewayBold: RalewayBold,
		});
		this.setState({ loaded: true });
	};

	render() {
		if (!this.state.loaded) {
			return <AppLoading />;
		}

		return <FirstLaunchNavigation />;
	}
}

export default App;
