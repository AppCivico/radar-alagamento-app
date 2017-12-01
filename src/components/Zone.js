import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';

import { colors } from '../styles/variables';

import checkbox from '../assets/images/checkbox.png';
import checkboxOn from '../assets/images/checkbox-on.png';

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	zone: {
		flex: 1,
		backgroundColor: colors.blue,
		borderColor: 'black',
		borderWidth: 2,
	},
	districts: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		marginBottom: 15,
	},
	district: {
		minWidth: '50%',
		flexDirection: 'row',
	},
	checkbox: {
		width: 15,
		height: 15,
		resizeMode: 'contain',
		marginRight: 10,
	},
	districtName: {
		color: '#fff',
		fontSize: 14,
	},
});

class Zone extends React.Component {
	constructor() {
		super();

		this.state = {
			checked: [],
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
				<TouchableWithoutFeedback onPress={() => this.selectDistrict(item, i)}>
					<Image source={this.state.checked[i].image} style={style.checkbox} />
				</TouchableWithoutFeedback>
				<Text style={style.districtName} onPress={() => this.selectDistrict(item, i)}>
					{item.name}
				</Text>
			</View>
		);
	}

	render() {
		return (
			<View style={style.container}>
				<View style={style.zone}>
					<Text>Zona {this.props.name}</Text>
					<Text>{this.props.districts.length} distritos</Text>
					<View style={style.districts}>
						{this.props.districts.map((item, i) => this.renderDistrict(item, i))}
					</View>
				</View>
			</View>
		);
	}
}

Zone.propTypes = {
	name: PropTypes.string.isRequired,
	districts: PropTypes.arrayOf(PropTypes.object).isRequired,
	updateSeletedDistricts: PropTypes.func.isRequired,
};

export default Zone;
