/* eslint-disable react/prop-types, class-methods-use-this, array-callback-return */
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../styles/variables';

import attention from '../assets/images/icon-attention.png';
import alert from '../assets/images/icon-alert.png';
import overflow from '../assets/images/icon-overflow.png';
import emergency from '../assets/images/icon-emergency.png';

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.blue,
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
		flex: 4,
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
	cardDados: {
		paddingTop: 20,
	},
	district: {
		fontSize: 12,
		color: colors.gray,
	},
	address: {
		fontSize: 12,
		color: colors.grayLight,
	},
	date: {
		fontFamily: 'raleway',
		fontSize: 14,
		color: colors.grayLight,
	},
});

class Notification extends React.Component {
	constructor() {
		super();
		this.state = {
			colors: {
				attention: '#f6dc35',
				alert: '#f1a225',
				overflow: '#f6dc35',
				emergency: '#f54f4f',
				toggle: false,
			},
		};
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

	toggleCard() {
		const toggle = !this.state.toggle;
		this.setState({ toggle });
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


	render() {
		const { item } = this.props;
		const color = this.state.colors[item.level] ? this.state.colors[item.level] : '#f1a225';
		return (
			<View key={`notification-${item.id}`} style={style.notification}>
				<Text style={style.date}>{this.formatDate(item.created_at)}</Text>
				<TouchableOpacity onPress={() => this.toggleCard()}>
					<View style={style.card}>
						<View style={[style.cardIcon, { backgroundColor: color }]}>
							{this.renderImage(item.level)}
						</View>
						<View style={style.cardText}>
							<Text style={style.cardDescription}>{item.description}</Text>
							<View style={[style.cardDados, { display: this.state.toggle ? 'flex' : 'none' }]}>
								{item.sensor_sample.sensor.districts.map(district => (
									<Text style={style.district} key={district.id}>{district.name}</Text>
								))}
								<Text style={style.address}>{item.sensor_sample.sensor.description}</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Notification;
