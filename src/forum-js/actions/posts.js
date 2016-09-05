export const POSTS_ADD_ITEM 	= 'POSTS_ADD_ITEM';
export const POSTS_ADD_ITEMS 	= 'POSTS_ADD_ITEMS';
export const POSTS_DELETE_ITEM 	= 'POSTS_DELETE_ITEM';

export function postsAddItems(posts) {
	return{
		type: POSTS_ADD_ITEMS,
		payload: posts
	}
};

export function postsAddItem(post) {
	return{
		type: POSTS_ADD_ITEM,
		payload: post
	}
};

export function postsAddItem(postId) {
	return {
		type: POSTS_DELETE_ITEM,
		payload: postId
	}
}


export function addQuote(quote) {
	return {
		type: POSTS_DELETE_ITEM,
		payload: quote
	}
}

export const POSTS_ADD_QUOTE 	= 'POSTS_ADD_QUOTE';
export const POSTS_DELETE_QUOTE	= 'POSTS_DELETE_QUOTE';

export function addQuote(quote) {
	return {
		type: POSTS_ADD_QUOTE,
		payload: quote
	}
}
export function deleteQuote(quote) {
	return {
		type: POSTS_DELETE_QUOTE,
	}
}
