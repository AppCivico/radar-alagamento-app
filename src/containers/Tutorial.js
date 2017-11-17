/* eslint-disable react/prop-types, react/sort-comp */
import React from 'react';
import { View, ScrollView, ViewPagerAndroid, Platform, Image, Text } from 'react-native';

import tutorial from '../styles/containers/tutorial';

import imgTutorial1 from '../assets/images/img_tutorial_1.png';
import imgTutorial2 from '../assets/images/img_tutorial_2.png';
import imgTutorial3 from '../assets/images/img_tutorial_3.png';
import bgTutorial2 from '../assets/images/bg_tutorial_2.png';
import bgTutorial3 from '../assets/images/bg_tutorial_3.png';

class Tutorial extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0,
			selectedIndex: 0,
			initialSelectedIndex: 0,
			scrollingTo: null,
			count: 3,
			children: [
				{
					image: imgTutorial1,
					title: 'Tempo real!!!',
					text:
						'Avance para ver os 2 passos simples para receber alertas do seu distrito ou zona de São Paulo. ',
				},
				{
					image: imgTutorial2,
					title: 'Seus distritos',
					text: 'Escolha um ou mais distritos (bairros) ou toda zona para seguir.',
					background: bgTutorial2,
				},
				{
					image: imgTutorial3,
					title: 'Alertas',
					text: 'Faça o breve cadastro e acompanhe alertas sobre seu(s) distrito(s).',
					background: bgTutorial3,
				},
			],
		};
		this.handleHorizontalScroll = this.handleHorizontalScroll.bind(this);
		this.adjustCardSize = this.adjustCardSize.bind(this);
	}

	render() {
		if (Platform.OS === 'ios') {
			return this.renderIOS();
		}
		return this.renderAndroid();
	}

	renderIOS() {
		return (
			<ScrollView
				ref="scrollview" // eslint-disable-line react/no-string-refs
				contentOffset={{
					x: this.state.width * this.state.initialSelectedIndex,
					y: 0,
				}}
				style={tutorial.container}
				horizontal
				pagingEnabled
				scrollsToTop={false}
				onScroll={this.handleHorizontalScroll}
				scrollEventThrottle={100}
				removeClippedSubviews
				automaticallyAdjustContentInsets={false}
				directionalLockEnabled
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				onLayout={this.adjustCardSize}
			>
				{this.state.children.map((child, i) => this.renderContent(child, i))}
			</ScrollView>
		);
	}

	renderAndroid() {
		return (
			<ViewPagerAndroid
				ref="scrollview" // eslint-disable-line react/no-string-refs
				initialPage={this.state.initialSelectedIndex}
				onPageSelected={this.handleHorizontalScroll}
				style={tutorial.container}
			>
				{this.state.children.map((child, i) => this.renderContent(child, i))}
			</ViewPagerAndroid>
		);
	}

	adjustCardSize(e) {
		this.setState({
			width: e.nativeEvent.layout.width,
			height: e.nativeEvent.layout.height,
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedIndex !== this.state.selectedIndex) {
			if (Platform.OS === 'ios') {
				// eslint-disable-next-line react/no-string-refs
				this.refs.scrollview.scrollTo({
					x: nextProps.selectedIndex * this.state.width,
					animated: true,
				});
				this.setState({ scrollingTo: nextProps.selectedIndex });
			} else {
				// eslint-disable-next-line react/no-string-refs
				this.refs.scrollview.setPage(nextProps.selectedIndex);
				this.setState({ selectedIndex: nextProps.selectedIndex });
			}
		}
	}

	renderContent(child, i) {
		const { width, height } = this.state;
		const style = tutorial.view;
		return (
			<View style={[style, { width, height }]} key={`r_${i}`}>
				<Image source={child.image} style={tutorial.image} />
				<Text style={tutorial.text}>
					<Text style={{ fontFamily: 'robotoBold' }}>{child.title}</Text>
					{'\n'}
					<Text style={{ marginTop: 20 }}>{child.text}</Text>
				</Text>
				<Image source={child.background} style={tutorial.background} />
			</View>
		);
	}

	handleHorizontalScroll(e) {
		let selectedIndex = e.nativeEvent.position;
		if (selectedIndex === undefined) {
			selectedIndex = Math.round(e.nativeEvent.contentOffset.x / this.state.width);
		}
		if (selectedIndex < 0 || selectedIndex >= this.state.count) {
			return;
		}
		if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
			return;
		}
		if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
			this.setState({ selectedIndex, scrollingTo: null });
			const { onSelectedIndexChange } = this.props;
			// eslint-disable-next-line no-unused-expressions
			onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
		}
	}
}

export default Tutorial;
