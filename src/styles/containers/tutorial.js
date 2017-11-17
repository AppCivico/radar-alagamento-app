import { StyleSheet } from 'react-native';

const tutorial = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	view: {
		flex: 1,
		paddingTop: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		flex: 1,
		resizeMode: 'contain',
		width: '80%',
		height: 'auto',
	},
	text: {
		flex: 1,
		textAlign: 'center',
		paddingTop: 20,
		color: '#5d5d5d',
	},
});

export default tutorial;
