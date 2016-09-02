import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

class ForumForm extends React.Component {

	_submitForm(form){

		const message = form.elements.message.value;
		const anon = form.elements.anon.checked;
		const { profile } = this.props.user;

		let user;

		if (message.length === 0){
			return false;
		}

		if (!anon){
			user = {
				id: profile.id_str,
				firstName: profile.firstName,
				lastName: profile.lastName,
				roles: profile.roles,
				photoSmall: profile.photoMedium,
			}
		}else{
			user = {
				id: 0,
				firstName: 'Аноним',
				lastName: '',
				roles: [],
				photoSmall: 'https://static.dnevnik.ru/images/avatars/user/a.m.jpg',
			}			
		}

		let value = {
			user: user,
			message: message,
			quote: {}
		}

		value = encodeURIComponent(JSON.stringify(value));

		let data = {
			label: 'posts-test-1',
			key: 'post-' + new Date().getTime(),
			value: value,
			permissionLevel: 'Public',
		}

		this.props.addPost(data);
	}

	_submitFormHandler = () => (e) => {
		e.preventDefault();
		this._submitForm(e.target);
	}

	render(){
		const { props } = this;

		return(
			<form 
				className={( (props.mixClass ? props.mixClass : '') + ' forum-form')}
				onSubmit={this._submitFormHandler()}
				method="post"
				action="#"
			>

				<h1 className="forum-form__title">
					Задайте свой вопрос психологу
				</h1>

				<div className="forum-form__textarea-placeholder">

					<textarea name="message" cols="30" rows="10"
					className="forum-form__textarea"
					placeholder="Опишите вашу проблему"
					></textarea>

				</div>

				<div className="forum-form__bottom">

					<div className="forum-form__action-placeholder">

						<button type="submit" className="forum-form__button button button--blue-dark button--l">Отправить</button>

					</div>

					<div className="forum-form__action-placeholder forum-anon">

						<div className="forum-anon__checkbox">

							<label className="checkbox">

								<input type="checkbox" name="anon" value="true" className="checkbox__input" />

								<span className="checkbox__text">Спросить анонимно</span>

							</label>

						</div>

						<div className="forum-anon__text">
							Твое имя и аватар не будут видны никому
						</div>

					</div>

				</div>

			</form>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	addPost: (data) => dispatch(asyncActions.addPost(data)),
});

ForumForm.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumForm);
