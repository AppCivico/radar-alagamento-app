import { StyleSheet } from 'react-native';

const districts = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingTop: 15,
	},
	logo: {
		flex: 2,
		width: '80%',
		height: 'auto',
		alignSelf: 'center',
		resizeMode: 'contain',
	},
	background: {
		flex: 1,
		resizeMode: 'contain',
		width: '100%',
		height: 'auto',
		alignSelf: 'flex-end',
	},
});

export default districts;
