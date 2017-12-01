function user(state = [], action) {
	switch (action.type) {
	case 'UPDATE_USER':
		state.user = action.user;
		break;
	default:
		return state;
	}

	return state;
}

function apikey(state = [], action) {
	switch (action.type) {
	case 'UPDATE_APIKEY':
		state.apikey = action.apikey;
		console.log(state.apikey);
		break;
	default:
		return state;
	}

	return state;
}

export { user, apikey };
