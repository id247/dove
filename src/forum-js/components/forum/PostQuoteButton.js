import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

const ComponentName = (props) => (
	<div className="post__quote-it-placeholder">

		<button
			className="post__quote-it button"
			onClick={props.addQuote}
		>
			Ответить
		</button>

	</div>
);

const mapStateToProps = null;

const mapDispatchToProps = (dispatch, ownProps) => ({
	addQuote: () => dispatch(asyncActions.addQuote(ownProps.post)),
});

ComponentName.propTypes = {
	mixClass: React.PropTypes.string,
	post: React.PropTypes.oneOfType([
    	React.PropTypes.bool,
    	React.PropTypes.object,
    ]).isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentName);
