import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

const Pagination = (props) => (
	<div className={( (props.mixClass ? props.mixClass : '') + ' pagination')}>

		<ul className="pagination__list">

			{props.pagesCount > 1 && [,...Array(props.pagesCount)].map( (value, i)  => {

				let link = '/page/' + (i);

				if (i === 1){
					link = '';
				}

				return (

				<li className="pagination__item" key={i}>

					<Link
						to={link}
						activeClassName="active"
						onlyActiveOnIndex={(i === 1)}
						onClick={ (e) => {
							const pageId = i;
							props.setPostsPage(pageId);
						}}
					>
						{i}
					</Link>

				</li>

				);
			})}

		</ul>

	</div>
);

const mapStateToProps = (state, ownProps) => ({
	quote: state.posts.quote,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setPostsPage: (pageId) => dispatch(asyncActions.setPage(pageId)),
});

Pagination.propTypes = {
	mixClass: React.PropTypes.string,
	pagesCount: React.PropTypes.number.isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
