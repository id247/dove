import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class Login extends React.Component {

	componentWillMount(){
		const { props } = this;		
		if (props.profile){
			props.redirect();
		}
	}

	render(){

		const { props } = this;
		
		const isCompetition = window.location.href.indexOf('competition') > -1;

		return (
			<div className={( (props.mixClass ? props.mixClass : '') + ' forum-login')}>

				<h1 className="section__title forum-login__title">
					{(!isCompetition ? 'Задайте свой вопрос психологу' : 'Отправьте свой совет на конкурс')}
				</h1>

				<div className="forum-login__button-placeholder">

					<Button 
						size="m"
						color="blue-dark"
						type="button"
						onClickHandler={props.login}
					>
						Войти через Дневник.ру
					</Button>
				
				</div>

			</div>
		);
	}
}

Login.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	label: state.posts.label,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	login: () => dispatch(asyncActions.login()),
	init: () => dispatch(asyncActions.init()), 
	redirect: () => dispatch(pageActions.setPageWithoutHistory('/')), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
