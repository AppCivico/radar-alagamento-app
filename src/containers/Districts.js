/* eslint-disable react/prop-types, class-methods-use-this, array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet, ScrollView } from 'react-native';

import { mapDispachToProps, mapStateToProps } from '../store';

import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Zone from '../components/Zone';

import { colors } from '../styles/variables';
import done from '../assets/images/done.png';

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.blue,
	},
	nextPageButton: {
		position: 'absolute',
		top: 30,
		right: 10,
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
	selectedDistricts: {
		color: '#fff',
		fontFamily: 'raleway',
		fontSize: 16,
		textAlign: 'left',
		padding: 20,
	},
});

class Districts extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoaded: false,
			menu: false,
			selectedDistricts: [],
			zones: [],
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
		this.updateSeletedDistricts = this.updateSeletedDistricts.bind(this);
		this.editDistricts = this.editDistricts.bind(this);
	}

	componentWillMount() {
		this.getDistricts();
	}

	getDistricts() {
		fetch('https://dtupa.eokoe.com/zone')
			.then(response => response.json())
			.then((data) => {
				const zones = data.results;
				const isLoaded = !this.state.isLoaded;
				this.setState({ zones, isLoaded });
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

	updateSeletedDistricts(district, action) {
		const selectedDistricts = [...this.state.selectedDistricts];

		if (!action) {
			selectedDistricts.push(district);
		} else {
			const index = selectedDistricts.findIndex(item => item === district);
			selectedDistricts.splice(index, 1);
		}

		this.setState({ selectedDistricts });
	}

	editDistricts() {
		const { user } = this.props;
		user.districts = this.state.selectedDistricts;
		this.props.updateUser(user);
		this.props.navigation.navigate('Profile');
	}

	render() {
		if (this.state.isLoaded) {
			return (
				<View style={style.container}>
					<Header pageTitle="Meus Distritos" toggleMenu={this.toggleMenu} />
					<View style={style.container}>
						<Text style={style.selectedDistricts}>
							{this.state.selectedDistricts.length} distritos selecionados
						</Text>
						<ScrollView style={style.container}>
							{this.state.zones.map(item => (
								<Zone
									key={`zone-${item.id}`}
									name={item.name}
									id={item.id}
									districts={item.districts}
									updateSeletedDistricts={this.updateSeletedDistricts}
								/>
							))}
						</ScrollView>
					</View>
					<TouchableWithoutFeedback onPress={() => this.editDistricts()}>
						<Image source={done} style={style.nextPageButton} />
					</TouchableWithoutFeedback>
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

export default connect(mapStateToProps, mapDispachToProps)(Districts);
