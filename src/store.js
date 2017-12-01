import { createStore, bindActionCreators, combineReducers } from 'redux';
import * as actionCreators from './actions/actionsCreator';
import { user, apikey } from './reducers/index';

// create an object for the default data
const defaultState = {
	user: {},
	apikey: '',
};

const store = createStore(
	combineReducers({
		user,
		apikey,
	}),
	defaultState,
);

function mapStateToProps(state) {
	return {
		user: state.user,
		apikey: state.apikey,
	};
}

function mapDispachToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

export { store, mapDispachToProps, mapStateToProps };
