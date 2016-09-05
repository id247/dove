import { combineReducers } from 'redux';

import * as actions from '../actions/posts';

export function list(state = [], action) {
	switch (action.type) {
		case actions.POSTS_ADD_ITEMS:
			return  action.payload.Keys;

		default:
			return state;
	}
}
export function itemsTotalCount(state = 0, action) {
	switch (action.type) {
		case actions.POSTS_ADD_ITEMS:
			return  action.payload.Paging.count;

		default:
			return state;
	}
}

export const posts = combineReducers({
	list,
	itemsTotalCount,
	//ozonLink,
});
