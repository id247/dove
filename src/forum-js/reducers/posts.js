// import { combineReducers } from 'redux';

import * as actions from '../actions/posts';

export function posts(state = [], action) {
	switch (action.type) {
		case actions.POSTS_ADD_ITEMS:
			return  action.payload;
		
		case actions.POSTS_ADD_ITEM:
			return 	[...state, action.payload];
		
		case actions.POSTS_DELETE_ITEM:	
			return 	state.filter( (post) => ( post.id !== action.payload ) ); 

		default:
			return state;
	}
}

// export const wishlist = combineReducers({
// 	ids,
// 	products,
// 	//ozonLink,
// });
