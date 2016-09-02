import { combineReducers } from 'redux';

import { error } from './error';
import { user } from './user';
import { loading } from './loading';

const rootReducer = combineReducers({
	error,
	loading,
	user,
});

export default rootReducer;
