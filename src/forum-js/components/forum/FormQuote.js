import React from 'react';
import { connect } from 'react-redux';

import Post from '../../components/forum/Post';

import * as forumFormActions from '../../actions/forum-form';

const FormQuote = (props) => {
	if (!props.quote){
		return false;
	}

	return (
		<div className="forum-form__quote forum-form-quote">

			<div className="forum-form-quote__top">

				<div className="forum-form-quote__title">
					Цитата:
				</div>

				<div className="forum-form-quote__delete-placeholder">

					<button
						className="forum-form-quote__button button button--s button--blue-light"
						onClick={props.deleteQuote}
					>
						&times; Отменить цитирование
					</button>

				</div>

			</div>

			<Post 
				mixClass="forum-form-quote__post" 
				post={props.quote}
				quoted={true}
			/>
			
		</div>
	)
};

const mapStateToProps = (state, ownProps) => ({
	quote: state.forumForm.quote,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	deleteQuote: () => dispatch(forumFormActions.deleteQuote()),
});

FormQuote.propTypes = {
//	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormQuote);
