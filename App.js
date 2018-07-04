import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { AppLoading, Font } from 'expo';
import { Provider } from 'react-redux';
import { AsyncStorage, StyleSheet, Platform, DeviceEventEmitter } from 'react-native';

import { store } from './src/store';

import Raleway from './src/assets/fonts/Raleway-Regular.ttf';
import RalewayMedium from './src/assets/fonts/Raleway-Medium.ttf';
import RalewayBold from './src/assets/fonts/Raleway-Bold.ttf';

import Tutorial from './src/containers/Tutorial';
import Districts from './src/containers/Districts';
import Notifications from './src/containers/Notifications';
import Profile from './src/containers/Profile';
import Help from './src/containers/Help';
import NewAlert from './src/containers/NewAlert';

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
	NewAlert: { screen: NewAlert },
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
		navigationOptions: {
			tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
				DeviceEventEmitter.emit('TAB_CHANGE', { previousScene, scene });
				jumpToIndex(scene.index);
			},
		},
		tabBarComponent: ({ navigation, ...rest }) => (
			<TabView.TabBarTop
				{...rest}
				navigation={{
					...navigation,
					state: {
						...navigation.state, routes: navigation.state.routes.filter(r => r.name !== 'NewAlert'),
					},
				}}
			/>
		),
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
		navigationOptions: {
			// eslint-disable-next-line
			tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
				// Inject event
				DeviceEventEmitter.emit('SOME_EVENT_NAME', { oi: 'oi' });
				// Keep original behaviour
				jumpToIndex(scene.index);
			},
		},
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
		tabBarComponent: ({ navigation, ...rest }) => (
			<TabView.TabBarTop
				{...rest}
				navigation={{
					...navigation,
					state: {
						...navigation.state, routes: navigation.state.routes.filter(r => r.name !== 'NewAlert'),
					},
				}}
			/>
		),
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
					<NavigationRegistered screenProps={{ navigationEvents: { oi: 'oi' } }} />
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
