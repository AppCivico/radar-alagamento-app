/* eslint-disable react/prop-types, react/sort-comp */
import React from 'react';
import { View, StyleSheet, ScrollView, ViewPagerAndroid, Platform, Text } from 'react-native';

class Tutorial extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0,
			selectedIndex: this.props.selectedIndex,
			initialSelectedIndex: this.props.selectedIndex,
			scrollingTo: null,
		};
		(this).handleHorizontalScroll = this.handleHorizontalScroll.bind(this);
		(this).adjustCardSize = this.adjustCardSize.bind(this);
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
				ref="scrollview"
				contentOffset={{
					x: this.state.width * this.state.initialSelectedIndex,
					y: 0,
				}}
				style={[styles.scrollview, this.props.style]}
				horizontal
				pagingEnabled
				bounces={!!this.props.bounces}
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
				{this.renderContent()}
			</ScrollView>
		);
	}

	renderAndroid() {
		return (
			<ViewPagerAndroid
				ref="scrollview"
				initialPage={this.state.initialSelectedIndex}
				onPageSelected={this.handleHorizontalScroll}
				style={styles.container}
			>
				{this.renderContent()}
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
				this.refs.scrollview.scrollTo({
					x: nextProps.selectedIndex * this.state.width,
					animated: true,
				});
				this.setState({ scrollingTo: nextProps.selectedIndex });
			} else {
				this.refs.scrollview.setPage(nextProps.selectedIndex);
				this.setState({ selectedIndex: nextProps.selectedIndex });
			}
		}
	}

	renderContent() {
		const { width, height } = this.state;
		const style = Platform.OS === 'ios' && styles.card;
		return React.Children.map(this.props.children, (child, i) => (
			<View style={[style, { width, height }]} key={`r_${i}`}>
				<Text>Mah oe</Text>
			</View>
		));
	}

	handleHorizontalScroll(e) {
		let selectedIndex = e.nativeEvent.position;
		if (selectedIndex === undefined) {
			selectedIndex = Math.round(e.nativeEvent.contentOffset.x / this.state.width);
		}
		if (selectedIndex < 0 || selectedIndex >= this.props.count) {
			return;
		}
		if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
			return;
		}
		if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
			this.setState({ selectedIndex, scrollingTo: null });
			const { onSelectedIndexChange } = this.props;
			onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
		}
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollview: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	card: {
		backgroundColor: 'transparent',
	},
});

export default Tutorial;
