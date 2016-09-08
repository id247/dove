import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import * as asyncActions from '../actions/async';

import App 				from '../components/App';
import Loading 			from '../components/loading/Loading';
import ErrorMessage 	from '../components/error/ErrorMessage';
import Login 			from '../components/pages/Login';
import Main 			from '../components/pages/Main';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Main} />
			<Route path="page/:pageNumber" component={Main} />
		</Route>
		<Route path="/login" component={Login} />
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

