/* eslint-disable react/prop-types, class-methods-use-this, array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableWithoutFeedback,
	Button,
	StyleSheet,
} from 'react-native';

import { mapStateToProps, mapDispatchToProps } from '../store';

import registerForPushNotificationsAsync from '../registerForPushNotificationsAsync';

import Header from '../components/Header';
import Drawer from '../components/Drawer';

import { colors } from '../styles/variables';

import background from '../assets/images/elements_bg.png';
import iconProfile from '../assets/images/person.png';
import iconEmail from '../assets/images/email.png';
import iconPhone from '../assets/images/call.png';
import edit from '../assets/images/edit.png';

const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 1,
		resizeMode: 'contain',
		width: '100%',
		height: 'auto',
		alignSelf: 'flex-start',
	},
	text: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 30,
		paddingRight: 30,
	},
	textTitle: {
		fontFamily: 'raleway',
		fontSize: 22,
		marginBottom: 10,
		textAlign: 'center',
		color: '#5d5d5d',
	},
	form: {
		flexDirection: 'column',
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 30,
	},
	formItem: {
		flex: 1,
		flexDirection: 'row',
	},
	formIcon: {
		flex: 1,
		alignItems: 'center',
	},
	formInput: {
		flex: 4,
	},
	icon: {
		width: 25,
		height: 25,
		resizeMode: 'contain',
		marginRight: 30,
	},
	input: {
		height: 40,
		paddingBottom: 15,
		fontSize: 18,
		fontFamily: 'raleway',
		color: colors.gray,
	},
	button: {
		fontFamily: 'raleway',
		flex: 1,
		width: 100,
	},
	nextPageButton: {
		position: 'absolute',
		top: 30,
		right: 10,
		width: 20,
		height: 20,
		resizeMode: 'contain',
	},
});

class Profile extends React.Component {
	constructor() {
		super();
		this.state = {
			menu: false,
			register: true,
			name: 'Nome',
			surname: 'Sobrenome',
			email: 'E-mail',
			phone: '(11) 9.9999-8888',
			token: '',
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
		this.createUser = this.createUser.bind(this);
		this.registerUser = this.registerUser.bind(this);
		this.editProfile = this.editProfile.bind(this);
	}

	componentDidMount() {
		registerForPushNotificationsAsync().then((res) => {
			this.setState({ token: res });
		});
	}

	toggleMenu() {
		const menu = !this.state.menu;
		this.setState({ menu });
	}

	changeRoute(route) {
		this.props.navigation.navigate(route);
	}

	createUser() {
		return {
			name: `${this.state.name} ${this.state.surname}`,
			email: this.state.email,
			password: '123segredo$$',
			password_confirmation: '123segredo$$',
			phone_number: this.state.phone,
		};
	}

	registerUser() {
		const { user } = this.props;
		user.token = this.state.token;
		user.user = this.createUser();

		/* axios({
			method: 'POST',
			url: 'https://dtupa.eokoe.com/signup',
			headers: { 'Content-Type': 'application/json' },
			data: this.props.user,
		}).then(
			(response) => {
				console.log(response);
				this.changeRoute('Alerts');
			},
			(err) => {
				console.error(err);
			},
		); */

		this.changeRoute('Notifications');
	}

	editProfile() {
		const { user } = this.props;
		user.user = this.createUser();
	}

	render() {
		return (
			<View style={style.container}>
				{!this.state.register && <Header pageTitle="Perfil" toggleMenu={this.toggleMenu} />}
				<View style={style.container}>
					<Image source={background} style={style.background} />
					{this.state.register && (
						<View style={style.text}>
							<Text style={style.textTitle}>Um breve cadastro para não perder seus alertas!</Text>
						</View>
					)}
					<View style={style.form}>
						<View style={style.formItem}>
							<View style={style.formIcon}>
								<Image source={iconProfile} style={style.icon} />
							</View>
							<View style={style.formInput}>
								<TextInput
									style={style.input}
									onChangeText={name => this.setState({ name })}
									placeholder={this.state.name}
									placeholderTextColor={colors.gray}
								/>
							</View>
						</View>
						<View style={style.formItem}>
							<View style={style.formIcon}>
								<Image source={iconProfile} style={style.icon} />
							</View>
							<View style={style.formInput}>
								<TextInput
									style={style.input}
									onChangeText={surname => this.setState({ surname })}
									placeholder={this.state.surname}
									placeholderTextColor={colors.gray}
								/>
							</View>
						</View>
						<View style={style.formItem}>
							<View style={style.formIcon}>
								<Image source={iconEmail} style={style.icon} />
							</View>
							<View style={style.formInput}>
								<TextInput
									style={style.input}
									onChangeText={email => this.setState({ email })}
									placeholder={this.state.email}
									placeholderTextColor={colors.gray}
								/>
							</View>
						</View>
						<View style={style.formItem}>
							<View style={style.formIcon}>
								<Image source={iconPhone} style={style.icon} />
							</View>
							<View style={style.formInput}>
								<TextInput
									style={style.input}
									onChangeText={phone => this.setState({ phone })}
									placeholder={this.state.phone}
									placeholderTextColor={colors.gray}
								/>
							</View>
						</View>
						{this.state.register && (
							<Button
								onPress={() => this.registerUser()}
								title="Enviar"
								color={colors.blueDark}
								accessibilityLabel="Enviar"
							/>
						)}
					</View>
				</View>
				{!this.state.register && (
					<TouchableWithoutFeedback onPress={() => this.editProfile()}>
						<Image source={edit} style={style.nextPageButton} />
					</TouchableWithoutFeedback>
				)}
				{!this.state.register && (
					<Drawer
						userName="Fulana"
						menuState={this.state.menu}
						toggleMenu={this.toggleMenu}
						changeRoute={this.changeRoute}
					/>
				)}
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
