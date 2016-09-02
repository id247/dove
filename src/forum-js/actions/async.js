import API from '../api/api';
import OAuth from '../api/hello';

import * as loadingActions from '../actions/loading';
import * as errorActions from '../actions/error';
import * as userActions from '../actions/user';
import * as pageActions from '../actions/page';
import * as postsActions from '../actions/posts';

import * as messagesHelpers from '../helpers/messages';

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
			dispatch(getInitialData());
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

export function doActionAfterLogin(callback) {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( getUserDataPromises )
		.then( data => {
			dispatch(setUserData(data));
		})
		.then( () => {
			callback();
		})
		.then( () => {
			dispatch(loadingActions.loadingHide());	
		},(err) => {
			dispatch(catchError(err)); 	
			dispatch(loadingActions.loadingHide());
		});
	}
}



//init

export function getInitialData() {

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return API.getUser()
		.then( (user) => {	
			dispatch(userActions.userSet(user));
			dispatch(pageActions.setPageWithoutHistory('index'));
			dispatch(loadingActions.loadingHide());

			dispatch(getPosts());
		})
		.catch( err => { 
			dispatch(pageActions.setPageWithoutHistory('login'));
			dispatch(catchError(err)); 
			dispatch(loadingActions.loadingHide());
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
			console.log(res);
			return API.getKeysFromDBdesc(res.Label);
		})
		.then( (posts) => {	
			console.log(posts);
			dispatch(postsActions.postsAddItems(posts));
		})
		.catch( err => { 
			dispatch(catchError(err)); 
		})
		.then( () => {			
			dispatch(loadingActions.loadingHide());
		})
	}
}

export function getPosts() {

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return API.getKeysFromDBdesc('posts-test-1')
		.then( (posts) => {	
			console.log(posts);
			dispatch(postsActions.postsAddItems(posts));
		})
		.catch( err => { 
			dispatch(catchError(err)); 
		})
		.then( () => {			
			dispatch(loadingActions.loadingHide());
		})
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
			dispatch(catchError(err)); 
			dispatch(loadingActions.loadingHide());
		});
	}
}


export function init() {
	return dispatch => {
		return dispatch(getInitialData());	
	}
}

