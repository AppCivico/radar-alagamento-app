/* eslint-disable react/prop-types, class-methods-use-this, array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';

import { mapStateToProps, mapDispatchToProps } from '../store';

import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Zone from '../components/Zone';

import done from '../assets/images/done.png';

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
		const user = {
			districts: this.state.selectedDistricts,
		};
		this.props.navigation.navigate('Tutorial');
	}

	render() {
		const { value, onIncreaseClick } = this.props;
		if (this.state.isLoaded) {
			return (
				<View style={style.container}>
					<Header pageTitle="Meus Distritos" toggleMenu={this.toggleMenu} />
					<View style={style.container}>
						<Text onPress={onIncreaseClick}>clicaaaa {value}</Text>
						<Text>{this.state.selectedDistricts.length} distritos selecionados</Text>
						{this.state.zones.map(item => (
							<Zone
								key={`zone-${item.id}`}
								name={item.name}
								districts={item.districts}
								updateSeletedDistricts={this.updateSeletedDistricts}
							/>
						))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Districts);
