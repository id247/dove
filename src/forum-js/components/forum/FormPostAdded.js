import React from 'react';

const FormPostAdded = (props) => {

	if (!props.postAdded){
		return null;
	}

	return(
		<div className="forum-form__post-added text">
			Спасибо! Ваше сообщение было отправлено!
		</div>
	);
};

FormPostAdded.propTypes = {
	mixClass: React.PropTypes.string,
	postAdded: React.PropTypes.bool.isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default FormPostAdded;
