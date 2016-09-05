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

export function quote(state = false, action) {
	switch (action.type) {
		case actions.POSTS_ADD_QUOTE:
			return  action.payload;

		case actions.POSTS_DELETE_QUOTE:
			return  false;

		default:
			return state;
	}
}

export const posts = combineReducers({
	list,
	itemsTotalCount,
	quote,
});
