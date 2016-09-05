import React from 'react';
import { connect } from 'react-redux';


import * as asyncActions from '../actions/async';

import Loading from '../components/loading/Loading';

class App extends React.Component {

	componentWillMount(){
		const { props } = this;
		props.init();
	}

	render(){
		const { props } = this;
		return(
			<section className="container__section section forum" id="forum">	
						
				{props.children}
								
				<Loading 
					mixClass="forum__loader"
					visibleClass="loader--visible"
				/>
			</section>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	page: state.page,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	init: () => dispatch(asyncActions.init()), 
});

App.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
