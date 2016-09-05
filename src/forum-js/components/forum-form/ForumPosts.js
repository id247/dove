import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import forumSettings from '../../settings/forum.js';

import * as asyncActions from '../../actions/async';
import * as postsActions from '../../actions/posts';

class ForumPosts extends React.Component {

	componentDidMount(){
		const { props } = this;
		props.getPosts(props.pageNumber);
		this.props.setPostsPage(1);
	}

	componentWillReceiveProps(nextProps){
		const { props } = this;
		const oldPageNumber = props.pageNumber ? parseInt(props.pageNumber) : 1;
		const newPageNumber = nextProps.pageNumber ? parseInt(nextProps.pageNumber) : 1;
		
		if (oldPageNumber !== newPageNumber){
			props.getPosts(newPageNumber);
			this.props.setPostsPage(newPageNumber);
		}
	}

	_getDeleteButton(roles, key){
		if (roles.indexOf('EduStaff') === -1){
			return false;
		}

		return(
			<button
				onClick={this._deletePostHandler(key)}
			>
				Удалить
			</button>
		);
	}

	_getQuote(post){

		if (Object.keys(post).length === 0 || !post){
			return false;
		}
		
		const value = JSON.parse(decodeURIComponent(post.Value));

		const date = value.CreatedDate;

		return (
			<div className="post__quote post post--quoted">

				<div className="post__avatar-placeholder">

					<img src={value.user.photoSmall} alt="" className="post__avatar" />

				</div>

				<div className="post__content">

					<div className="post__info">

						<span className="post__name">{value.user.firstName} {value.user.lastName}</span>
						{' '}
						<span className="post__time">{date}</span>

					</div>

					<div className="post__text">
						<p>
							{value.message}
						</p>
					</div>

				</div>

			</div>
		);
	}

	_getLikes(post){

		const counter = post.counter ? post.counter : false;

		return (
			<div className={('post__likes likes ' + (counter && counter.Liked ? 'likes--liked' : ''))}>

				<button 
					className="likes__button"
					onClick={this._voteHandler(post.Id)}
					disabled={(counter && counter.Liked)}
				>

					<span className="likes__lext">Хороший вопрос</span>
					{' '}
					<span className="likes__count">{counter ? post.counter.Value : 0}</span>

				</button>

			</div>
		);
	}


	_deletePost(postId){
		this.props.deletePost(postId);
	}

	_addQuote(post){
		this.props.addQuote(post);
		this._scrollTo(document.body, 0, 600);
	}

	_vote(keyId){
		this.props.vote(keyId);
	}



	_scrollTo(element, to, duration) {
		var start = element.scrollTop,
			change = to - start,
			increment = 20;

		function easeInOut(currentTime, start, change, duration) {
		    currentTime /= duration / 2;
		    if (currentTime < 1) {
		        return change / 2 * currentTime * currentTime + start;
		    }
		    currentTime -= 1;
		    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
		}

		var animateScroll = function(elapsedTime) {        
			elapsedTime += increment;
			var position = easeInOut(elapsedTime, start, change, duration);                        
			element.scrollTop = position; 
			if (elapsedTime < duration) {
				setTimeout(function() {
					animateScroll(elapsedTime);
				}, increment);
			}
		};

		animateScroll(0);
	}


// nandlers

	_deletePostHandler = (postId) => (e) => {
		e.preventDefault();

		this._deletePost(postId);
	}

	_addQuoteHandler = (post) => (e) => {
		e.preventDefault();

		this._addQuote(post);
	}


	_voteHandler = (keyId) => (e) => {
		e.preventDefault();

		this._vote(keyId);
	}

	render(){
		const { props } = this;

		if (!props.profile.roles){
			return null;
		}

		const pagesCount = Math.ceil(props.postsTotalCount / forumSettings.pageSize);

		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' posts')}>

				<ul className="posts__list">

					{props.posts.map( (post,i) => {

						const value = JSON.parse(decodeURIComponent(post.Value));

						const date = post.CreatedDate;

						const quote = this._getQuote(value.quote);
						const deleteIt = this._getDeleteButton(props.profile.roles, post.Key);

						return (

							<li className={('posts__item post ' + (value.user.id === forumSettings.psyhoId ? 'post--super' : '') )} key={i}>

								<div className="post__avatar-placeholder">

									<img src={value.user.photoSmall} alt="" className="post__avatar" />

								</div>

								<div className="post__content">

									<div className="post__info">

										<span className="post__name">{value.user.firstName} {value.user.lastName}</span>
										{' '}
										<span className="post__time">{date}</span>

									</div>

									<div className="post__text">
										<p>
											{value.message}
										</p>
									</div>

									{quote}

									<div className="post__bottom">

										{this._getLikes(post)}

										<div className="post__quote-it-placeholder">

											<button
												className="post__quote-it button"
												onClick={this._addQuoteHandler(post)}
											>
												Ответить
											</button>

										</div>

									</div>

								</div>

								{deleteIt}

							</li>

						)
					})}

				</ul>

				<div className="posts__pagination pagination">

					<ul className="pagination__list">

						{[,...Array(pagesCount)].map( (value, i)  => {

							let link = '/page/' + (i);

							if (i === 1){
								link = '';
							}

							return (

							<li className="pagination__item" key={i}>

								<Link
									to={link}
									activeClassName="active"
									onlyActiveOnIndex={(i === 1)}
								>
									{i}
								</Link>

							</li>

							);
						})}

					</ul>

				</div>

			</div>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	posts: state.posts.list,
	postsTotalCount: state.posts.itemsTotalCount,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	deletePost: (postId) => dispatch(asyncActions.deletePost(postId)),
	getPosts: (pageNumber) => dispatch(asyncActions.getPosts(pageNumber)),
	vote: (keyId) => dispatch(asyncActions.vote(keyId)),
	addQuote: (quote) => dispatch(postsActions.addQuote(quote)),
	setPostsPage: (pageId) => dispatch(postsActions.setPage(pageId)),
});

ForumPosts.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumPosts);
