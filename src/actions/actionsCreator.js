export function updateUser(user) {
	return {
		type: 'UPDATE_USER',
		user,
	};
}

export function updateApikey(apikey) {
	return {
		type: 'UPDATE_APIKEY',
		apikey,
	};
}
