
import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions 	from '../../actions/async';
import * as postsActions 	from '../../actions/posts';

class PostMessageEditor extends React.Component {

	_editPost(newMessage){
		this.props.editPost(newMessage);
	}

	_editPostHandler = () => (e) => {
		e.preventDefault();
		const value = e.target.elements.newMessage.value;
		if (!value){
			return false;
		}
		this._editPost(value);
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
		const value = JSON.parse(decodeURIComponent(post.Value));

		return(
			<form className="post__editor post-editor" action="#"
				onSubmit={this._editPostHandler()}
			>
				<textarea className="post-editor__textarea" name="newMessage" cols="30" rows="10" defaultValue={value.message} />
				
				<div className="post-editor__buttons">

					<button 
						type="button" 
						className="post-editor__button button button--blue-light button--s"
						onClick={this._cancelHandler()}
					>
						Отмена
					</button>
					
					<button type="submit" className="post-editor__button button button--blue-light button--s">Сохранить</button>

				</div>
			</form>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	editPost: (newMessage) => dispatch(asyncActions.editPost(ownProps.post, newMessage)),
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
