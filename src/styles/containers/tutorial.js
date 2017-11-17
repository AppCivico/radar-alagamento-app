import { StyleSheet } from 'react-native';

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
		fontFamily: 'roboto',
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
});

export default tutorial;
