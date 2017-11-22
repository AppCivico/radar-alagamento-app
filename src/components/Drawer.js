import React from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Text, StyleSheet } from 'react-native';

import { colors } from '../styles/variables';

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

	animateMenu() {
		const newValue = this.props.menuState ? -500 : 0;

		Animated.timing(this.state.animation, {
			toValue: newValue,
			duration: 500,
		}).start();
	}

	toggleMenu() {
		this.props.toggleMenu();
		this.animateMenu();
	}

	render() {
		return (
			<Animated.View
				style={[style.container, { transform: [{ translateX: this.state.animation }] }]}
			>
				<Text style={style.userName}>Olá, {this.props.userName}</Text>
				<View style={style.navigator}>
					<Text onPress={this.toggleMenu} style={style.navigatorItem}>
						Link 1
					</Text>
				</View>
			</Animated.View>
		);
	}
}

Drawer.propTypes = {
	userName: PropTypes.string.isRequired,
	toggleMenu: PropTypes.func.isRequired,
	menuState: PropTypes.bool.isRequired,
};

export default Drawer;
