import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, CheckBox } from 'react-native';

import { colors } from '../styles/variables';

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
});

class Zone extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedDistricts: [],
			districts: [],
		};

		this.addDistrict = this.addDistrict.bind(this);
		this.changeDistricts = this.changeDistricts.bind(this);
	}

	componentWillMount() {
		this.changeDistricts();
	}

	changeDistricts() {
		const districts = [...this.props.districts];
		districts.map(item => (item.checked = false));
		this.setState({ districts });
	}

	addDistrict(item) {
		const selectedDistricts = [...this.state.selectedDistricts];
		selectedDistricts.push(item);
		this.setState({ selectedDistricts });
	}

	selectDistrict(item, i) {
		console.log(item.value);
		console.log(this.state.districts[i].checked);
		const district = this.state.districts[i];
		const districts = [...this.state.districts];
		district.checked = !this.state.districts[i].checked;
		console.log(district);
		districts[i] = district;
		this.setState({ districts });
	}

	renderDistrict(item, i) {
		return (
			<View style={style.district} key={item.id}>
				<CheckBox
					title={item.name}
					onValueChange={() => this.selectDistrict(item, i)}
					checked={this.state.districts[i].checked}
					value={this.state.districts[i].checked}
				/>
				<Text>{item.name}</Text>
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
						{this.state.districts.map((item, i) => this.renderDistrict(item, i))}
					</View>
				</View>
			</View>
		);
	}
}

Zone.propTypes = {
	name: PropTypes.string.isRequired,
	districts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Zone;
