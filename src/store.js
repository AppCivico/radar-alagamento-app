import { createStore } from 'redux';

// State
const initialState = {
	count: 0,
};

// Action
const increaseAction = { type: 'increase' };

// Reducer
function reducer(state = initialState, action) {
	const { count } = state;
	switch (action.type) {
	case 'increase':
		return { count: count + 1 };
	default:
		return state;
	}
}

// Store
const store = createStore(reducer);

// Map Redux state to component props
function mapStateToProps(state) {
	return {
		value: state.count,
	};
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		onIncreaseClick: () => dispatch(increaseAction),
	};
}

export { store, mapDispatchToProps, mapStateToProps };
