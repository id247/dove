import React from 'react';

import PostMessage 			from '../../components/forum/PostMessage';
import PostInfo 			from '../../components/forum/PostInfo';
import PostAvatar 			from '../../components/forum/PostAvatar';

class PostQuoted extends React.Component {

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
			console.error('error JSON in post ' + (props.parentPostKey ? props.parentPostKey : 'quoted post') ) ;
			return false;
		}

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
};


PostQuoted.propTypes = {
	mixClass: React.PropTypes.string,
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

export default PostQuoted;
