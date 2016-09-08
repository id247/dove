import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';
import * as postsActions from '../../actions/posts';

import Form from '../../components/forum/Form';
import Posts from '../../components/forum/Posts';
import User from '../../components/forum/User';

class Main extends React.Component {

	render(){
		const { props } = this;
		if (!props.profile){
			return null;
		}
		return(
			<div className="section__wrap forum__wrap">
				<User mixClass="forum__user" />
				<Form mixClass="forum__form" />
				<Posts mixClass="forum__posts" pageNumber={props.params.pageNumber} />
			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	init: () => dispatch(asyncActions.init()), 
	setPage: (pageId) => dispatch(asyncActions.setPage(pageId)),
	setPostsPage: (pageId) => dispatch(postsActions.setPage(pageId)),
	setPostsLabel: (label) => dispatch(postsActions.setPostsLabel(label)),
});

Main.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
