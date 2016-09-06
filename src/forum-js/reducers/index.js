import { combineReducers } from 'redux';

import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { page } from './page';
import { posts } from './posts';
import { forumForm } from './forum-form';

const rootReducer = combineReducers({
	error,
	loading,
	user,
	page,
	posts,
	forumForm,
});

export default rootReducer;
