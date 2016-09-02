import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

import Main from '../../components/main/Main';

class Index extends React.Component {

	componentWillMount(){
		const { props } = this;
		props.init();
	}

	render(){
		const { props } = this;
		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' catalog-container')}>
								
				<Main mixClass="catalog-container__catalog"  />

			</div>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	init: () => dispatch(asyncActions.init()), 
});

Index.propTypes = {
	mixClass: React.PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
