import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';
import * as postsActions from '../../actions/posts';

class ForumForm extends React.Component {

	_getQuote(post){

		console.log(post);

		if (!post){
			return false;
		}

		const value = JSON.parse(decodeURIComponent(post.Value));
		const date = post.CreatedDate;

		return (

			<div className="forum-form__quote forum-form-quote">

				<div className="forum-form-quote__title">
					Цитата:
				</div>
				
				<div className="forum-form-quote__post post post--quoted">

					<div className="post__avatar-placeholder">

						<img src={value.user.photoSmall} alt="" className="post__avatar" />

					</div>

					<div className="post__content">

						<div className="post__info">

							<span className="post__name">{value.user.firstName} {value.user.lastName}</span>
							{' '}
							<span className="post__time">{date}</span>

						</div>

						<div className="post__text">
							<p>
								{value.message}
							</p>
						</div>

					</div>

				</div>

				<div className="forum-form-quote__delete-placeholder">

					<button
						className="post__quote-it button"
						onClick={this._deleteQuoteHandler()}
					>
						Отменить цитирование
					</button>

				</div>
				
			</div>

		);
	}

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
			quote: this.props.quote
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



	_deleteQuote(){
		this.props.deleteQuote();
	}

	_deleteQuoteHandler = () => (e) => {
		e.preventDefault();

		this._deleteQuote();
	}

	_submitFormHandler = () => (e) => {
		e.preventDefault();
		this._submitForm(e.target);
	}

	render(){
		const { props } = this;

		const quote = this._getQuote(props.quote);

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

				{quote}


				<div className="forum-form__bottom">

					<div className="forum-form__action-placeholder">

						<button type="submit" className="forum-form__button button button--blue-dark button--l">Отправить</button>

					</div>

					<div className="forum-form__action-placeholder forum-anon">

						<div className="forum-anon__checkbox">

							<label className="checkbox">

								<input type="checkbox" name="anon" value="true" className="checkbox__input" />

								<span className="checkbox__text">Отправить анонимно</span>

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
	quote: state.posts.quote,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	addPost: (data) => dispatch(asyncActions.addPost(data)),
	deleteQuote: (quote) => dispatch(postsActions.deleteQuote(quote)),
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
