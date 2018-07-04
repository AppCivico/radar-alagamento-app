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
	TouchableOpacity,
	DeviceEventEmitter,
} from 'react-native';
import { Notifications as PushNotifications } from 'expo';

import Header from '../components/Header';
import Notification from '../components/Notification';

import { colors } from '../styles/variables';

import background from '../assets/images/elements_bg.png';
import wink from '../assets/images/wink.png';
import confused from '../assets/images/confused.png';
import menuIcon from '../assets/images/icon-alertas.png';

const style = StyleSheet.create({
	tabIcon: {
		width: 20,
		height: 20,
	},
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
	buttonWrapper: {
		position: 'absolute',
		width: '100%',
		bottom: 20,
		left: 0,
		paddingLeft: 30,
		paddingRight: 30,
	},
	button: {
		backgroundColor: colors.blueDark,
		borderRadius: 5,
		padding: 5,
		width: '100%',
	},
	buttonText: {
		color: '#fff',
		fontFamily: 'raleway',
		fontSize: 16,
		textAlign: 'center',
	},
});

class Notifications extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'Alertas',
		// Note: By default the icon is only shown on iOS. Search the showIcon option below.
		tabBarIcon: ({ tintColor }) => (
			<Image
				source={menuIcon}
				style={[style.tabIcon, { tintColor }]}
			/>
		),
	};

	constructor() {
		super();
		this.state = {
			isLoaded: false,
			notifications: [],
			activeMenu: true,
			apikey: '',
			warning: {
				message: 'Você não está seguindo nenhum distrito =(',
				image: confused,
			},
		};
		this.changeRoute = this.changeRoute.bind(this);
		this.getNotifications = this.getNotifications.bind(this);
		this.changeAlerts = this.changeAlerts.bind(this);
		this.getUser = this.getUser.bind(this);
	}

	componentWillMount() {
		DeviceEventEmitter.addListener('TAB_CHANGE', ({ ...args }) => {
			const { previousScene } = args;
			if (previousScene.routeName === 'Profile') {
				this.getUser();
			}
		});
	}

	componentDidMount() {
		this.getUser();
	}

	componentWillUnmount() {
		this.listeners.map((listeners) => { listeners.remove(); });
	}

	getUser() {
		try {
			AsyncStorage.getItem('apikey')
				.then((res) => {
					if (res != null) {
						this.setState({ apikey: res });
						this.getNotifications('user');
						this.notificationSubscription = PushNotifications.addListener(this.handleNotification);
					} else {
						this.setState({ isLoaded: true });
					}
				})
				.catch(() => {
				});
		} catch (error) {
			// Error retrieving data
		}
	}

	getNotifications(type) {
		const url = type === 'city' ? 'all' : '';
		if (this.state.apikey) {
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
		} else {
			this.showError('Você deve se cadastrar para visualizar os alertas :)');
		}
	}

	handleNotification() {
		this.getNotifications('');
	}

	showError(msg = 'Campo obrigatório') {
		Alert.alert('Atenção', msg, [{ text: 'OK' }], { cancelable: false });
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
			<ScrollView
				style={style.containerNotifications}
				contentContainerStyle={{ paddingBottom: 30 }}
			>
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
					<View style={style.buttonWrapper}>
						<TouchableOpacity style={style.button} onPress={() => this.changeRoute('Districts')}>
							<Text style={style.buttonText}>Seguir distritos</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}

	render() {
		return (
			<View style={style.container}>
				<Header pageTitle="Alertas" />
				{this.state.isLoaded && (
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
				)}
				<View>
					<Text onPress={() => this.changeRoute('NewAlert')}>
						Criar um alerta
					</Text>
				</View>
				{this.state.isLoaded && this.preRenderNotifications()}
				{!this.state.isLoaded && (
					<View style={[style.container, { alignItems: 'center', justifyContent: 'center' }]}>
						<View>
							<Text style={style.loading}>Carregando...</Text>
						</View>
					</View>
				)}
			</View>
		);
	}
}

export default Notifications;
