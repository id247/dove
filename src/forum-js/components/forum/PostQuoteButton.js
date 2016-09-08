import React from 'react';

import Button from '../../components/common/Button';

const PostQuoteButton = (props) => {
	
	if (!props.visible){
		return null;
	}

	return(
		<div className="post__quote-it-placeholder">

			<Button
				mixClass="post__quote-it"
				color="blue-light"
				size="s"
				onClickHandler={props.onClickHandler}
			>
				Ответить
			</Button>

		</div>
	)
};

PostQuoteButton.propTypes = {
	mixClass: React.PropTypes.string,
	onClickHandler: React.PropTypes.func.isRequired,
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
