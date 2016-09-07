import React from 'react';

const PostQuoteButton = (props) => {
	
	if (!props.visible){
		return null;
	}

	return(
		<div className="post__quote-it-placeholder">

			<button
				className="post__quote-it button button--s button--blue-light"
				onClick={props.clickHandler}
			>
				Ответить
			</button>

		</div>
	)
};

PostQuoteButton.propTypes = {
	mixClass: React.PropTypes.string,
	clickHandler: React.PropTypes.func.isRequired,
    visible: React.PropTypes.bool.isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default PostQuoteButton;
