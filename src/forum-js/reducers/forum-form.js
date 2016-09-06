import { combineReducers } from 'redux';

import * as actions from '../actions/forum-form';

export function message(state = '', action) {
	switch (action.type) {
		case actions.FORUM_FORM_CHANGE:
			return 	action.payload.message;

		case actions.FORUM_FORM_MESSAGE_CLEAR:
			return 	'';

		default:
			return state;
	}
}
export function anon(state = false, action) {
	switch (action.type) {
		case actions.FORUM_FORM_CHANGE:
			return 	action.payload.anon;

		default:
			return state;
	}
}

export function quote(state = false, action) {
	switch (action.type) {
		case actions.FORUM_FORM_ADD_QUOTE:
			return  action.payload;

		case actions.FORUM_FORM_DELETE_QUOTE:
			return  false;

		default:
			return state;
	}
}
export function postAdded(state = false, action) {
	switch (action.type) {
		case actions.FORUM_FORM_POST_ADDED:
			return  true;

		case actions.FORUM_FORM_POST_NOT_ADDED:
			return  false;

		default:
			return state;
	}
}

export const forumForm = combineReducers({
	message,
	anon,
	quote,
	postAdded,
});
