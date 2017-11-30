import { createStore } from 'redux';

// Actions
const increaseAction = { type: 'increase' };

// Reducers
function counter(state = { count: 0 }, action) {
	const { count } = state;
	switch (action.type) {
	case 'increase':
		return { count: count + 1 };
	default:
		return state;
	}
}

// Stores
const store = createStore(counter);

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

export { store, mapStateToProps, mapDispatchToProps };
