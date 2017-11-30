import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

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
		flexWrap: 'wrap',
	},
	district: {
		minWidth: '50%',
		flexDirection: 'row',
	},
	checkbox: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
		marginRight: 10,
	},
	districtName: {
		marginTop: 2,
		color: '#fff',
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
		console.log(this.state.checked[i].state);

		const checked = [...this.state.checked];
		checked[i] = {
			state: !checked[i].state,
			image: checked[i].image === checkbox ? checkboxOn : checkbox,
		};

		this.props.updateSeletedDistricts(item, this.state.checked[i].state);
		this.setState({ checked });
	}

	renderDistrict(item, i) {
		return (
			<View style={style.district} key={item.id}>
				<TouchableWithoutFeedback onPress={() => this.selectDistrict(item, i)}>
					<Image source={this.state.checked[i].image} style={style.checkbox} />
				</TouchableWithoutFeedback>
				<Text style={style.districtName}>{item.name}</Text>
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
