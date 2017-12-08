/* eslint-disable react/prop-types, class-methods-use-this, array-callback-return */
import React from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Alert,
	Modal,
	TextInput,
	Button,
	BackHandler,
} from 'react-native';

import Header from '../components/Header';
import Drawer from '../components/Drawer';

import { colors } from '../styles/variables';

import background from '../assets/images/elements_bg.png';
import iconTermos from '../assets/images/ic-termosepoliticas.png';
import iconHelp from '../assets/images/spam-ico-copy.png';

const style = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 1,
		resizeMode: 'contain',
		width: '100%',
		height: 'auto',
		alignSelf: 'flex-end',
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
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		height: 300,
		width: '90%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
	},
});

class Config extends React.Component {
	constructor() {
		super();
		this.state = {
			menu: false,
			pageTitle: 'Configurações',
			list: [
				{
					type: 'terms',
					title: 'Termos de Serviço',
					icon: iconTermos,
				},
				{
					type: 'politic',
					title: 'Política de Privacidade',
					icon: iconTermos,
				},
				{
					type: 'help',
					title: 'Ajuda',
					icon: iconHelp,
				},
			],
			listHelp: [
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
			],
			selected: '',
			reportInput: 'Descrever problema',
			modalVisible: false,
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
	}

	componentDidMount() {
		BackHandler.addEventListener('backPress', () => {
			if (this.state.selected !== '') {
				const pageTitle = 'Configurações';
				const selected = '';
				this.setState({ pageTitle, selected });
				this.props.navigation.navigate('Config');
			}
		});
	}

	toggleMenu() {
		const menu = !this.state.menu;
		this.setState({ menu });
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
				<Header pageTitle={this.state.pageTitle} toggleMenu={this.toggleMenu} />
				{this.state.selected === '' && (
					<View style={style.container}>
						<View style={{ flex: 2 }}>
							{this.state.list.map(item => this.renderListItem(item))}
						</View>
						<Image source={background} style={style.background} />
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

				{this.state.selected === 'help' && (
					<View style={{ flex: 2 }}>
						{this.state.listHelp.map(item => this.renderListItem(item))}
					</View>
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
					style={style.modal}
				>
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
				</Modal>

				<Drawer
					menuState={this.state.menu}
					toggleMenu={this.toggleMenu}
					changeRoute={this.changeRoute}
				/>
			</View>
		);
	}
}

export default Config;
