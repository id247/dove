import React from 'react';

const AdminButton = (props) => (
	<button
		onClick={props.clickHandler}
	>
		{props.text}
	</button>
);


AdminButton.propTypes = {
	clickHandler: React.PropTypes.func.isRequired,
	text: React.PropTypes.string.isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default AdminButton;
