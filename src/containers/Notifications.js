/* eslint-disable react/prop-types, class-methods-use-this, array-callback-return */
import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	Alert,
	AsyncStorage,
	Button,
} from 'react-native';
import { Notifications as PushNotifications } from 'expo';

import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Notification from '../components/Notification';

import { colors } from '../styles/variables';

import background from '../assets/images/elements_bg.png';
import wink from '../assets/images/wink.png';
import confused from '../assets/images/confused.png';

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.blue,
	},
	menu: {
		backgroundColor: colors.blue,
		flexDirection: 'row',
	},
	menuItem: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	activeMenu: {
		borderBottomWidth: 4,
		borderBottomColor: colors.blue2,
	},
	menuText: {
		color: '#fff',
		fontFamily: 'raleway',
		fontSize: 16,
	},
	containerNotifications: {
		flex: 1,
		paddingLeft: 30,
		paddingRight: 30,
		backgroundColor: '#eeeeee',
	},
	date: {
		fontFamily: 'raleway',
		fontSize: 14,
		color: colors.grayLight,
	},
	wink: {
		flex: 1,
		resizeMode: 'contain',
		width: '40%',
		height: 'auto',
		alignSelf: 'center',
	},
	warning: {
		fontFamily: 'ralewayBold',
		fontSize: 22,
		marginBottom: 10,
		textAlign: 'center',
		color: '#5d5d5d',
	},
	background: {
		flex: 1,
		resizeMode: 'contain',
		width: '100%',
		height: 'auto',
		alignSelf: 'flex-end',
	},
	loading: {
		color: '#fff',
		alignSelf: 'center',
		textAlign: 'center',
		fontFamily: 'raleway',
		fontSize: 18,
	},
});

class Notifications extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoaded: true,
			menu: false,
			notifications: [],
			activeMenu: true,
			apikey: '830ff945-5447-49c7-8a67-26eed2da8c62',
			notificationMessage: {},
			warning: {
				message: 'Você não está seguindo nenhum distrito =(',
				image: confused,
			},
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
		this.getNotifications = this.getNotifications.bind(this);
		this.changeAlerts = this.changeAlerts.bind(this);
	}

	componentDidMount() {
		try {
			AsyncStorage.getItem('apikey')
				.then((res) => {
					if (res != null) {
						this.setState({ apikey: res });
						this.getNotifications('user');
						this.notificationSubscription = PushNotifications.addListener(this.handleNotification);
					}
				})
				.catch(() => {});
		} catch (error) {
			// Error retrieving data
		}
	}

	getNotifications(type) {
		const url = type === 'city' ? 'all' : '';
		fetch(`https://dtupa.eokoe.com/alert/${url}?api_key=${this.state.apikey}`)
			.then(response => response.json())
			.then((data) => {
				const notifications = data.results;
				const isLoaded = true;
				const warning = {};

				if (notifications.length < 1) {
					warning.message = 'Tudo tranquilo, sem alertas nos distritos seguidos =)';
					warning.image = wink;
				}

				this.setState({ warning, notifications, isLoaded });
			})
			.catch(() => {
				this.showError('Ocorreu um erro ao carregar os alertas, tente novamente!');
			});
	}

	handleNotification = (notificationMessage) => {
		this.setState({ notificationMessage });
	};

	showError(msg = 'Campo obrigatório') {
		Alert.alert('Atenção', msg, [{ text: 'OK' }], { cancelable: false });
	}

	toggleMenu() {
		const menu = !this.state.menu;
		this.setState({ menu });
	}

	changeRoute(route) {
		this.props.navigation.navigate(route);
	}

	changeAlerts(type) {
		const activeMenu = !this.state.activeMenu;
		this.setState({ activeMenu });
		this.getNotifications(type);
	}

	preRenderNotifications() {
		if (this.state.notifications) {
			if (this.state.notifications.length > 0) {
				return this.renderAllNotifications();
			}
		}

		return this.renderWarningScreen(this.state.warning);
	}

	renderAllNotifications() {
		return (
			<ScrollView style={style.containerNotifications}>
				{this.state.notificationMessage.origin && (
					<Notification
						key={this.state.notificationMessage.data.id}
						item={this.state.notificationMessage.data}
					/>
				)}
				{this.state.notifications.map(item => <Notification key={item.id} item={item} />)}
			</ScrollView>
		);
	}

	renderWarningScreen(warning) {
		return (
			<View style={[style.container, { backgroundColor: '#eeeeee' }]}>
				<Image source={warning.image} style={style.wink} />
				<Text style={style.warning}>{warning.message}</Text>
				<Image source={background} style={style.background} />
				{this.state.warning.image === confused && (
					<Button
						onPress={() => this.changeRoute('Districts')}
						title="Seguir distritos"
						color={colors.blueDark}
						accessibilityLabel="Seguir distritos"
					/>
				)}
			</View>
		);
	}

	render() {
		if (this.state.isLoaded) {
			return (
				<View style={style.container}>
					<Header pageTitle="Alertas" toggleMenu={this.toggleMenu} />
					<View style={style.menu}>
						<View style={[style.menuItem, this.state.activeMenu ? style.activeMenu : '']}>
							<Text onPress={() => this.changeAlerts('user')} style={style.menuText}>
								Meus Alertas
							</Text>
						</View>
						<View style={[style.menuItem, this.state.activeMenu ? '' : style.activeMenu]}>
							<Text onPress={() => this.changeAlerts('city')} style={style.menuText}>
								Alertas da cidade
							</Text>
						</View>
					</View>
					{this.preRenderNotifications()}
					<Drawer
						menuState={this.state.menu}
						toggleMenu={this.toggleMenu}
						changeRoute={this.changeRoute}
					/>
				</View>
			);
		}
		return (
			<View style={style.container}>
				<Header pageTitle="Alertas" toggleMenu={this.toggleMenu} />
				<View style={[style.container, { alignItems: 'center', justifyContent: 'center' }]}>
					<View>
						<Text style={style.loading}>Carregando...</Text>
					</View>
				</View>
				<Drawer
					menuState={this.state.menu}
					toggleMenu={this.toggleMenu}
					changeRoute={this.changeRoute}
				/>
			</View>
		);
	}
}

export default Notifications;
