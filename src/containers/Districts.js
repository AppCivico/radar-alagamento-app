/* eslint-disable react/prop-types, class-methods-use-this, array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableWithoutFeedback,
	Image,
	StyleSheet,
	ScrollView,
	Alert,
	AsyncStorage,
} from 'react-native';

import { mapDispachToProps, mapStateToProps } from '../store';

import Header from '../components/Header';
import Zone from '../components/Zone';

import { colors } from '../styles/variables';
import done from '../assets/images/done.png';
import menuIcon from '../assets/images/icon-registros.png';

const style = StyleSheet.create({
	tabIcon: {
		width: 20,
		height: 20,
	},
	container: {
		flex: 1,
		backgroundColor: colors.blue,
	},
	nextPageButton: {
		position: 'absolute',
		top: 42,
		right: 15,
		width: 20,
		height: 20,
		resizeMode: 'contain',
	},
	selectedDistricts: {
		color: '#fff',
		fontFamily: 'raleway',
		fontSize: 16,
		textAlign: 'left',
	},
	loading: {
		color: '#fff',
		alignSelf: 'center',
		textAlign: 'center',
		fontFamily: 'raleway',
		fontSize: 18,
	},
	shadow: {
		shadowOpacity: 0.4,
		shadowRadius: 1,
		shadowOffset: {
			height: 3,
			width: 0,
		},
		shadowColor: '#4c4c4c',
		zIndex: 6,
		padding: 20,
	},
});

class Districts extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'Distritos',
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
			selectedDistricts: [],
			zones: [],
		};
		this.changeRoute = this.changeRoute.bind(this);
		this.updateSeletedDistricts = this.updateSeletedDistricts.bind(this);
		this.editDistricts = this.editDistricts.bind(this);
	}

	componentDidMount() {
		// check if zones are already loaded
		try {
			AsyncStorage.getItem('zones')
				.then((res) => {
					if (res != null) {
						const zones = JSON.parse(res);
						const isLoaded = !this.state.isLoaded;
						this.setState({ zones, isLoaded });
					} else {
						this.getDistricts();
					}
				})
				.catch(() => {});
		} catch (error) {
			// Error retrieving data
		}
	}

	getDistricts() {
		fetch('https://dtupa.eokoe.com/zone')
			.then(response => response.json())
			.then((data) => {
				const zones = data.results.sort((a, b) => a.id - b.id);
				const isLoaded = !this.state.isLoaded;

				AsyncStorage.setItem('zones', JSON.stringify(zones))
					.then(() => {
						this.setState({ zones, isLoaded });
					})
					.catch(() => {});
			})
			.catch(() => this.showError('Ocorreu um ao carregar os distritos, tente novamente'));
	}

	showError(msg = 'Campo obrigatório') {
		Alert.alert('Atenção', msg, [{ text: 'OK' }], { cancelable: false });
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
		if (this.state.selectedDistricts.length < 1) {
			this.showError('Ops! Selecione pelo menos um distrito.');
		} else {
			const { user } = this.props;
			user.districts = this.state.selectedDistricts;
			this.props.updateUser(user);
			this.props.navigation.navigate('Profile');
		}
	}

	render() {
		return (
			<View style={style.container}>
				<Header pageTitle="Meus Distritos" />
				{this.state.isLoaded && (
					<View style={style.container}>
						<View style={style.shadow}>
							<Text style={style.selectedDistricts}>
								{this.state.selectedDistricts.length} distrito(s) selecionado(s)
							</Text>
						</View>
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
				)}
				{!this.state.isLoaded && (
					<View style={[style.container, { alignItems: 'center', justifyContent: 'center' }]}>
						<View>
							<Text style={style.loading}>Carregando...</Text>
						</View>
					</View>
				)}
				<TouchableWithoutFeedback onPress={() => this.editDistricts()}>
					<Image source={done} style={style.nextPageButton} />
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispachToProps)(Districts);
