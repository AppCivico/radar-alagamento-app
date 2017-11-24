import React from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Text, StyleSheet } from 'react-native';

import { colors } from '../styles/variables';

const menu = [
	'Tutorial',
	'Welcome',
];

const style = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		width: '80%',
		paddingTop: 50,
		paddingBottom: 50,
		backgroundColor: colors.blue,
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
	},
	userName: {
		fontFamily: 'ralewayBold',
		color: '#fff',
		paddingLeft: 25,
		paddingRight: 25,
		paddingBottom: 25,
		borderBottomColor: colors.blue2,
		borderBottomWidth: 2,
	},
	navigator: {
		paddingLeft: 25,
		paddingRight: 25,
		paddingTop: 25,
	},
	navigatorItem: {
		fontFamily: 'raleway',
		color: '#fff',
	},
});

class Drawer extends React.Component {
	constructor() {
		super();

		this.state = {
			animation: new Animated.Value(-500),
		};

		this.animateMenu = this.animateMenu.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	componentWillUpdate(newProps) {
		if (newProps.menuState) {
			this.animateMenu();
		}
	}

	animateMenu(route) {
		const newValue = this.props.menuState ? -500 : 0;

		Animated.timing(this.state.animation, {
			toValue: newValue,
			duration: 500,
		}).start(() => {
			if (!this.props.menuState) {
				this.props.changeRoute(route);
			}
		});
	}

	toggleMenu(route) {
		this.props.toggleMenu();
		this.animateMenu(route);
	}

	renderMenuItem(item) {
		return (
			<Text key={item} onPress={() => this.toggleMenu(item)} style={style.navigatorItem}>
				{item}
			</Text>
		);
	}

	render() {
		return (
			<Animated.View
				style={[style.container, { transform: [{ translateX: this.state.animation }] }]}
			>
				<Text style={style.userName}>Olá, {this.props.userName}</Text>
				<View style={style.navigator}>
					{menu.map(item => this.renderMenuItem(item))}
				</View>
			</Animated.View>
		);
	}
}

Drawer.propTypes = {
	userName: PropTypes.string.isRequired,
	toggleMenu: PropTypes.func.isRequired,
	changeRoute: PropTypes.func.isRequired,
	menuState: PropTypes.bool.isRequired,
};

export default Drawer;
