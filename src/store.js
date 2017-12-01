import { createStore, bindActionCreators } from 'redux';
import * as actionCreators from './actions/actionsCreator';
import { posts, comments, users } from './reducers';

// create an object for the default data
const defaultState = {
	posts: [
		{
			code: 'BAcyDyQwcXX',
			caption: 'Lunch #hamont',
			likes: 56,
			id: '1161022966406956503',
			display_src:
				'https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg',
		},
		{
			code: 'BAcJeJrQca9',
			caption: 'Snow! ⛄️🌨❄️ #lifewithsnickers',
			likes: 59,
			id: '1160844458347054781',
			display_src:
				'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12407344_1283694208323785_735653395_n.jpg',
		},
		{
			code: 'BAF_KY4wcRY',
			caption: 'Cleaned my office and mounted my recording gear overhead. Stoked for 2016!',
			likes: 79,
			id: '1154606670337393752',
			display_src:
				'https://scontent.cdninstagram.com/hphotos-xpf1/t51.2885-15/e35/923995_1704188643150533_1383710275_n.jpg',
		},
	],
	comments: [],
	user: {
		token: {
			value: '9',
		},
		districts: [],
		user: {
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
			phone_number: '',
		},
	},
};

const store = createStore(users, defaultState);

function mapStateToProps(state) {
	return {
		posts: state.posts,
		comments: state.comments,
		user: state.user,
	};
}

function mapDispachToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

export { store, mapDispachToProps, mapStateToProps };
