import React from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import * as asyncActions from '../actions/async';

import Loading from '../components/loading/Loading';
import Login from '../components/pages/Login';
import Main from '../components/main/Main';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<Route path="page/:pageNumber" component={Main} />
		</Route>
		<Route path="/login" component={Login} />
	</Router>
);

class Root extends React.Component {
	
	componentWillMount(){
		const { props } = this;
		props.init();
	}

	render() {		
		return (
			<Provider store={this.props.store}>		
				<section className="container__section section forum" id="forum">		
					
					{routes}
					
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

