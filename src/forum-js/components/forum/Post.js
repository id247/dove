import React from 'react';

import { ForumOptions }		from 'appSettings';

import PostMessage 			from '../../components/forum/PostMessage';
import PostInfo 			from '../../components/forum/PostInfo';
import PostDeleteButton 	from '../../components/forum/PostDeleteButton';
import PostLikes 			from '../../components/forum/PostLikes';
import PostAvatar 			from '../../components/forum/PostAvatar';
import PostQuoteButton 		from '../../components/forum/PostQuoteButton';

const Post = (props) => {

	const { post } = props;

	if (!post || Object.keys(post).length === 0 ){
		return false;
	}

	const value = JSON.parse(decodeURIComponent(post.Value));

	const date = post.CreatedDate;
	const isPsyco = (value.user.id !== 0 && ForumOptions.psyhoId.indexOf(value.user.id) > -1 );

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
						post={post}
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

				<PostMessage 
					message={value.message} 
					post={post}
				/>

				<Post 
					mixClass="post__quote" 
					post={value.quote}
					quoted={true}
				/>

				<div className="post__bottom">

					<PostLikes 
						post={post}
						text={ (value.quote && value.quote.Id) ? 'Хороший ответ' : 'Хороший вопрос'}
					/>

					<PostQuoteButton 
						post={post}
					/>

				</div>

			</div>

			<PostDeleteButton 	
				post={post}
			/>

		</li>

	)
};

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

export default Post;
