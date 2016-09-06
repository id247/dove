import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

class Logout extends React.Component {

	componentWillMount(){
		const { props } = this;
		props.logout();
	}

	render(){
		const { props } = this;
		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' forum-login')}>

				<h1 className="section__title forum-login__title">
					Выход...
				</h1>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	logout: () => dispatch(asyncActions.logout()), 
});

Logout.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
