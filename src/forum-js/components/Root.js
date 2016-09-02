import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import * as asyncActions from '../actions/async';

import Loading from '../components/loading/Loading';
import Router from '../components/Router';

class Root extends React.Component {
	
	componentWillMount(){
		const { props } = this;
		props.init();
	}

	render() {		
		return (
			<Provider store={this.props.store}>
				<section className="container__section section forum" id="forum">
					<Router index="index" />
					<Loading 
						mixClass="forum__loader"
						visibleClass="loader--visible"
					/>
				</section>
			</Provider>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	page: state.page,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	init: () => dispatch(asyncActions.init()), 
});


export default connect(mapStateToProps, mapDispatchToProps)(Root);

