import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../styles/variables';

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		paddingTop: 28,
		flexDirection: 'row',
		backgroundColor: colors.blue,
		padding: 15,
	},
	pageTitle: {
		paddingLeft: 15,
		paddingRight: 15,
	},
	title: {
		color: '#fff',
		fontFamily: 'raleway',
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
					<View>
						<Text onPress={this.toggleMenu}>MENU</Text>
					</View>
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
