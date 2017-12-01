import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { colors } from '../styles/variables';
import hamburguer from '../assets/images/options.png';

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		paddingTop: 40,
		flexDirection: 'row',
		backgroundColor: colors.blue,
		padding: 15,
	},
	hamburguer: {
		width: 25,
		height: 20,
		resizeMode: 'contain',
		marginTop: 2,
	},
	pageTitle: {
		paddingLeft: 25,
		paddingRight: 15,
	},
	title: {
		color: '#fff',
		fontFamily: 'raleway',
		fontSize: 22,
	},
});

class Header extends React.Component {
	constructor() {
		super();

		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		this.props.toggleMenu();
	}

	render() {
		return (
			<View>
				<View style={style.header}>
					<TouchableOpacity onPress={this.toggleMenu}>
						<Image source={hamburguer} style={style.hamburguer} />
					</TouchableOpacity>
					<View style={style.pageTitle}>
						<Text style={style.title}>{this.props.pageTitle}</Text>
					</View>
				</View>
			</View>
		);
	}
}

Header.propTypes = {
	pageTitle: PropTypes.string.isRequired,
	toggleMenu: PropTypes.func.isRequired,
};

export default Header;
