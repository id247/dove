import API from '../api/api';
import OAuth from '../api/hello';

import { ForumOptions } from 'appSettings';

import * as visual from '../helpers/visual.js';

import * as loadingActions from '../actions/loading';
import * as errorActions from '../actions/error';
import * as userActions from '../actions/user';
import * as pageActions from '../actions/page';
import * as postsActions from '../actions/posts';


//error handler

export function catchError(err){
	return dispatch => {
		if (err.description){	
			console.error(err.message,':', err.description);
		}else{
			console.error(err);
		}

		switch(err.message){
			case 'Unauthorized':
				dispatch(logout());
				break;
		}
	}
}

// authorisation

export function login() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {
			dispatch(loadingActions.loadingHide());	

			dispatch(pageActions.setPageWithoutHistory('/'));
		},(err) => {
			dispatch(loadingActions.loadingHide());	

			dispatch(catchError(err));
		});
	}
}


export function logout() {
	return dispatch => {
		OAuth.logout();
		dispatch(userActions.userUnset());
	}
}


//init

export function getInitialData() {

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return API.getUser()
		.then( (user) => {	
			dispatch(loadingActions.loadingHide());

			dispatch(userActions.userSet(user));
			dispatch(getPosts());
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(pageActions.setPageWithoutHistory('/login'));
			dispatch(catchError(err)); 
		})
		.then( () => {			
			
		})
	}
}


//forum

export function addPost(data) {

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return API.addKeyToDB(data)
		.then( (res) => {	
			//console.log(res);
			return API.getKeysFromDBdesc(res.Label);
		})
		.then( (posts) => {	
			//console.log(posts);
			dispatch(loadingActions.loadingHide());

			dispatch(postsActions.deleteQuote());
			dispatch(getPosts());
			dispatch(pageActions.setPageWithoutHistory('/'));
		})
		.catch( err => { 
			dispatch(catchError(err)); 
			dispatch(loadingActions.loadingHide());
		});
	}
}

export function getPosts() {

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	

		const pageNumber = getState().posts ? getState().posts.page : 1;

		const p0 = API.getKeysFromDBdesc(ForumOptions.postsLabel, pageNumber, ForumOptions.pageSize);
		const p1 = API.getCoutersFromDBdesc(ForumOptions.postsLabel, pageNumber, ForumOptions.pageSize);

		return Promise.all([p0,p1])
		.then( (values) => {
			dispatch(loadingActions.loadingHide());

			const posts = values[0];	
			const counters = values[1];	

			posts.Keys = posts.Keys.map( key => {
				key.counter = false;

				counters.Counters.map( counter => {
					if (parseInt(counter.Name) === key.Id){
						key.counter = counter;
					}
				});

				return key;
			});

			//console.log(posts, counters);
			dispatch(postsActions.postsAddItems({posts, counters}));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function deletePost(postId) {

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return API.deleteKeyFromDB(postId)
		.then( (res) => {	
			console.log(res);
			dispatch(loadingActions.loadingHide());

			if (res.type !== 'systemForbidden'){
				dispatch(getPosts());
			}
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function vote(keyId) {

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return API.voteForCounterFromDB(keyId, ForumOptions.postsLabel)
		.then( (res) => {	
			console.log(res);
			dispatch(loadingActions.loadingHide());

			if (res.type !== 'systemForbidden'){
				dispatch(getPosts());
			}
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function addQuote(quote) {

	return dispatch => {
		
		visual.scrollTo(document.body, 0, 600);
		dispatch(postsActions.addQuote(quote)); 

	}
}


export function setPage(pageId) {

	return dispatch => {

		dispatch(postsActions.setPage(pageId)); 		
		dispatch(getPosts());
		visual.scrollTo(document.body, 0, 0);

	}
}





export function init() {
	return dispatch => {
		return dispatch(getInitialData());	
	}
}

