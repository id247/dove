export const POSTS_ADD_ITEMS 		= 'POSTS_ADD_ITEMS';

export function postsAddItems(payload) {
	return{
		type: POSTS_ADD_ITEMS,
		payload: payload
	}
};


export const POSTS_EDIT_POST_ON 	= 'POSTS_EDIT_POST_ON';
export const POSTS_EDIT_POST_OFF 	= 'POSTS_EDIT_POST_OFF';

export function postsEditOn(postId) {
	return {
		type: POSTS_EDIT_POST_ON,
		payload: postId
	}
}

export function postsEditOff() {
	return {
		type: POSTS_EDIT_POST_OFF,
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
