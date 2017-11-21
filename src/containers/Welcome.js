/* eslint-disable react/prop-types, class-methods-use-this */
import React from 'react';
import { AsyncStorage, View, Image } from 'react-native';

import welcome from '../styles/containers/welcome';

import logo from '../assets/images/logo_radar.png';
import background from '../assets/images/elements_bg.png';


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
			}	else {
				this.changeRoute('Districts');
			}
		} catch (error) {
			// Error retrieving data
		}

		setTimeout(() => {
			this.props.navigation.navigate(this.state.firstRoute);
		}, 3000);
	}

	changeRoute(route) {
		this.setState({ firstRoute: route });
	}

	render() {
		return (
			<View style={welcome.container}>
				<Image
					source={logo}
					style={welcome.logo}
				/>
				<Image
					source={background}
					style={welcome.background}
				/>
			</View>
		);
	}
}

export default Welcome;
