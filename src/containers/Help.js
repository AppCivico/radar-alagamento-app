/* eslint-disable react/prop-types, class-methods-use-this, array-callback-return */
import React from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	StyleSheet,
	ScrollView,
	Alert,
	Modal,
	TextInput,
	Button,
	BackHandler,
} from 'react-native';

import Header from '../components/Header';

import { colors } from '../styles/variables';

import menuIcon from '../assets/images/spam-ico-copy.png';
import backIcon from '../assets/images/back-icon.png';

const style = StyleSheet.create({
	tabIcon: {
		width: 20,
		height: 20,
	},
	container: {
		flex: 1,
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20,
		alignItems: 'center',
		borderBottomWidth: 0.5,
		borderBottomColor: colors.grayLight,
	},
	itemTitle: {
		fontFamily: 'raleway',
		color: colors.gray,
		marginTop: 2,
		fontSize: 16,
	},
	itemIcon: {
		width: 30,
		height: 23,
		resizeMode: 'contain',
		marginRight: 20,
	},
	textArea: {
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
	},
	text: {
		fontSize: 16,
		fontFamily: 'raleway',
		textAlign: 'justify',
		color: colors.gray,
	},
	modalWrapper: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		backgroundColor: '#fff',
		height: 300,
		width: '90%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
	},
	backIcon: {
		position: 'absolute',
		top: 43,
		right: 20,
		width: 20,
		height: 20,
		resizeMode: 'contain',
	},
});

class Help extends React.Component {
	static navigationOptions = {
		tabBarLabel: 'Ajuda',
		// Note: By default the icon is only shown on iOS. Search the showIcon option below.
		tabBarIcon: ({ tintColor }) => (
			<Image
				source={menuIcon}
				style={[style.tabIcon, { tintColor }]}
			/>
		),
	};

	constructor() {
		super();
		this.state = {
			pageTitle: 'Ajuda',
			list: [
				{
					type: 'faq',
					title: 'Perguntas Frequentes',
				},
				{
					type: 'how',
					title: 'Como funciona',
				},
				{
					type: 'report',
					title: 'Reportar problema',
				},
				{
					type: 'about',
					title: 'Sobre',
				},
				{
					type: 'terms',
					title: 'Termos de Serviço',
				},
				{
					type: 'politic',
					title: 'Política de Privacidade',
				},
			],
			selected: '',
			reportInput: 'Descrever problema',
			modalVisible: false,
		};

		this.changeRoute = this.changeRoute.bind(this);
	}

	componentDidMount() {
		this.changeGoBack = BackHandler.addEventListener('backPress', () => {
			if (this.state.selected !== '') {
				this.props.navigation.navigate('Help');
				this.goBack();
			}
		});
	}

	componentWillUnmount() {
		this.changeGoBack.remove();
	}

	changeRoute(route) {
		this.props.navigation.navigate(route);
	}

	changeContent(item) {
		if (item.type === 'about') {
			Alert.alert('Sobre', 'Versão 1.0 \n Desenvolvido por Eokoe', [{ text: 'OK' }], {
				cancelable: false,
			});
		} else if (item.type === 'report') {
			this.toggleModal();
		} else {
			const pageTitle = item.title;
			const selected = item.type;
			this.setState({ pageTitle, selected });
		}
	}

	toggleModal() {
		const modalVisible = !this.state.modalVisible;
		this.setState({ modalVisible });
	}

	goBack() {
		const pageTitle = 'Ajuda';
		const selected = '';
		this.setState({ pageTitle, selected });
	}

	renderListItem(item) {
		return (
			<TouchableOpacity key={item.type} onPress={() => this.changeContent(item)}>
				<View style={style.item}>
					{item.icon && <Image source={item.icon} style={style.itemIcon} />}
					<Text style={style.itemTitle}>{item.title}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={style.container}>
				<Header pageTitle={this.state.pageTitle} />
				{this.state.selected !== '' && (
					<TouchableWithoutFeedback onPress={() => this.goBack()}>
						<Image source={backIcon} style={style.backIcon} />
					</TouchableWithoutFeedback>
				)}
				{this.state.selected === '' && (
					<View style={style.container}>
						<ScrollView>
							{this.state.list.map(item => this.renderListItem(item))}
						</ScrollView>
					</View>
				)}
				{this.state.selected === 'terms' && (
					<ScrollView style={style.textArea}>
						<Text style={style.text}>
							Consectetur adipiscing elit. Etiam at nisi sed purus mattis varius id sit amet nibh.
							Nullam dolor neque, sagittis eu iaculis sit amet, ultricies ac velit. Morbi semper
							tempus massa id congue. Quisque aliquet justo ac lobortis vehicula. Sed in leo vel
							ligula tincidunt scelerisque at a leo.
							{'\n'}
							{'\n'}
							Vivamus vulputate non lectus nec ultricies. Quisque posuere est at est tempor
							efficitur eu a lorem. Donec sit amet sollicitudin dolor, eget sollicitudin nibh. Fusce
							commodo consequat ipsum, luctus ultricies urna varius et. Morbi mollis urna sed
							placerat maximus. Donec condimentum non ipsum vel molestie. Aliquam bibendum nisl
							mauris, eu finibus diam gravida ac. Sed ex orci, porttitor eget ex in, ultrices
							iaculis orci. Mauris id massa lectus.
						</Text>
					</ScrollView>
				)}

				{this.state.selected === 'politic' && (
					<ScrollView style={style.textArea}>
						<Text style={style.text}>
							Vivamus vulputate non lectus nec ultricies. Quisque posuere est at est tempor
							efficitur eu a lorem. Donec sit amet sollicitudin dolor, eget sollicitudin nibh. Fusce
							commodo consequat ipsum, luctus ultricies urna varius et. Morbi mollis urna sed
							placerat maximus. Donec condimentum non ipsum vel molestie. Aliquam bibendum nisl
							mauris, eu finibus diam gravida ac.
							{'\n'}
							{'\n'}
							Sed ex orci, porttitor eget ex in, ultrices iaculis orci. Mauris id massa lectus.
							Consectetur adipiscing elit. Etiam at nisi sed purus mattis varius id sit amet nibh.
							Nullam dolor neque, sagittis eu iaculis sit amet, ultricies ac velit. Morbi semper
							tempus massa id congue. Quisque aliquet justo ac lobortis vehicula. Sed in leo vel
							ligula tincidunt scelerisque at a leo.
							{'\n'}
							{'\n'}
							Vivamus vulputate non lectus nec ultricies. Quisque posuere est at est tempor
							efficitur eu a lorem. Donec sit amet sollicitudin dolor, eget sollicitudin nibh. Fusce
							commodo consequat ipsum, luctus ultricies urna varius et. Morbi mollis urna sed
							placerat maximus. Donec condimentum non ipsum vel molestie. Aliquam bibendum nisl
							mauris, eu finibus diam gravida ac. Sed ex orci, porttitor eget ex in, ultrices
							iaculis orci. Mauris id massa lectus.
						</Text>
					</ScrollView>
				)}

				{this.state.selected === 'faq' && (
					<ScrollView style={style.textArea}>
						<Text style={style.text}>Soon</Text>
					</ScrollView>
				)}

				{this.state.selected === 'how' && (
					<ScrollView style={style.textArea}>
						<Text style={style.text}>Soon 2</Text>
					</ScrollView>
				)}

				<Modal
					visible={this.state.modalVisible}
					onRequestClose={() => {
						console.log('Modal has been closed.');
					}}
					presentationStyle="overFullScreen"
					animationType="fade"
					animated
					transparent
				>
					<View style={style.modalWrapper}>
						<View	style={style.modal}>
							<Text>Reportar problema</Text>
							<TextInput
								style={style.input}
								onChangeText={reportInput => this.setState({ reportInput })}
								placeholder={this.state.reportInput}
								placeholderTextColor={colors.gray}
							/>
							<Button
								onPress={() => this.toggleModal()}
								title="CANCELAR"
								color={colors.blueDark}
								accessibilityLabel="CANCELAR"
							/>
							<Button
								onPress={() => this.toggleModal()}
								title="Cancelar"
								color={colors.blueDark}
								accessibilityLabel="OK"
							/>
						</View>
					</View>
				</Modal>

			</View>
		);
	}
}

export default Help;
