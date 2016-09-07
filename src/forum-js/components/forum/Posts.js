import React from 'react';
import { connect } from 'react-redux';

import { ForumOptions } from 'appSettings';

import Post from '../../components/forum/Post';
import Pagination from '../../components/forum/Pagination';

import * as asyncActions from '../../actions/async';

class Posts extends React.Component {

	componentWillMount(){
		const { props } = this;
		props.getPosts();
	}

	componentWillReceiveProps(nextProps){

		const { props } = this;
		const oldPageNumber = props.pageNumber ? parseInt(props.pageNumber) : 1;
		const newPageNumber = nextProps.pageNumber ? parseInt(nextProps.pageNumber) : 1;

		if (oldPageNumber !== newPageNumber){
			props.setPage(newPageNumber);
			props.getPosts();
		}
	}

	render(){
		const { props } = this;

		if (!props.profile.roles){
			return null;
		}

		const pagesCount = Math.ceil(props.postsTotalCount / ForumOptions.pageSize);

		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' posts')}>

				<ul className="posts__list">

					{props.posts.map( (post,i) => (

						<Post 
							mixClass="posts__item"
							post={post}
							label={props.label}
							key={'post' + post.Id}
						/>

					))}

				</ul>

				<Pagination
					mixClass="posts__pagination"
					pagesCount={pagesCount}
				/>

			</div>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	posts: state.posts.list,
	postsTotalCount: state.posts.itemsTotalCount,
	label: state.posts.label,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setPage: (pageId) => dispatch(asyncActions.setPage(pageId)),
	getPosts: () => dispatch(asyncActions.getPosts()),
});

Posts.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
