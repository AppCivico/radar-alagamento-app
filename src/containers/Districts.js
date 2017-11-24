/* eslint-disable react/prop-types, class-methods-use-this, array-callback-return */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Zone from '../components/Zone';

const style = StyleSheet.create({
	container: {
		flex: 1,
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
	}

	componentWillMount() {
		this.getDistricts();
	}

	getDistricts() {
		fetch('https://dtupa.eokoe.com/zone?api_key=f17a9b9d-221a-47c0-9628-07b3a0fd1a59')
			.then(response => response.json())
			.then((data) => {
				const zones = data.results;
				const isLoaded = !this.state.isLoaded;
				this.setState({ zones, isLoaded });
			})
			.catch(err => console.alert(err));
	}

	toggleMenu() {
		const menu = !this.state.menu;
		this.setState({ menu });
	}

	changeRoute(route) {
		this.props.navigation.navigate(route);
	}

	render() {
		if (this.state.isLoaded) {
			return (
				<View style={style.container}>
					<Header pageTitle="Meus Distritos" toggleMenu={this.toggleMenu} />
					<View style={style.container}>
						<Text>{this.state.selectedDistricts.length} distritos selecionados</Text>
						{this.state.zones.map(item => (
							<Zone key={`zone-${item.id}`} name={item.name} districts={item.districts} />
						))}
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
		return <Text>Loading</Text>;
	}
}

export default Districts;
