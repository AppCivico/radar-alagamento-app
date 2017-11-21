/* eslint-disable react/prop-types, class-methods-use-this */
import React from 'react';
import { View, Text } from 'react-native';

import districts from '../styles/containers/districts';


class Districts extends React.Component {
	render() {
		return (
			<View style={districts.container}>
				<Text>Districts</Text>
			</View>
		);
	}
}

export default Districts;
