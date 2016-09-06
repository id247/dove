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

export function addPost(value) {

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	

		const label = getState().posts ? getState().posts.label : 'girls';

		const data = {
			key: 'post-' + new Date().getTime(),
			value: value,
			permissionLevel: 'Public',
			label: ForumOptions.postsLabel[label],
		}

		return API.addKeyToDB(data)
		.then( (res) => {	
			//console.log(res);
			return API.getKeysFromDBdesc(res.Label);
		})
		.then( (posts) => {	
			//console.log(posts);
			dispatch(loadingActions.loadingHide());

			dispatch(postsActions.deleteQuote());

			dispatch(setPage(1));

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
		const label = getState().posts ? getState().posts.label : 'girls';

		const p0 = API.getKeysFromDBdesc(ForumOptions.postsLabel[label], pageNumber, ForumOptions.pageSize);
		const p1 = API.getCoutersFromDBdesc(ForumOptions.postsLabel[label], pageNumber, ForumOptions.pageSize);

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

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	
		
		const label = getState().posts ? getState().posts.label : 'girls';

		return API.voteForCounterFromDB(keyId, ForumOptions.postsLabel[label])
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
		
		dispatch(postsActions.addQuote(quote)); 
		visual.scrollTo(document.body, 0, 600);

	}
}


export function setPage(pageId, scrollTo = 0) {

	return (dispatch, getState) => {

		const pageUrl = pageId > 1 ? '/page/' + pageId : '/';

		if (getState().posts && getState().posts.page !== pageId){
			dispatch(pageActions.setPage(pageUrl)); 		
			dispatch(postsActions.setPage(pageId)); 			
		}	

		dispatch(getPosts());	
		document.body.scrollTop = 0;

	}
}





export function init() {
	return dispatch => {
		return dispatch(getInitialData());	
	}
}

