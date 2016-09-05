import React from 'react';
import { connect } from 'react-redux';

import Post from '../../components/forum/Post';

import * as postsActions from '../../actions/posts';

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
						className="post__quote-it button"
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
	quote: state.posts.quote,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	deleteQuote: () => dispatch(postsActions.deleteQuote()),
});

FormQuote.propTypes = {
	mixClass: React.PropTypes.string,
	quote: React.PropTypes.oneOfType([
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

export default connect(mapStateToProps, mapDispatchToProps)(FormQuote);
