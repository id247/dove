import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

class ForumPosts extends React.Component {

	_deletePost(postId){
		console.log(postId);

		this.props.deletePost(postId);
	}

	_deletePostHandler = (postId) => (e) => {
		e.preventDefault();

		this._deletePost(postId)
	}

	render(){
		const { props } = this;

		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' posts')}>

				<ul className="posts__list">

					{props.posts && props.posts.map( (post,i) => {

						const value = JSON.parse(decodeURIComponent(post.Value));

						const date = post.CreatedDate;

						let deleteIt;

						//if (props.profile.roles.indexOf('EduStaff') > -1){
							deleteIt = (
								<button
									onClick={this._deletePostHandler(post.Key)}
								>Удалить</button>
							);
						//} 

						console.log(post, value);

						return (
						
							<li className={('posts__item post ' + (value.user.id === '1000001035607' ? 'post--super' : '') )} key={i}>

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

									<div className="post__bottom">

										<div className="post__likes likes">

											<button className="likes__button">

												<span className="likes__lext">Хороший вопрос</span>
												{' '}
												<span className="likes__count">12</span>

											</button>

										</div>

										<div className="post__quote-it-placeholder">

											<button className="post__quote-it button">Ответить</button>

										</div>

									</div>

								</div>

								{deleteIt}

							</li>
						
						)
					})}

				</ul>

			</div>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	posts: state.posts.Keys,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	deletePost: (postId) => dispatch(asyncActions.deletePost(postId)),
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
