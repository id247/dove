import React from 'react';

const PostAvatar = (props) => (
	<div className="post__avatar-placeholder">

		<img src={props.image} alt="" className="post__avatar" />

	</div>
);

PostAvatar.propTypes = {
	mixClass: React.PropTypes.string,
	image: React.PropTypes.string.isRequired,
	
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default PostAvatar;
