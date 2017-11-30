import { StyleSheet } from 'react-native';

import { colors } from '../variables';

const tutorial = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	view: {
		position: 'relative',
		flex: 1,
		paddingTop: 50,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		flex: 1,
		resizeMode: 'contain',
		width: '60%',
		height: 'auto',
	},
	text: {
		flex: 1,
		textAlign: 'center',
		paddingTop: 10,
		paddingLeft: 15,
		paddingRight: 15,
		color: '#5d5d5d',
		backgroundColor: 'transparent',
		fontFamily: 'raleway',
	},
	textTitle: {
		fontFamily: 'ralewayBold',
		fontSize: 22,
	},
	textContent: {
		fontSize: 18,
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		flex: 1,
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	footer: {
		position: 'absolute',
		left: 0,
		bottom: 10,
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
	},
	button: {
		flex: 2,
		alignItems: 'center',
	},
	skip: {
		textAlign: 'center',
		fontFamily: 'raleway',
	},
	hamburguer: {
		width: 30,
		height: 23,
		resizeMode: 'contain',
	},
	bullets: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bullet: {
		width: 15,
		height: 15,
		borderRadius: 15 / 2,
		borderWidth: 1,
	},
	selected: {
		borderColor: colors.blue,
	},
	notSelected: {
		borderColor: colors.gray,
	},
});

export default tutorial;
