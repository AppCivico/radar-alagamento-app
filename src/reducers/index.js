import { combineReducers } from 'redux';

function comments(state = [], action) {
	console.log(state, action);
	return state;
}

function posts(state = [], action) {
	console.log(state, action);
	return state;
}

const rootReducer = combineReducers({ posts, comments });

export default rootReducer;
