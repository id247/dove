import API from '../api/api';
import OAuth from '../api/hello';

import { ForumOptions } from 'appSettings';

import * as visual from '../helpers/visual.js';

import * as loadingActions from '../actions/loading';
import * as errorActions from '../actions/error';
import * as userActions from '../actions/user';
import * as pageActions from '../actions/page';
import * as postsActions from '../actions/posts';
import * as forumFormActions from '../actions/forum-form';


//error handler

export function catchError(err){
	return dispatch => {
		let error = '';
		
		if (err.description){	
			error += err.message,':', err.description;
		}else{
			error += err;
		}

		console.error(error);

		switch(err.message){
			case 'Unauthorized':
				dispatch(logout());
				break;
			default: 
				error = 'Произошла ошибка: ' + error + '. Попробуйте обновить страницу.';
				dispatch(errorActions.setError(error));

				setTimeout( () => {
					dispatch(errorActions.setError(''));
				}, 2000);
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
		dispatch(pageActions.setPageWithoutHistory('/login'));
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
			dispatch(pageActions.setPageWithoutHistory('/'));
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
		dispatch(forumFormActions.postNotAdded());

		const label = getState().posts ? getState().posts.label : 'girls';
		const pageNumber = getState().posts ? getState().posts.page : 1;
		
		const data = {
			key: 'post-' + new Date().getTime(),
			value: value,
			permissionLevel: 'Public',
			label: ForumOptions.postsLabel[label],
		}

		return API.addKeyToDB(data)
		.then( (res) => {	
			dispatch(loadingActions.loadingHide());

			dispatch(postAdded());

			setTimeout( () => {
				dispatch(forumFormActions.postNotAdded());
			}, 3000);

			if (pageNumber === 1){
				dispatch(getPosts());
			}else{
				dispatch(setPage(1, false));
			}

		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function postAdded() {

	return (dispatch, getState) => {
		dispatch(forumFormActions.messageClear());
		dispatch(forumFormActions.deleteQuote());
		dispatch(forumFormActions.postAdded());
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
		
		dispatch(forumFormActions.addQuote(quote)); 
		visual.scrollTo(document.body, 0, 600);

	}
}


export function setPage(pageId) {

	return (dispatch, getState) => {

		const pageUrl = pageId > 1 ? '/page/' + pageId : '/';

		if (getState().posts && getState().posts.page !== pageId){
			dispatch(pageActions.setPage(pageUrl)); 		
			dispatch(postsActions.setPage(pageId)); 	
		}	
		
	}
}

//forum form
export function forumFormSubmit() {

	return (dispatch, getState) => {

		const state = getState();

		const message = state.forumForm.message;
		const anon = state.forumForm.anon;
		const quote = state.forumForm.quote;

		const { profile } = state.user;

		let user;
		const anonAvatar = ForumOptions.anonAvatar;

		if (!anon){
			user = {
				id: profile.id_str,
				firstName: profile.firstName,
				lastName: profile.lastName,
				roles: profile.roles,
				photoSmall: profile.photoMedium ? profile.photoMedium : anonAvatar,
			}
		}else{
			user = {
				id: 0,
				firstName: 'Аноним',
				lastName: '',
				roles: [],
				photoSmall: anonAvatar,
			}			
		}

		let value = {
			user: user,
			message: message,
			quote: quote,
		}

		value = encodeURIComponent(JSON.stringify(value));

		dispatch(addPost(value));
		
	}
}


export function init() {
	return dispatch => {
		return dispatch(getInitialData());	
	}
}

