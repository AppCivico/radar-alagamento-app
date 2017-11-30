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
		this.updateSeletedDistricts = this.updateSeletedDistricts.bind(this);
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

	updateSeletedDistricts(district, action) {
		console.log(district.name, action);
		const selectedDistricts = [...this.state.selectedDistricts];

		if (!action) {
			selectedDistricts.push(district);
		} else {
			console.log(selectedDistricts);
			const index = selectedDistricts.findIndex(item => item.id === district.id);
			console.log('qual', index);
			// selectedDistricts.splice(index, 1);
		}

		this.setState({ selectedDistricts });
	}

	render() {
		if (this.state.isLoaded) {
			return (
				<View style={style.container}>
					<Header pageTitle="Meus Distritos" toggleMenu={this.toggleMenu} />
					<View style={style.container}>
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

export default Districts;
