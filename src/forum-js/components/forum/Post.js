import React from 'react';
import { connect } from 'react-redux';

import { ForumOptions }		from 'appSettings';

import PostMessage 			from '../../components/forum/PostMessage';
import PostInfo 			from '../../components/forum/PostInfo';
import AdminButton 			from '../../components/forum/AdminButton';
import PostLikes 			from '../../components/forum/PostLikes';
import PostAvatar 			from '../../components/forum/PostAvatar';
import PostQuoteButton 		from '../../components/forum/PostQuoteButton';
import PostMessageEditor 	from '../../components/forum/PostMessageEditor';

import * as asyncActions 	from '../../actions/async';
import * as postsActions 	from '../../actions/posts';

class Post extends React.Component {

	_deletePostHandler = () => (e) =>{
		e.preventDefault();	
		this.props.deletePost();	
	}


	_editPostHandler = () => (e) =>{
		e.preventDefault();	
		this.props.etitPostOn();	
	}

	_addQuoteHandler = () => (e) =>{
		e.preventDefault();	
		this.props.addQuote();	
	}

	_voteHandler = () => (e) =>{
		e.preventDefault();	
		this.props.vote();	
	}

	render(){
		const { props } = this;
		const { post } = props;

		if (!post || Object.keys(post).length === 0 ){
			return false;
		}
		const value = JSON.parse(decodeURIComponent(post.Value));

		const isCompetition = props.label === 'competition';


		const isPsyco = (value.user.id !== 0 && ForumOptions.psyhoId.indexOf(value.user.id) > -1 );

		let likesText = 'Хороший вопрос';

		if (value.quote && value.quote.Id){
			likesText = 'Хороший ответ';
		}

		if (isCompetition){
			likesText = 'Хороший совет';
		}

		if (props.quoted === true){
			return (
				<div className={( (props.mixClass ? props.mixClass : '') + ' post post--quoted')}>

					<PostAvatar 
						image={value.user.photoSmall}
					/>

					<div className="post__content">

						<PostInfo 
							post={post}
							user={value.user}
						/>

						<PostMessage 
							message={value.message} 
							postId={post.Id}
						/>

					</div>

				</div>
			)
		}
		
		return (

			<li className={( (props.mixClass ? props.mixClass : '') + ' post ' + (isPsyco ? 'post--super' : '') )} key={'post' + post.Id}>

				<PostAvatar 
					image={value.user.photoSmall}
				/>

				<div className="post__content">

					<PostInfo 
						post={post}
						user={value.user}
						isPsyco={isPsyco}
					/>

					{
						post.Key !== props.edit
						?	<PostMessage 
								message={value.message} 
								postId={post.Id}
							/>
						: 	<PostMessageEditor
								post={post}
							/>
					}
					

					<Post 
						mixClass="post__quote" 
						post={value.quote}
						quoted={true}
					/>

					<div className="post__bottom">

						<PostLikes 
							counter={post.counter}
							text={likesText}
							clickHandler={this._voteHandler()}
						/>

						<PostQuoteButton 
							post={post}
							visible={!isCompetition}
							clickHandler={this._addQuoteHandler()}
						/>
						
					</div>

				</div>

				{ 
					(props.profile.roles.indexOf('System') > -1)
					? (
						<div className="post__admin">

							<AdminButton 
								text="Удалить"
								clickHandler={this._deletePostHandler()}
							/>

							<AdminButton 	
								text="Редактировать"
								clickHandler={this._editPostHandler()}
							/>

						</div>
					)
					: null
				}

			</li>

		)
	}
};


const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	edit: state.posts.edit,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	deletePost: () => dispatch(asyncActions.deletePost(ownProps.post.Key)),
	etitPostOn: () => dispatch(postsActions.postsEditOn(ownProps.post.Key)),
	addQuote: () => dispatch(asyncActions.addQuote(ownProps.post)),
	vote: () => dispatch(asyncActions.vote(ownProps.post.Id)),
});

Post.propTypes = {
	mixClass: React.PropTypes.string,
	quoted: React.PropTypes.bool,
	post: React.PropTypes.oneOfType([
    	React.PropTypes.bool,
    	React.PropTypes.object,
    ]),
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
