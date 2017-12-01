/* eslint-disable react/prop-types, class-methods-use-this */
import React from 'react';
import { AsyncStorage, View, Image, StyleSheet } from 'react-native';

import logo from '../assets/images/logo_radar.png';
import background from '../assets/images/elements_bg.png';

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingTop: 15,
	},
	logo: {
		flex: 2,
		width: '80%',
		height: 'auto',
		alignSelf: 'center',
		resizeMode: 'contain',
	},
	background: {
		flex: 1,
		resizeMode: 'contain',
		width: '100%',
		height: 'auto',
		alignSelf: 'flex-end',
	},
});

class Welcome extends React.Component {
	constructor() {
		super();
		this.state = {
			firstRoute: 'Tutorial',
		};

		this.changeRoute = this.changeRoute.bind(this);
	}

	componentDidMount() {
		try {
			const value = AsyncStorage.getItem('alreadyLaunched');
			if (value == null) {
				AsyncStorage.setItem('alreadyLaunched', true);
				this.changeRoute('Tutorial');
			} else {
				this.changeRoute('Tutorial');
			}
		} catch (error) {
			// Error retrieving data
		}

		setTimeout(() => {
			this.props.navigation.navigate(this.state.firstRoute);
		}, 2500); // change to 3000 once in production
	}

	changeRoute(route) {
		this.setState({ firstRoute: route });
	}

	render() {
		return (
			<View style={style.container}>
				<Image source={logo} style={style.logo} />
				<Image source={background} style={style.background} />
			</View>
		);
	}
}

export default Welcome;
