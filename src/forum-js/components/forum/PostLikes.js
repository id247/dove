import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

const PostLikes = (props) => {

	const counter = props.post.counter ? props.post.counter : false;

	return (
		<div className={('post__likes likes ' + (counter && counter.Liked ? 'likes--liked' : ''))}>

			<button 
				className="likes__button"
				onClick={props.vote}
				disabled={(counter && counter.Liked)}
			>

				<span className="likes__lext">{props.text}</span>
				{' '}
				<span className="likes__count">{counter ? props.post.counter.Value : 0}</span>

			</button>

		</div>
	);
};

const mapStateToProps = null;

const mapDispatchToProps = (dispatch, ownProps) => ({
	vote: () => dispatch(asyncActions.vote(ownProps.post.Id)),
});

PostLikes.propTypes = {
	mixClass: React.PropTypes.string,
	post: React.PropTypes.object.isRequired,
	text: React.PropTypes.string.isRequired,
	
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostLikes);
