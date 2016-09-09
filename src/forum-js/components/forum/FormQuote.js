import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import PostQuoted from '../../components/forum/PostQuoted';

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

					<Button
						mixClass="forum-form-quote__button"
						color="blue-light"
						size="s"
						onClickHandler={props.deleteQuote}
					>
						&times; Отменить цитирование
					</Button>

				</div>

			</div>

			<PostQuoted 
				mixClass="forum-form-quote__post" 
				post={props.quote}
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
