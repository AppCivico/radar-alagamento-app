import React from 'react';
import PropTypes from 'prop-types';
import {
	Animated,
	View,
	Text,
	Image,
	TouchableOpacity,
	AsyncStorage,
	StyleSheet,
} from 'react-native';

import { colors } from '../styles/variables';

// import menu icons
import alerts from '../assets/images/icon-alertas.png';
import districts from '../assets/images/icon-registros.png';
import profile from '../assets/images/icon-perfil.png';
import config from '../assets/images/icon-config.png';

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
		fontSize: 18,
		color: '#fff',
		paddingLeft: 25,
		paddingRight: 25,
		paddingBottom: 25,
	},
	navigator: {
		paddingTop: 25,
		borderTopWidth: 1.5,
		borderTopColor: colors.blue2,
	},
	navigatorItem: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 20,
		paddingLeft: 25,
		paddingRight: 25,
	},
	navigatorItemText: {
		fontFamily: 'raleway',
		color: '#fff',
		marginTop: 2,
	},
	navigatorItemIcon: {
		width: 30,
		height: 23,
		resizeMode: 'contain',
		marginRight: 10,
	},
});

class Drawer extends React.Component {
	constructor() {
		super();

		this.state = {
			animation: new Animated.Value(-500),
			menu: [
				{
					title: 'Alertas',
					icon: alerts,
					path: 'Notifications',
				},
				{
					title: 'Meus distritos',
					icon: districts,
					path: 'Districts',
				},
				{
					title: 'Perfil',
					icon: profile,
					path: 'Profile',
				},
				/* {
					title: 'Configurações',
					icon: config,
					path: 'Config',
				}, */
			],
			userName: '',
		};

		this.animateMenu = this.animateMenu.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	componentWillUpdate(newProps) {
		if (newProps.menuState) {
			this.animateMenu();
		}
	}

	getUsername() {
		try {
			AsyncStorage.getItem('user')
				.then((res) => {
					if (res != null) {
						const user = JSON.parse(res);
						const userName = user.user.name.split(' ')[0];
						this.setState({ userName });
					}
				})
				.catch(() => {});
		} catch (error) {
			// Error retrieving data
		}
	}

	animateMenu(route) {
		const newValue = this.props.menuState ? -250 : 0;

		Animated.timing(this.state.animation, {
			toValue: newValue,
			duration: 250,
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
			<TouchableOpacity
				key={item.path}
				style={style.navigatorItem}
				onPress={() => this.toggleMenu(item.path)}
			>
				<Image source={item.icon} style={style.navigatorItemIcon} />
				<Text style={style.navigatorItemText}>{item.title}</Text>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<Animated.View
				style={[style.container, { transform: [{ translateX: this.state.animation }] }]}
			>
				<Text style={style.userName}>Olá, {this.state.userName}</Text>
				<View style={style.navigator}>
					{this.state.menu.map(item => this.renderMenuItem(item))}
				</View>
			</Animated.View>
		);
	}
}

Drawer.propTypes = {
	toggleMenu: PropTypes.func.isRequired,
	changeRoute: PropTypes.func.isRequired,
	menuState: PropTypes.bool.isRequired,
};

export default Drawer;
