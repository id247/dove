import React from 'react';
import { connect } from 'react-redux';

import { ForumOptions }		from 'appSettings';


import Button 				from '../../components/common/Button';

import PostQuoted 			from '../../components/forum/PostQuoted';
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
			console.error('error JSON in post ' + post.Key);
			return false;
		}

		const isCompetition = props.label === 'competition';
		//console.log(value);

		const isPsyco = (value.user.id !== 0 && ForumOptions.psyhoId.indexOf(value.user.id) > -1 );
		const icanEditPost = 
							(	
								value.user.id !== 0 
								&& 
								ForumOptions.psyhoId.indexOf(props.profile.id_str) > -1 
								&&
								value.user.id === props.profile.id_str
							);

		let likesText = 'Хороший вопрос';

		if (value.quote && value.quote.Id){
			likesText = 'Хороший ответ';
		}

		if (isCompetition){
			likesText = 'Хороший совет';
		}

		//console.log(post.UserId.toString());
		//console.log(post.UserId);
		//console.log(props.profile.id_str);
		
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
					
					{
						post.Key !== props.edit
						?	
						<PostQuoted 
							mixClass="post__quote" 
							post={value.quote}
							parentPostKey={post.Key}
						/>
						: null
					}

					<div className="post__bottom">

						<PostLikes 
							counter={post.counter}
							text={likesText}
							clickHandler={this._voteHandler()}
						/>

						<PostQuoteButton 
							visible={
								!isCompetition 
								&& 
								( 
									props.profile.roles.indexOf('System') > -1 
									|| 
									ForumOptions.psyhoId.indexOf(props.profile.id_str) > -1 
								)}
							onClickHandler={this._addQuoteHandler()}
						/>
						
					</div>

				</div>

				<PostAdmin 
					mixClass="post__admin"
					isSystem={props.profile.roles.indexOf('System') > -1}
					visible={
						props.profile.roles.indexOf('System') > -1 
						|| 
						icanEditPost
					}
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
