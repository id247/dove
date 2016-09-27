import API from '../api/api';
import OAuth from '../api/hello';

import { ForumOptions } from 'appSettings';

import * as visual from '../helpers/visual.js';

import * as loadingActions 		from '../actions/loading';
import * as errorActions 		from '../actions/error';
import * as userActions 		from '../actions/user';
import * as pageActions 		from '../actions/page';
import * as postsActions 		from '../actions/posts';
import * as forumFormActions 	from '../actions/forum-form';


//error handler

export function catchError(err){
	return dispatch => {
		
		let errorStart = 'Ошибка ' + err.message + ':';
		let errorEnd = 'Попробуйте обновить страницу.';

		if (!err.description) {
			console.error(errorStart + ' ' + err);			
			dispatch(errorActions.setError(errorStart + err + errorEnd));
		}

		const description = err.description.type + ' (' + err.description.description + ')'; 

		console.error(errorStart + ' ' + description);

		switch (err.message){
			case 401:					
				dispatch(logout());
				return;
				
				break;
			case 403: 
				errorEnd = 'Отказано в доступе.'
				
				break;
			case 404: 
				errorEnd = 'Запрошеный ресурс не найден.'
				
				break;
		}

		try{
			ga('send', 'event', 'Ошибка', description);
		}catch(e){

		}
		
		dispatch(errorActions.setError(errorStart + ' ' + description + ' ' + errorEnd));
	
	}
}

//chunk arrays and send in to getPromisesFunc function wich returns a Promise or array of Promises
function getChunkPromises(items, chunkLength = 10, getPromisesFunc){

	function isIterable(obj) {
		// checks for null and undefined
		if (obj == null) {
		return false;
		}
		return typeof obj[Symbol.iterator] === 'function';
	}

	function flatArrays(arrays){
		return [].concat.apply([], arrays);
	}

	function getChunks(items, chunkLength = 10){

		const chunks = [];

		for (let i = 0; i < items.length ; i+=chunkLength){
			chunks.push(items.slice(i,i+chunkLength));
		}

		return chunks;
	}

	return new Promise( (resolve, reject) => {

		let count = 0;
		const results = [];
		const itemsChunks = getChunks(items, chunkLength);

		itemsChunks.map( itemsChunk => {
			count++;

			setTimeout(() => {

				let promises = getPromisesFunc(itemsChunk); 

				console.log('send chunk');

				//in single Promise - push in to array for Promise.all
				if (!isIterable(promises)){
					promises = [promises];
				}

				Promise.all(promises)
				.then( values => {
					results.push(values);

					if (results.length === count){
						resolve( flatArrays(results) );
					}
				})
				.catch( err => {
					reject( err );
				});


			}, count*500);
		});
	});
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

			//dispatch(catchError(err));
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
			//dispatch(pageActions.setPageWithoutHistory('/'));
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

	console.log('get posts');

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	

		const pageNumber = getState().posts ? getState().posts.page : 1;
		const label = getState().posts ? getState().posts.label : 'girls';

		let posts;
		let counters;
		let firstPageCounters;

		const countersPageSize = 20;

		return API.getKeysFromDBdesc(ForumOptions.postsLabel[label], pageNumber, ForumOptions.pageSize)
		.then( res => {
			posts = res;
			return API.getCoutersFromDBdesc(ForumOptions.postsLabel[label], 1, countersPageSize); //fist request to get counters total count
		})
		.then( res => {
			firstPageCounters = res.Counters;

			if (res.Paging.count < countersPageSize){
				return []; //return empry array if 1 page is enouth
			}

			const pagesCount = Math.ceil(res.Paging.count / countersPageSize);
			const pageNumbers = Array.from(Array(pagesCount).keys());

			return getChunkPromises(pageNumbers, 10, (pages) => {
				console.log(pages);
				return pages
				.filter( page => page > 0) //filter out first page
				.map( page => API.getCoutersFromDBdesc(ForumOptions.postsLabel[label], page + 1,  countersPageSize) );
			});

		})
		.then( results => {
			
			const counters = results.reduce( (prev, res) => {
				return [...prev, ...res.Counters];
			}, []);

			const allCounters = [...firstPageCounters, ...counters];

			dispatch(loadingActions.loadingHide());

			posts.Keys = posts.Keys && posts.Keys.map( key => {
				key.counter = false;

				allCounters.map( counter => {
					if (parseInt(counter.Name) === key.Id){
						key.counter = counter;
					}
				});

				return key;
			});

			//console.log(posts, counters);
			dispatch(postsActions.postsAddItems({posts, counters: allCounters}));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function deletePost(postId) {

	return (dispatch, getState) => {

		const roles = getState().user.profile.roles;

		if (roles.indexOf('System') === -1){
			return false;
		}

		if (!confirm('Уверены что хотите удалить эту запись?')){
			return false;
		}

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


export function editPost(post, data) {

	return (dispatch, getState) => {

		const label = getState().posts ? getState().posts.label : 'girls';
		const pageNumber = getState().posts ? getState().posts.page : 1;

		let oldValue 

		try{
			oldValue = JSON.parse(decodeURIComponent(post.Value));
		}catch(e){
			console.error(e);
			return false;
		}
		
		const oldQuote = oldValue.quote;
		
		let oldQuoteValue;

		try{
			oldQuoteValue = oldQuote ? JSON.parse(decodeURIComponent(oldQuote.Value)) : false;
		}catch(e){
			console.error(e);
			return false;
		}

		let newQuoteValue;
		let newQuote;
		
		if (data.newQuoteMessage && oldQuote){

			newQuoteValue = {
				...oldQuoteValue, 
				...{
					message: data.newQuoteMessage
				}
			};

			newQuoteValue = encodeURIComponent(JSON.stringify(newQuoteValue));

			newQuote = {
				...oldValue.quote,
				...{Value: newQuoteValue}
			}			

		}

		if (data.newQuoteMessage === ''){
			newQuote = false;
		}


		console.log(oldQuote);
		console.log(newQuote);
	
		let newValue = {
			...oldValue, 
			...{
				message: data.newMessage,
				quote: newQuote !== undefined ? newQuote : oldQuote,
			}
		};

		console.log(oldValue);
		console.log(newValue);

		newValue = encodeURIComponent(JSON.stringify(newValue));

		const newPost = {...post, ...{Value: newValue}};

		console.log(post);
		console.log(newPost);
		//return;


		return API.addKeyToDB(newPost)
		.then( (res) => {	
			dispatch(loadingActions.loadingHide());
			
			dispatch(postsActions.postsEditOff());

			dispatch(getPosts());

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
			visual.scrollTo(document.body, 0, 0);
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

