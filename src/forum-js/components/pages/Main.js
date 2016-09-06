import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';
import * as postsActions from '../../actions/posts';

import Form from '../../components/forum/Form';
import Posts from '../../components/forum/Posts';

class Main extends React.Component {

	componentDidMount(){
		const { props } = this;
		const pageNumber = props.params.pageNumber ? parseInt(props.params.pageNumber) : 1;
		this.props.setPostsPage(pageNumber);

		if (window.location.href.indexOf('mothers') > -1){
			this.props.setPostsLabel('mothers');
		}else{
			this.props.setPostsLabel('girls');
		}	

		props.init();
	}

	render(){
		const { props } = this;
		return(
			<div className="section__wrap forum__wrap">
				<Form mixClass="forum__form" />
				<Posts mixClass="forum__posts" pageNumber={props.params.pageNumber} />
			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	init: () => dispatch(asyncActions.init()), 
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
