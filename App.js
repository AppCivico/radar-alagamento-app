import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { AppLoading, Font } from 'expo';
import { Provider } from 'react-redux';
import { AsyncStorage, StyleSheet, Platform } from 'react-native';

import { store } from './src/store';

import Raleway from './src/assets/fonts/Raleway-Regular.ttf';
import RalewayMedium from './src/assets/fonts/Raleway-Medium.ttf';
import RalewayBold from './src/assets/fonts/Raleway-Bold.ttf';

import Tutorial from './src/containers/Tutorial';
import Districts from './src/containers/Districts';
import Notifications from './src/containers/Notifications';
import Profile from './src/containers/Profile';
import Help from './src/containers/Help';

import { colors } from './src/styles/variables';

const style = StyleSheet.create({
	tabLabel: {
		fontFamily: 'ralewayMedium',
		fontSize: 11,
	},
	tabStyle: {
		backgroundColor: '#ffffff',
	},
	indicator: {
		backgroundColor: colors.blue,
	},
});

const nav = {
	Profile: { screen: Profile },
	Notifications: { screen: Notifications },
	Districts: { screen: Districts },
	Help: { screen: Help },
};

const tabBarOptions = Platform.OS === 'ios' ?
	{
		activeTintColor: colors.blue,
		inactiveTintColor: colors.gray,
		labelStyle: style.tabLabel,
		tabStyle: style.tabStyle,
		// iOS tabBarOptions
		showLabel: true,
	} : {
		activeTintColor: colors.blue,
		inactiveTintColor: colors.gray,
		labelStyle: style.tabLabel,
		style: style.tabStyle,
		indicatorStyle: style.indicator,
		// Android tabBarOptions
		showIcon: true,
		showLabel: true,
		upperCaseLabel: false,
	};

const Navigation = TabNavigator(
	nav,
	{
		initialRouteName: 'Districts',
		tabBarPosition: 'bottom',
		animationEnabled: true,
		tabBarOptions,
		showIcon: true,
	},
);

const TutorialScreen = StackNavigator(
	{
		Tutorial: { screen: Tutorial },
		Tab: { screen: Navigation },
	},
	{
		initialRouteName: 'Tutorial',
		headerMode: 'none',
	},
);

const NavigationRegistered = TabNavigator(
	nav,
	{
		initialRouteName: 'Notifications',
		tabBarPosition: 'bottom',
		animationEnabled: true,
		tabBarOptions: {
			activeTintColor: colors.blue,
			inactiveTintColor: colors.gray,
			labelStyle: style.tabLabel,
			tabStyle: style.tabStyle,
		},
		showIcon: true,
	},
);

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
					this.loadAssetsAsync();
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
					<Navigation />
				</Provider>
			);
		}

		if (this.state.apikey) {
			return (
				<Provider store={store}>
					<NavigationRegistered />
				</Provider>
			);
		}

		return (
			<Provider store={store}>
				<TutorialScreen />
			</Provider>
		);
	}
}

export default App;
