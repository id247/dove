import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';

const Login = (props) => (
	<div className={( (props.mixClass ? props.mixClass : '') + ' forum-login')}>

		<h1 className="section__title forum-login__title">
			Задайте свой вопрос психологу
		</h1>

		<div className="section__text forum-login__text text" style={{display: 'none'}}>
			
			<p>
				Нужно оформить
			</p>

		</div>

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

Login.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	login: () => dispatch(asyncActions.login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
