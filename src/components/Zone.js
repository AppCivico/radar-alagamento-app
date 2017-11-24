import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

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
});

class Zone extends React.Component {
	renderDistrict(item) {
		return <Text key={`district-${item.id}`}>{item.name}</Text>;
	}

	render() {
		return (
			<View style={style.container}>
				<View style={style.zone}>
					<Text>Zona {this.props.name}</Text>
					{this.props.districts.map(item => this.renderDistrict(item))}
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
