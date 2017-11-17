/* eslint-disable react/prop-types, react/sort-comp */
import React from 'react';
import { View, ScrollView, ViewPagerAndroid, Platform, Image } from 'react-native';

import tutorial from '../styles/containers/tutorial';
import welcome from '../styles/containers/welcome';

import logo from '../assets/images/logo_radar.png';
import background from '../assets/images/elements_bg.png';

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
					logo,
					background,
				},
				{
					logo: background,
					background: logo,
				},
				{
					logo,
					background,
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
				style={tutorial.scrollview}
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
		const style = Platform.OS === 'ios' && tutorial.card;
		return (
			<View style={[style, { width, height }]} key={`r_${i}`}>
				<Image source={child.logo} style={welcome.logo} />
				<Image source={child.background} style={welcome.background} />
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
