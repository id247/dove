import React from 'react';
import { connect } from 'react-redux';

import { ForumOptions }		from 'appSettings';


import Button 				from '../../components/common/Button';

import PostMessage 			from '../../components/forum/PostMessage';
import PostInfo 			from '../../components/forum/PostInfo';
import PostLikes 			from '../../components/forum/PostLikes';
import PostAvatar 			from '../../components/forum/PostAvatar';
import PostQuoteButton 		from '../../components/forum/PostQuoteButton';
import PostMessageEditor 	from '../../components/forum/PostMessageEditor';
import PostAdmin 			from '../../components/forum/PostAdmin';

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
		let value;

		try{
			value = JSON.parse(decodeURIComponent(post.Value));
		}catch(e){
			console.error(e);
			console.error('error JSON in post ' + (props.parentPostKey ? props.parentPostKey : post.Key)) ;
			return false;
		}

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
						parentPostKey={post.Key}
					/>

					<div className="post__bottom">

						<PostLikes 
							counter={post.counter}
							text={likesText}
							clickHandler={this._voteHandler()}
						/>

						<PostQuoteButton 
							visible={!isCompetition}
							onClickHandler={this._addQuoteHandler()}
						/>
						
					</div>

				</div>

				<PostAdmin 
					mixClass="post__admin"
					visible={props.profile.roles.indexOf('System') > -1}
					deletePostHandler={this._deletePostHandler()}
					editPostHandler={this._editPostHandler()}
				/>

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
	parentPostKey: React.PropTypes.string,
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
