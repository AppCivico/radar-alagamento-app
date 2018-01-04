import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
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
import Config from './src/containers/Config';

const nav = {
	Districts: { screen: Districts },
	Notifications: { screen: Notifications },
	Profile: { screen: Profile },
	Config: { screen: Config },
};

const FirstLaunchNavigation = TabNavigator(
	nav,
	{
		tabBarPosition: 'bottom',
		animationEnabled: true,
		tabBarOptions: {
			activeTintColor: '#e91e63',
		},
		showIcon: true,
	},
);

const FirstLaunchNavigationTutorial = StackNavigator(nav, {
	initialRouteName: 'Tutorial',
	headerMode: 'none',
});

const FirstLaunchNavigationRegistered = StackNavigator(nav, {
	initialRouteName: 'Notifications',
	headerMode: 'none',
});

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			firstLaunch: true,
			apikey: false,
		};
	}

	componentDidMount() {
		this.loadAssetsAsync();

		try {
			AsyncStorage.getItem('alreadyLaunched')
				.then((res) => {
					if (res == null) {
						AsyncStorage.setItem('alreadyLaunched', 'yes');
					} else {
						AsyncStorage.getItem('apikey')
							.then((res2) => {
								if (res2 != null) {
									this.setState({ apikey: true });
								} else {
									this.setState({ firstLaunch: false });
								}
							})
							.catch(() => {});
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

		if (!this.state.firstLaunch) {
			return (
				<Provider store={store}>
					<FirstLaunchNavigation />
				</Provider>
			);
		}

		if (this.state.apikey) {
			return (
				<Provider store={store}>
					<FirstLaunchNavigationRegistered />
				</Provider>
			);
		}

		return (
			<Provider store={store}>
				<FirstLaunchNavigationTutorial />
			</Provider>
		);
	}
}

export default App;
