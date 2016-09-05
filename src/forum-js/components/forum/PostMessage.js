import React from 'react';

const PostMessage = (props) => (
	<div className="post__text text">			
		{props.message.split('\n').map( (item, i) => (
			<p key={props.post.Id + '-' + i + new Date().getTime()}>
				{item}
			</p>
		))}
	</div>
);

PostMessage.propTypes = {
	mixClass: React.PropTypes.string,
	message: React.PropTypes.string,
	post: React.PropTypes.oneOfType([
    	React.PropTypes.bool,
    	React.PropTypes.object,
    ]).isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default PostMessage;
