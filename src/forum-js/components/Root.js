import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import * as asyncActions from '../actions/async';

import Loading 			from '../components/loading/Loading';
import ErrorMessage 	from '../components/error/ErrorMessage';
import Login 			from '../components/pages/Login';
import Logout 			from '../components/pages/Logout';
import Main 			from '../components/pages/Main';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<Route path="page/:pageNumber" component={Main} />
		</Route>
		<Route path="/login" component={Login} />
		<Route path="/logout" component={Logout} />
	</Router>
);

class Root extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>		
				<section className="container__section section forum" id="forum">		
					
					{routes}
					
					<Loading 
						mixClass="forum__loader"
						visibleClass="loader--visible"
					/>
					
					<ErrorMessage 
						mixClass="forum__error"
					/>
				</section>
			</Provider>
		);
	}
}

export default Root;

