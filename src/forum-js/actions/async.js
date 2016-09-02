import API from '../api/api';
import OAuth from '../api/hello';

import * as loadingActions from '../actions/loading';
import * as errorActions from '../actions/error';
import * as userActions from '../actions/user';

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
		},(err) => {
			dispatch(catchError(err));
			dispatch(loadingActions.loadingHide());
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
		})
		.then( () => {			
			dispatch(loadingActions.loadingHide());
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

