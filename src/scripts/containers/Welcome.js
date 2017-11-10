import React from 'react';
import { View, Image, Text } from 'react-native';

import common from '../../styles/common';
import welcome from '../../styles/containers/welcome';

class Welcome extends React.Component {
	render(){
        return (
            <View style={common.container}>
                <Image 
                	source={require('../../images/logo_radar.png')}
                	style={welcome.image}
                	resizeMode="contain"
                />
            </View>
        );
    }
}

export default Welcome;