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
// import { Notifications as PushNotifications } from 'expo';

import Header from '../components/Header';
import Drawer from '../components/Drawer';

import { colors } from '../styles/variables';

import attention from '../assets/images/icon-attention.png';
import alert from '../assets/images/icon-alert.png';
import overflow from '../assets/images/icon-overflow.png';
import emergency from '../assets/images/icon-emergency.png';
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
		fontSize: 18,
	},
	containerNotifications: {
		flex: 1,
		paddingLeft: 30,
		paddingRight: 30,
	},
	notification: {
		marginTop: 30,
	},
	card: {
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: colors.grayLight,
		marginTop: 1,
	},
	cardIcon: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
	},
	cardIconImage: {
		width: 40,
		height: 40,
		resizeMode: 'contain',
	},
	cardText: {
		flex: 5,
		paddingTop: 25,
		paddingLeft: 15,
		paddingBottom: 25,
		paddingRight: 15,
		justifyContent: 'flex-start',
	},
	cardDescription: {
		fontFamily: 'ralewayBold',
		fontSize: 18,
		color: colors.gray,
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
			colors: {
				attention: '#f6dc35',
				alert: '#f1a225',
				overflow: '#f6dc35',
				emergency: '#f54f4f',
			},
			activeMenu: true,
			apikey: '',
			// notificationMessage: {},
			districts: [],
			warning: {
				message: 'Tudo tranquilo, sem alertas nos distritos seguidos =)',
				image: wink,
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
					console.log('pegando apikey em notification');
					console.log('apikey', res);
					if (res != null) {
						this.setState({ apikey: res });
						// this.getNotifications('user');
						/* this.notificationSubscription =
						PushNotifications.addListener(this.handleNotification); */
					}
				})
				.catch(() => {});
		} catch (error) {
			// Error retrieving data
		}
	}

	getNotifications(type) {
		const url = type === 'city' ? 'all' : '';
		console.log('apikey no get notifications', this.state.apikey);
		console.log(
			'url do request',
			`https://dtupa.eokoe.com/alert/${url}?api_key=${this.state.apikey}`,
		);
		fetch(`https://dtupa.eokoe.com/alert/${url}?api_key=${this.state.apikey}`)
			.then(response => response.json())
			.then((data) => {
				const notifications = data.results;
				console.log('notificacoes', notifications);
				const isLoaded = true;
				this.setState({ notifications, isLoaded });
			})
			.catch(() => {
				this.showError('Ocorreu um erro ao carregar os alertas, tente novamente!');
			});
	}

	/* handleNotification = (notificationMessage) => {
		this.setState({ notificationMessage });
	}; */

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

	formatDate(date) {
		if (date) {
			const day = date
				.split(' ')[0]
				.split('-')
				.reverse()
				.join('.');

			const hour = date.split(' ')[1].split(':');

			return `${day} às ${hour[0]}h${hour[1]}`;
		}

		return date;
	}

	preRenderNotifications() {
		if (this.state.notifications) {
			if (this.state.notifications.length > 0) {
				return this.renderAllNotifications();
			}
		}

		if (this.state.districts.length < 1) {
			const warning = {
				message: 'Você não está seguindo nenhum distrito =(',
				image: confused,
			};
			this.setState({ warning });
		}
		return this.renderWarningScreen(this.state.warning);
	}

	renderAllNotifications() {
		return (
			<ScrollView style={style.containerNotifications}>
				{/* this.state.notificationMessage.origin &&
					this.renderNotification(this.state.notificationMessage.data) */}
				{this.state.notifications.map(item => this.renderNotification(item))}
			</ScrollView>
		);
	}

	renderWarningScreen(warning) {
		return (
			<View style={[style.container, { backgroundColor: '#eeeeee' }]}>
				<Image source={warning.image} style={style.wink} />
				<Text style={style.warning}>{warning.message}</Text>
				<Image source={background} style={style.background} />
				{/* !this.state.warning.image === confused && (
					<Button
						onPress={this.changeRoute('Districts')}
						title="Seguir distritos"
						color={colors.blueDark}
						accessibilityLabel="Seguir distritos"
					/>
				) */}
			</View>
		);
	}

	renderImage(level) {
		switch (level) {
		case 'emergency':
			return <Image source={emergency} style={style.cardIconImage} />;
		case 'attention':
			return <Image source={attention} style={style.cardIconImage} />;
		case 'overflow':
			return <Image source={overflow} style={style.cardIconImage} />;
		case 'alert':
			return <Image source={alert} style={style.cardIconImage} />;
		default:
			return <Image source={attention} style={style.cardIconImage} />;
		}
	}

	renderNotification(item) {
		const color = this.state.colors[item.level] ? this.state.colors[item.level] : '#f1a225';
		return (
			<View key={`notification-${item.id}`} style={style.notification}>
				<Text style={style.date}>{this.formatDate(item.created_at)}</Text>
				<View style={style.card}>
					<View style={[style.cardIcon, { backgroundColor: color }]}>
						{this.renderImage(item.level)}
					</View>
					<View style={style.cardText}>
						<Text style={style.cardDescription}>{item.description}</Text>
					</View>
				</View>
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
