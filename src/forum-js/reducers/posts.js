import { combineReducers } from 'redux';

import * as actions from '../actions/posts';

export function list(state = [], action) {
	switch (action.type) {
		case actions.POSTS_ADD_ITEMS:
			return  action.payload.posts.Keys;

		default:
			return state;
	}
}

export function counters(state = [], action) {
	switch (action.type) {
		case actions.POSTS_ADD_ITEMS:
			return  action.payload.counters.Counters;

		default:
			return state;
	}
}
export function itemsTotalCount(state = 0, action) {
	switch (action.type) {
		case actions.POSTS_ADD_ITEMS:
			return  action.payload.posts.Paging.count;

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

export function page(state = 1, action) {
	switch (action.type) {
		case actions.POSTS_SET_PAGE:
			return  action.payload;

		default:
			return state;
	}
}

export const posts = combineReducers({
	list,
	counters,
	itemsTotalCount,
	quote,
	page,
});
