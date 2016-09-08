import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import FormQuote 		from '../../components/forum/FormQuote';
import FormPostAdded 	from '../../components/forum/FormPostAdded';
import FormAnon 		from '../../components/forum/FormAnon';

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

	_deleteQuoteHandler = () => (e) => {
		this.props.deleteQuote();
	}

	render(){
		const { props } = this;

		const isCompetition = props.label === 'competition';

		return(
			<form 
				className={( (props.mixClass ? props.mixClass : '') + ' forum-form')}
				onSubmit={this._submitFormHandler()}
				method="post"
				action="#"
				ref="form"
			>

				<h1 className="forum-form__title">
					{(!isCompetition ? 'Задайте свой вопрос психологу' : 'Отправьте свой совет на конкурс')}
				</h1>

				<div className="forum-form__textarea-placeholder">

					<textarea 
						name="message" 
						cols="30" 
						rows={(!isCompetition ? 7 : 20)}
						className="forum-form__textarea"
						placeholder={(!isCompetition ? 'Опишите вашу проблему' : '')}
						value={props.forumForm.message}
						onChange={this._messageChangeHandler()}
					/>

				</div>

				<FormPostAdded 
					postAdded={props.forumForm.postAdded}
				/>

				<FormQuote 
					quote={props.quote}
					deleteQuoteHandler={this._deleteQuoteHandler()}
				/>

				<div className="forum-form__bottom">

					<div className="forum-form__action-placeholder">

						<Button 
							type="submit" 
							mixClass="forum-form__button"
							size="l"
							color="blue-dark"
						>
							Отправить
						</Button>
						
					</div>

					{(
						!isCompetition 
						? 	<FormAnon 
								checked={props.forumForm.anon}
								onChangeHandler={this._anonChangeHandler()}
							/>
						: null
					)}

					

				</div>

			</form>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user,
	quote: state.posts.quote,
	forumForm: state.forumForm,
	label: state.posts.label,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	formChange: (data) => dispatch(forumFormActions.formChange(data)),	
	forumFormSubmit: () => dispatch(asyncActions.forumFormSubmit()),	
	deleteQuote: () => dispatch(forumFormActions.deleteQuote()),
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
