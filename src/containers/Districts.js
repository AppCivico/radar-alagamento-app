/* eslint-disable react/prop-types, class-methods-use-this */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from '../components/Header';
import Drawer from '../components/Drawer';

const style = StyleSheet.create({
	container: {
		flex: 1,
	},
});

class Districts extends React.Component {
	constructor() {
		super();
		this.state = {
			menu: false,
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
	}

	toggleMenu() {
		const menu = !this.state.menu;
		this.setState({ menu });
	}

	changeRoute(route) {
		this.props.navigation.navigate(route);
	}

	render() {
		return (
			<View style={style.container}>
				<Header pageTitle="titulo" toggleMenu={this.toggleMenu} />
				<View style={style.container}>
					<Text>Districts</Text>
				</View>
				<Drawer
					userName="Fulana"
					menuState={this.state.menu}
					toggleMenu={this.toggleMenu}
					changeRoute={this.changeRoute}
				/>
			</View>
		);
	}
}

export default Districts;
