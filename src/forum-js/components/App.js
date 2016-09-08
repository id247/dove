import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../actions/async';
import * as postsActions from '../actions/posts';

class App extends React.Component {

	componentWillMount(){
		const { props } = this;
		const pageNumber = props.params.pageNumber ? parseInt(props.params.pageNumber) : 1;
		//this.props.setPostsPage(pageNumber);
		this.props.setPage(pageNumber);

		if (window.location.href.indexOf('forum-mothers') > -1){
			this.props.setPostsLabel('mothers');
		}else if ((window.location.href.indexOf('forum-girls') > -1)){
			this.props.setPostsLabel('girls');
		}else if ((window.location.href.indexOf('competition') > -1)){
			this.props.setPostsLabel('competition');
		}	
		
		props.init();
	}

	render(){
		const { props } = this;
		return props.children;
	}
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch, ownProps) => ({
	init: () => dispatch(asyncActions.init()), 
	setPage: (pageId) => dispatch(asyncActions.setPage(pageId)),
	setPostsPage: (pageId) => dispatch(postsActions.setPage(pageId)),
	setPostsLabel: (label) => dispatch(postsActions.setPostsLabel(label)),
});

App.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
