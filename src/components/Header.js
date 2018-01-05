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
		paddingLeft: 5,
		paddingRight: 15,
	},
	title: {
		color: '#fff',
		fontFamily: 'raleway',
		fontSize: 21,
	},
});

class Header extends React.Component {
	render() {
		return (
			<View>
				<View style={style.header}>
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
};

export default Header;
