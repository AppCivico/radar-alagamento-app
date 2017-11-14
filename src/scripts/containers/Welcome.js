import React from 'react';
import { View, Image } from 'react-native';

import common from '../../styles/common';
import welcome from '../../styles/containers/welcome';

import logo from '../../images/logo_radar.png';

const Welcome = () => (
	<View style={common.container}>
		<Image
			source={logo}
			style={welcome.image}
			resizeMode="contain"
		/>
	</View>
);

export default Welcome;
