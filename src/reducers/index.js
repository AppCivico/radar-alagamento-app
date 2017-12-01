function comments(state = [], action) {
	return state;
}

function posts(state = [], action) {
	return state;
}

function users(state = [], action) {
	switch (action.type) {
	case 'UPDATE_USER':
		state.user = action.user;
		console.log(state.user);
		break;
	default:
		return state;
	}

	return state;
}

export { posts, comments, users };
