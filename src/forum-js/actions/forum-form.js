export const FORUM_FORM_CHANGE 	= 'FORUM_FORM_CHANGE';
export const FORUM_FORM_MESSAGE_CLEAR = 'FORUM_FORM_MESSAGE_CLEAR';

export function formChange(payload) {
	return{
		type: FORUM_FORM_CHANGE,
		payload: payload
	}
};

export function messageClear(payload) {
	return{
		type: FORUM_FORM_MESSAGE_CLEAR,
	}
};

export const FORUM_FORM_ADD_QUOTE = 'FORUM_FORM_ADD_QUOTE';
export const FORUM_FORM_DELETE_QUOTE = 'FORUM_FORM_DELETE_QUOTE';

export function addQuote(quote) {
	return {
		type: FORUM_FORM_ADD_QUOTE,
		payload: quote
	}
}
export function deleteQuote(quote) {
	return {
		type: FORUM_FORM_DELETE_QUOTE,
	}
}
export const FORUM_FORM_POST_ADDED 		= 'FORUM_FORM_POST_ADDED';
export const FORUM_FORM_POST_NOT_ADDED	= 'FORUM_FORM_POST_NOT_ADDED';

export function postAdded() {
	return {
		type: FORUM_FORM_POST_ADDED,
	}
}
export function postNotAdded() {
	return {
		type: FORUM_FORM_POST_NOT_ADDED,
	}
}
