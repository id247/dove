import React from 'react';
import { connect } from 'react-redux';

import FormQuote 		from '../../components/forum/FormQuote';
import FormPostAdded 	from '../../components/forum/FormPostAdded';

import * as asyncActions 		from '../../actions/async';
import * as forumFormActions 	from '../../actions/forum-form';


class Form extends React.Component {

	_submitForm(form){

		if (!this._formValidate()){
			return false;
		}

		this.props.forumFormSubmit();
	}

	_formValidate(){
		const formMessageTextarea = this.refs.form.elements.message;

		if (formMessageTextarea.value.length === 0){
			formMessageTextarea.classList.add('error');
			return false;
		}else{
			formMessageTextarea.classList.remove('error');
		}
		return true;
	}

	_forumFormChange(data){
		this.props.formChange(data);
	}

	_submitFormHandler = () => (e) => {
		e.preventDefault();
		this._submitForm(e.target);
	}

	_messageChangeHandler = () => (e) => {
		const data = {...this.props.forumForm, ...{message: e.target.value}}
		this._forumFormChange(data);
		this._formValidate();
	}

	_anonChangeHandler = () => (e) => {
		const data = {...this.props.forumForm, ...{anon: e.target.checked}}
		this._forumFormChange(data);
	}

	render(){
		const { props } = this;

		return(
			<form 
				className={( (props.mixClass ? props.mixClass : '') + ' forum-form')}
				onSubmit={this._submitFormHandler()}
				method="post"
				action="#"
				ref="form"
			>

				<h1 className="forum-form__title">
					Задайте свой вопрос психологу
				</h1>

				<div className="forum-form__textarea-placeholder">

					<textarea 
						name="message" 
						cols="30" 
						rows="10"
						className="forum-form__textarea"
						placeholder="Опишите вашу проблему"
						value={props.forumForm.message}
						onChange={this._messageChangeHandler()}
					/>

				</div>

				<FormPostAdded 
					postAdded={props.forumForm.postAdded}
				/>

				<FormQuote />


				<div className="forum-form__bottom">

					<div className="forum-form__action-placeholder">

						<button type="submit" className="forum-form__button button button--blue-dark button--l">Отправить</button>

					</div>

					<div className="forum-form__action-placeholder forum-anon">

						<div className="forum-anon__checkbox">

							<label className="checkbox">

								<input 
									type="checkbox" 
									name="anon" 
									value="true" 
									className="checkbox__input" 
									checked={props.forumForm.anon}
									onChange={this._anonChangeHandler()}
								/>

								<span className="checkbox__text">Отправить анонимно</span>

							</label>

						</div>

						<div className="forum-anon__text">
							Имя и аватар не будут видны никому
						</div>

					</div>

				</div>

			</form>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user,
	quote: state.posts.quote,
	forumForm: state.forumForm,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	formChange: (data) => dispatch(forumFormActions.formChange(data)),	
	forumFormSubmit: () => dispatch(asyncActions.forumFormSubmit()),	
});

Form.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
