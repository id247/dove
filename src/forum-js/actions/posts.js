export const POSTS_ADD_ITEM 	= 'POSTS_ADD_ITEM';
export const POSTS_ADD_ITEMS 	= 'POSTS_ADD_ITEMS';
export const POSTS_DELETE_ITEM 	= 'POSTS_DELETE_ITEM';

export function postsAddItems(payload) {
	return{
		type: POSTS_ADD_ITEMS,
		payload: payload
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


export const POSTS_SET_PAGE 	= 'POSTS_SET_PAGE';

export function setPage(pageId) {
	return {
		type: POSTS_SET_PAGE,
		payload: pageId
	}
}

export const POSTS_SET_LABEL 	= 'POSTS_SET_LABEL';

export function setPostsLabel(label) {
	return {
		type: POSTS_SET_LABEL,
		payload: label
	}
}
