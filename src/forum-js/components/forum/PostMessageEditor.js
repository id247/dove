
import React from 'react';
import { connect } from 'react-redux';

import Button 				from '../../components/common/Button';

import * as asyncActions 	from '../../actions/async';
import * as postsActions 	from '../../actions/posts';

class PostMessageEditor extends React.Component {


	_editPostHandler = () => (e) => {
		e.preventDefault();

		const newMessage = e.target.elements.newMessage ? e.target.elements.newMessage.value : false;
		const newQuoteMessage = e.target.elements.newQuoteMessage ? e.target.elements.newQuoteMessage.value : '';

		if (!newMessage){
			return false;
		}

		const data = {
			newMessage,
			newQuoteMessage,
		}

		this.props.editPost(data);
	}

	_cancelHandler = () => (e) => {
		e.preventDefault();
		this.props.postsEditOff();
	}

	render(){
		const { props } = this;
		const { post } = props;
		
		if (!post || Object.keys(post).length === 0 ){
			return false;
		}

		let value;
		let quoteValue;

		try {
			value = JSON.parse(decodeURIComponent(post.Value));
		}catch(e){
			console.error(e);
			console.error('error JSON in post ' + post.Key);
			return (<div>error JSON in post {post.Key}</div>);
		}

		try {
			quoteValue = value.quote ? JSON.parse(decodeURIComponent(value.quote.Value)) : false;
		}catch(e){
			console.error(e);
			console.error('error JSON in post quote ' + post.Key);
			return (<div>error JSON in post {post.Key}</div>);
		}

		console.log(value);
		console.log(quoteValue);

		return(
			<form className="post__editor post-editor" action="#"
				onSubmit={this._editPostHandler()}
			>
				
				<div className="post-editor__row">

					<div className="post-editor__title">
						Текст сообщения
					</div>
				
					<textarea 
						className="post-editor__textarea" 
						name="newMessage" cols="30" rows="10" 
						defaultValue={value.message} 
					/>

				</div>

				{
					quoteValue
					? (
						<div className="post-editor__row">

							<div className="post-editor__title">
								Текст цитаты
							</div>
						
							<textarea 
								className="post-editor__textarea" 
								name="newQuoteMessage" cols="30" rows="10" 
								defaultValue={quoteValue.message} 
							/>

						</div>
					)
					: null
				}
				
				
				<div className="post-editor__buttons">

					<Button 
						type="button" 
						mixClass="post-editor__button" 
						color="blue-light"
						size="s"
						onClickHandler={this._cancelHandler()}
					>
						Отмена
					</Button>

					<Button 
						type="submit" 
						mixClass="post-editor__button" 
						color="blue-light"
						size="s"
					>
						Сохранить
					</Button>
										
				</div>
			</form>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	editPost: (data) => dispatch(asyncActions.editPost(ownProps.post, data)),
	postsEditOff: () => dispatch(postsActions.postsEditOff()),
});

PostMessageEditor.propTypes = {
	post: React.PropTypes.oneOfType([
    	React.PropTypes.bool,
    	React.PropTypes.object,
    ]).isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostMessageEditor);
