import React from 'react';

const PostInfo = (props) => {
	const date = new Date(props.post.CreatedDate).toLocaleString('ru-RU');
	return(
		<div className="post__info">

			<span className="post__name">{props.user.firstName} {props.user.lastName} {(props.isPsyco ? '(Психолог)' : '')}</span>
			{' / '}
			<span className="post__time">{date}</span>

		</div>
	)
};

PostInfo.propTypes = {
	mixClass: React.PropTypes.string,
	user: React.PropTypes.object,
	isPsyco: React.PropTypes.bool,
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

export default PostInfo;
