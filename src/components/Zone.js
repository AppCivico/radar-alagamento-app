import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	AsyncStorage,
} from 'react-native';
import axios from 'axios';

import { colors } from '../styles/variables';

import checkbox from '../assets/images/checkbox.png';
import checkboxOn from '../assets/images/checkbox-on.png';
import zonaCental from '../assets/images/zona-central.png';
import zonaSul from '../assets/images/zona-sul.png';
import zonaOeste from '../assets/images/zona-oeste.png';
import zonaLeste from '../assets/images/zona-leste.png';
import zonaNorte from '../assets/images/zona-norte.png';

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	containerZone: {
		flex: 1,
		// ios
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowOffset: {
			height: 2,
			width: 0,
		},
		shadowColor: '#4c4c4c',
		minHeight: 110,
	},
	zone: {
		position: 'relative',
		backgroundColor: colors.blue,
		flex: 1,
		paddingLeft: 30,
		paddingRight: 30,
	},
	zoneHeader: {
		flexDirection: 'row',
		flex: 1,
		overflow: 'hidden',
		alignItems: 'center',
	},
	zoneHeaderOpen: {
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: 15,
		paddingBottom: 15,
	},
	districts: {
		flex: 1,
		paddingBottom: 20,
		paddingRight: 30,
		paddingLeft: 30,
	},
	district: {
		flex: 1,
		marginBottom: 15,
		flexDirection: 'row',
	},
	checkbox: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
		marginRight: 15,
	},
	districtName: {
		color: '#fff',
		fontSize: 20,
		marginTop: 2,
	},
	zoneMap: {
		width: 50,
		height: 50,
		resizeMode: 'contain',
		marginRight: 20,
	},
	zoneMapOpen: {
		width: 60,
		height: 60,
		marginRight: 0,
	},
	zoneName: {
		color: '#fff',
		fontFamily: 'raleway',
		fontSize: 17,
		textAlign: 'left',
		marginTop: 7,
	},
	zoneDistricts: {
		color: '#fff',
		fontFamily: 'raleway',
		fontSize: 12,
		textAlign: 'left',
	},
});

class Zone extends React.Component {
	constructor() {
		super();

		this.state = {
			checked: [],
			colors: ['#93dcdf', '#48ced8', '#10a1ba', '#0f718d', '#004e70'],
			allDistricts: false,
			toggle: false,
		};

		this.selectDistrict = this.selectDistrict.bind(this);
		this.selectAllDistricts = this.selectAllDistricts.bind(this);
		this.setChecks = this.setChecks.bind(this);
		this.toggleDistricts = this.toggleDistricts.bind(this);
		this.changeDistrictState = this.changeDistrictState.bind(this);
	}

	componentDidMount() {
		this.setChecks();
	}

	setChecks() {
		const checked = this.props.districts.map(() => ({
			state: false,
			image: checkbox,
		}));
		this.setState({ checked });
	}

	changeInitial(item, i) {
		const checked = [...this.state.checked];
		checked[i] = {
			state: !checked[i].state,
			image: checked[i].image === checkbox ? checkboxOn : checkbox,
		};

		if (!checked[i].state) {
			const allDistricts = !this.state.allDistricts;
			this.setState({ allDistricts });
		}

		this.setState({ checked });
	}

	selectDistrict(item, i) {
		const checked = [...this.state.checked];
		checked[i] = {
			state: !checked[i].state,
			image: checked[i].image === checkbox ? checkboxOn : checkbox,
		};

		if (!checked[i].state) {
			const allDistricts = !this.state.allDistricts;
			this.setState({ allDistricts });
		}

		if (this.props.registered !== '') {
			const state = checked[i].state ? 'follow' : 'unfollow';
			this.changeDistrictState(item.id, state);
		} else {
			this.props.updateSeletedDistricts(item.id, this.state.checked[i].state);
		}
		this.setState({ checked });
	}

	changeDistrictState(id, state) {
		axios({
			method: 'POST',
			url: `https://dtupa.eokoe.com/district/${id}/${state}?api_key=${this.props.registered}`,
			headers: { 'Content-Type': 'application/json' },
		})
			.then(() => {
				try {
					AsyncStorage.getItem('user')
						.then((res) => {
							if (res != null) {
								const user = JSON.parse(res);
								const { districts } = user;
								if (state === 'unfollow') {
									const index = districts.indexOf(id);
									if (index > -1) {
										districts.splice(index, 1);
									}
								} else {
									districts.push(id);
								}

								user.districts = districts;

								AsyncStorage.setItem('user', JSON.stringify(user))
									.then(() => {
									})
									.catch((err) => { console.log('nao salvou', err); });
							}
						})
						.catch(() => { console.log('no user found'); });
				} catch (error) {
					// Error retrieving data
				}
			})
			.catch(() => {
				this.showError('Ops! Ocorreu um erro ao atualizar o distrito, tente novamente!');
			});
	}

	selectAllDistricts() {
		const allDistricts = !this.state.allDistricts;
		const checked = [...this.state.checked];
		let offSet = 1;

		// eslint-disable-next-line array-callback-return
		checked.map((item, i) => {
			checked[i].state = allDistricts;
			checked[i].image = allDistricts ? checkboxOn : checkbox;
		});

		this.setState({ allDistricts, checked });

		// eslint-disable-next-line array-callback-return
		this.props.districts.map((item) => {
			setTimeout(() => {
				this.props.updateSeletedDistricts(item.id, !allDistricts);
			}, offSet);
			offSet += 1;
		});
	}

	toggleDistricts() {
		const toggle = !this.state.toggle;
		this.setState({ toggle });
	}

	renderDistrict(item, i) {
		if (this.props.selected) {
			const isSelected = this.props.selected.findIndex(district => district === item.id);

			if (isSelected >= 0 && this.state.checked[i].state === false) {
				this.changeInitial(item, i);
			}
		}
		return (
			<View style={style.district} key={item.id}>
				<TouchableOpacity onPress={() => this.selectDistrict(item, i)}>
					{this.state.checked[i] && (
						<Image source={this.state.checked[i].image} style={style.checkbox} />
					)}
				</TouchableOpacity>
				<Text style={style.districtName} onPress={() => this.selectDistrict(item, i)}>
					{item.name}
				</Text>
			</View>
		);
	}

	renderImage(zona) {
		switch (zona) {
		case 'Centro':
			return (
				<Image
					source={zonaCental}
					style={[style.zoneMap, this.state.toggle ? style.zoneMapOpen : '']}
				/>
			);
		case 'Sul':
			return (
				<Image
					source={zonaSul}
					style={[style.zoneMap, this.state.toggle ? style.zoneMapOpen : '']}
				/>
			);
		case 'Oeste':
			return (
				<Image
					source={zonaOeste}
					style={[style.zoneMap, this.state.toggle ? style.zoneMapOpen : '']}
				/>
			);
		case 'Leste':
			return (
				<Image
					source={zonaLeste}
					style={[style.zoneMap, this.state.toggle ? style.zoneMapOpen : '']}
				/>
			);
		case 'Norte':
			return (
				<Image
					source={zonaNorte}
					style={[style.zoneMap, this.state.toggle ? style.zoneMapOpen : '']}
				/>
			);
		default:
			return (
				<Image
					source={zonaNorte}
					style={[style.zoneMap, this.state.toggle ? style.zoneMapOpen : '']}
				/>
			);
		}
	}

	render() {
		const zIndex = parseFloat(this.props.id, 10) === 5 ? 0 : 5 - this.props.id;
		return (
			<View
				style={[
					style.containerZone,
					{
						elevation: zIndex,
						zIndex,
					},
				]}
			>
				<TouchableWithoutFeedback onPress={() => this.toggleDistricts()}>
					<View
						style={[
							style.zone,
							{
								backgroundColor: this.state.colors[this.props.id - 1],
							},
						]}
					>
						<View style={[style.zoneHeader, this.state.toggle ? style.zoneHeaderOpen : '']}>
							<View>{this.renderImage(this.props.name)}</View>
							<View>
								<Text style={style.zoneName}>Zona {this.props.name}</Text>
								{!this.state.toggle && (
									<Text style={style.zoneDistricts}>{this.props.districts.length} distritos</Text>
								)}
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
				{this.state.toggle &&
					<View
						style={[
							style.districts,
							{
								backgroundColor: this.state.colors[this.props.id - 1],
							},
						]}
					>
						{this.props.districts
							.sort((a, b) => {
								if (a.name > b.name) {
									return 1;
								}
								if (a.name < b.name) {
									return -1;
								}
								// a must be equal to b
								return 0;
							})
							.map((item, i) => this.renderDistrict(item, i))}
						<View style={style.district} key={0}>
							<TouchableOpacity onPress={() => this.selectAllDistricts()}>
								{!this.state.allDistricts && <Image source={checkbox} style={style.checkbox} />}
								{this.state.allDistricts && <Image source={checkboxOn} style={style.checkbox} />}
							</TouchableOpacity>
							<Text style={style.districtName} onPress={() => this.selectAllDistricts()}>
								Seguir todos os distritos
							</Text>
						</View>
					</View>
				}
			</View>
		);
	}
}

Zone.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	districts: PropTypes.arrayOf(PropTypes.object).isRequired,
	updateSeletedDistricts: PropTypes.func.isRequired,
	selected: PropTypes.arrayOf(PropTypes.number).isRequired,
	registered: PropTypes.bool.isRequired,
};

export default Zone;
