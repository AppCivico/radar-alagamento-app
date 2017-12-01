import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AppLoading, Font } from 'expo';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { store } from './src/store';

import Raleway from './src/assets/fonts/Raleway-Regular.ttf';
import RalewayMedium from './src/assets/fonts/Raleway-Medium.ttf';
import RalewayBold from './src/assets/fonts/Raleway-Bold.ttf';

import Tutorial from './src/containers/Tutorial';
import Districts from './src/containers/Districts';
import Notifications from './src/containers/Notifications';
import Profile from './src/containers/Profile';

const FirstLaunchNavigation = StackNavigator(
	{
		Tutorial: { screen: Tutorial },
		Districts: { screen: Districts },
		Notifications: { screen: Notifications },
		Profile: { screen: Profile },
	},
	{
		initialRouteName: 'Districts',
		headerMode: 'none',
	},
);

const FirstLaunchNavigationTutorial = StackNavigator(
	{
		Tutorial: { screen: Tutorial },
		Districts: { screen: Districts },
		Notifications: { screen: Notifications },
		Profile: { screen: Profile },
	},
	{
		initialRouteName: 'Tutorial',
		headerMode: 'none',
	},
);

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			firstLaunch: true,
		};
	}

	componentWillMount() {
		this.loadAssetsAsync();

		const firstLaunch = true;
		try {
			AsyncStorage.getItem('alreadyLaunched')
				.then((res) => {
					const value = res;
					if (value == null) {
						AsyncStorage.setItem('alreadyLaunched', 'yes');
					} else {
						this.state.firstLaunch = false;
					}
				})
				.catch(() => {});
		} catch (error) {
			// Error retrieving data
		}
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

		if (this.state.firstLaunch) {
			return (
				<Provider store={store}>
					<FirstLaunchNavigationTutorial />
				</Provider>
			);
		}

		return (
			<Provider store={store}>
				<FirstLaunchNavigation />
			</Provider>
		);
	}
}

export default App;
