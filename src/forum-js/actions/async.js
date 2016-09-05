import API from '../api/api';
import OAuth from '../api/hello';

import forumSettings from '../settings/forum.js';

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
			dispatch(loadingActions.loadingHide());
		})
		.catch( err => { 
			dispatch(pageActions.setPageWithoutHistory('/login'));
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
			dispatch(loadingActions.loadingHide());
			dispatch(postsActions.deleteQuote());
			dispatch(getPosts(1));
			dispatch(pageActions.setPageWithoutHistory('/'));
		})
		.catch( err => { 
			dispatch(catchError(err)); 
			dispatch(loadingActions.loadingHide());
		});
	}
}

export function getPosts(pageNumber) {

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	

		if (!pageNumber){

			pageNumber = getState().posts ? getState().posts.page : 1;

		}

		const p0 = API.getKeysFromDBdesc(forumSettings.postsLabel, pageNumber, forumSettings.pageSize);
		const p1 = API.getCoutersFromDBdesc(forumSettings.postsLabel, pageNumber, forumSettings.pageSize);

		return Promise.all([p0,p1])
		.then( (values) => {
			const posts = values[0];	
			const counters = values[1];	

			posts.Keys = posts.Keys.map( key => {
				key.counter = false;

				counters.Counters.map( counter => {
					if (parseInt(counter.Name) === key.Id){
						console.log('asdasdasd', key.Id, counter);
						key.counter = counter;
					}
				});

				return key;
			});

			console.log(posts, counters);
			dispatch(postsActions.postsAddItems({posts, counters}));
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

export function vote(keyId) {

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return API.voteForCounterFromDB(keyId, forumSettings.postsLabel)
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

