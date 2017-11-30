/* eslint-disable react/prop-types, class-methods-use-this, array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet } from 'react-native';

import { mapStateToProps, mapDispatchToProps } from '../store';

import Header from '../components/Header';
import Drawer from '../components/Drawer';

import attention from '../assets/images/icon-attention.png';
import alert from '../assets/images/icon-alert.png';
import overflow from '../assets/images/icon-overflow.png';
import emergency from '../assets/images/icon-emergency.png';

const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	nextPageButton: {
		position: 'absolute',
		top: 30,
		right: 10,
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
});

class Notifications extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoaded: false,
			menu: false,
			notifications: [],
			icons: [attention, alert, overflow, emergency],
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
		this.getNotifications = this.getNotifications.bind(this);
	}

	componentWillMount() {
		this.getNotifications();
	}

	getNotifications() {
		fetch('https://dtupa.eokoe.com/alert/all?api_key=7322f9c2-5855-42f0-9f31-667c60de76c8')
			.then(response => response.json())
			.then((data) => {
				const notifications = data.results;
				const isLoaded = !this.state.isLoaded;
				this.setState({ notifications, isLoaded });
			})
			.catch(err => console.error(err));
	}

	toggleMenu() {
		const menu = !this.state.menu;
		this.setState({ menu });
	}

	changeRoute(route) {
		this.props.navigation.navigate(route);
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

	renderNotification(item) {
		console.log(item.level, this.state.icons[item.level]);
		return (
			<View key={`notification-${item.id}`}>
				<Text>{this.formatDate(item.created_at)}</Text>
				<View>
					<Image source={this.state.icons[item.level]} />
				</View>
				<View>
					<Text>{item.description}</Text>
				</View>
			</View>
		);
	}

	render() {
		if (this.state.isLoaded) {
			return (
				<View style={style.container}>
					<Header pageTitle="Alertas" toggleMenu={this.toggleMenu} />
					<View style={style.container}>
						{this.state.notifications.map(item => this.renderNotification(item))}
					</View>
					<Drawer
						userName="Fulana"
						menuState={this.state.menu}
						toggleMenu={this.toggleMenu}
						changeRoute={this.changeRoute}
					/>
				</View>
			);
		}
		return (
			<View style={style.container}>
				<Header pageTitle="Meus Distritos" toggleMenu={this.toggleMenu} />
				<View style={style.container}>
					<Text>Carregando</Text>
				</View>
				<Drawer
					userName="Fulana"
					menuState={this.state.menu}
					toggleMenu={this.toggleMenu}
					changeRoute={this.changeRoute}
				/>
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
