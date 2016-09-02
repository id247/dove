import React from 'react';
import { connect } from 'react-redux';

//class ForumForm extends React.Component {
//
//	render(){
//		return(
//			<div className={( (props.mixClass ? props.mixClass : '') + ' class')}>
//			</div>
//		);
//	}
//}

const ForumForm = (props) => (
	<form className={( (props.mixClass ? props.mixClass : '') + ' forum-form')}>

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

						<input type="checkbox" className="chakbox__input" />

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

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
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
