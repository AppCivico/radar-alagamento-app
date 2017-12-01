import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

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
	zone: {
		backgroundColor: colors.blue,
		borderBottomColor: colors.blue2,
		borderBottomWidth: 2,
		flexDirection: 'row',
		padding: 30,
	},
	districts: {
		padding: 20,
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: colors.blue,
	},
	district: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 10,
	},
	checkbox: {
		width: 25,
		height: 25,
		resizeMode: 'contain',
		marginRight: 10,
	},
	districtName: {
		color: '#fff',
		fontSize: 16,
	},
	zoneIcon: {},
	ZoneTitles: {},
	zoneMap: {
		width: 60,
		height: 60,
		resizeMode: 'contain',
		marginRight: 10,
	},
	zoneName: {
		color: '#fff',
		fontFamily: 'raleway',
		fontSize: 18,
		textAlign: 'left',
	},
	zoneDistricts: {
		color: '#fff',
		fontFamily: 'raleway',
		fontSize: 14,
		textAlign: 'left',
	},
});

class Zone extends React.Component {
	constructor() {
		super();

		this.state = {
			checked: [],
			colors: ['#0f718d', '#10a1ba', '#48ced8', '#93dcdf', '#004e70'],
		};

		this.selectDistrict = this.selectDistrict.bind(this);
		this.setChecks = this.setChecks.bind(this);
	}

	componentWillMount() {
		this.setChecks();
	}

	setChecks() {
		const checked = this.props.districts.map(() => ({
			state: false,
			image: checkbox,
		}));
		this.setState({ checked });
	}

	selectDistrict(item, i) {
		const checked = [...this.state.checked];
		checked[i] = {
			state: !checked[i].state,
			image: checked[i].image === checkbox ? checkboxOn : checkbox,
		};

		this.props.updateSeletedDistricts(item.id, this.state.checked[i].state);
		this.setState({ checked });
	}

	renderDistrict(item, i) {
		return (
			<View style={style.district} key={item.id}>
				<TouchableOpacity onPress={() => this.selectDistrict(item, i)}>
					<Image source={this.state.checked[i].image} style={style.checkbox} />
				</TouchableOpacity>
				<Text style={style.districtName} onPress={() => this.selectDistrict(item, i)}>
					{item.name}
				</Text>
			</View>
		);
	}

	renderImage(zona) {
		switch (zona) {
		case 'Central':
			return <Image source={zonaCental} style={style.zoneMap} />;
		case 'Sul':
			return <Image source={zonaSul} style={style.zoneMap} />;
		case 'Oeste':
			return <Image source={zonaOeste} style={style.zoneMap} />;
		case 'Leste':
			return <Image source={zonaLeste} style={style.zoneMap} />;
		case 'Norte':
			return <Image source={zonaNorte} style={style.zoneMap} />;
		default:
			return <Image source={zonaNorte} style={style.zoneMap} />;
		}
	}

	render() {
		return (
			<View style={style.container}>
				<View style={[style.zone, { backgroundColor: this.state.colors[this.props.id - 1] }]}>
					<View style={style.zoneIcon}>{this.renderImage(this.props.name)}</View>
					<View style={style.zoneTitles}>
						<Text style={style.zoneName}>Zona {this.props.name}</Text>
						<Text style={style.zoneDistricts}>{this.props.districts.length} distritos</Text>
					</View>
				</View>
				<ScrollView
					style={[style.districts, { backgroundColor: this.state.colors[this.props.id - 1] }]}
					alignItems="center"
				>
					{this.props.districts.map((item, i) => this.renderDistrict(item, i))}
				</ScrollView>
			</View>
		);
	}
}

Zone.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	districts: PropTypes.arrayOf(PropTypes.object).isRequired,
	updateSeletedDistricts: PropTypes.func.isRequired,
};

export default Zone;
