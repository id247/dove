import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

const PostDeleteButton = (props) => {
	if (props.profile.roles.indexOf('System') === -1){
		return false;
	}

	function deletePost(){

		if (confirm('Уверены что хотите удалить эту запись?')){
			props.deletePost();
		}
		
	}

	return(
		<button
			onClick={deletePost}
		>
			Удалить
		</button>
	);
};

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	deletePost: (postId) => dispatch(asyncActions.deletePost(ownProps.post.Key)),
});

PostDeleteButton.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDeleteButton);
