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
