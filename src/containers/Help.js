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
	BackHandler,
} from 'react-native';
import axios from 'axios';

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
		height: 200,
		width: '90%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
		padding: 20,
	},
	modalTitle: {
		fontSize: 20,
		fontFamily: 'raleway',
		color: colors.gray,
	},
	backIcon: {
		position: 'absolute',
		top: 43,
		right: 20,
		width: 20,
		height: 20,
		resizeMode: 'contain',
	},
	modalInput: {
		marginTop: 50,
		marginBottom: 20,
		height: 40,
		fontSize: 14,
		fontFamily: 'raleway',
		color: colors.gray,
		borderBottomColor: colors.gray,
		borderBottomWidth: 1,
	},
	modalButtons: {
		flex: 1,
		flexDirection: 'row',
	},
	modalButtonRight: {
		flex: 2,
	},
	modalButtonLeft: {
		flex: 1,
	},
	modalButtonText: {
		fontSize: 16,
		fontFamily: 'raleway',
		color: colors.blueDark,
		textAlign: 'right',
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
			reportInput: 'Descreva o problema',
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

	toggleModal(action) {
		const modalVisible = !this.state.modalVisible;

		if (!action) {
			const reportInput = 'Descreva o problema';
			this.setState({ modalVisible, reportInput });
		} else {
			const message = this.state.reportInput;
			if (message !== 'Descreva o problema') {
				const data = {
					status: 'error',
					payload: message,
				};

				axios({
					method: 'POST',
					url: 'https://dtupa.eokoe.com/app-report',
					headers: { 'Content-Type': 'application/json' },
					data,
				})
					.then((res) => {
						console.log(res);
					})
					.catch(() => {
						this.showError('Ops! Ocorreu um erro ao enviar sua mensagem, tente novamente!');
					});
			}
		}
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
					onRequestClose={() => this.toggleModal(false)}
					presentationStyle="overFullScreen"
					animationType="fade"
					animated
					transparent
				>
					<View style={style.modalWrapper}>
						<View	style={style.modal}>
							<Text style={style.modalTitle}>Reportar problema</Text>
							<TextInput
								style={style.modalInput}
								onChangeText={reportInput => this.setState({ reportInput })}
								placeholder={this.state.reportInput}
								placeholderTextColor={colors.gray}
							/>
							<View style={style.modalButtons}>
								<TouchableOpacity
									onPress={() => this.toggleModal(false)}
									style={style.modalButtonRight}
								>
									<Text style={style.modalButtonText}>CANCELAR</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.toggleModal(true)}
									style={style.modalButtonLeft}
								>
									<Text style={style.modalButtonText}>OK</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>

			</View>
		);
	}
}

export default Help;
