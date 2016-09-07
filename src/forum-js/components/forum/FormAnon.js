import React from 'react';

const FormAnon = (props) => (
		<div className="forum-form__action-placeholder forum-anon">

			<div className="forum-anon__checkbox">

				<label className="checkbox">

					<input 
						type="checkbox" 
						name="anon" 
						value="true" 
						className="checkbox__input" 
						checked={props.checked}
						onChange={props.onChangeHandler}
					/>

					<span className="checkbox__text">Отправить анонимно</span>

				</label>

			</div>

			<div className="forum-anon__text">
				Имя и аватар не будут видны никому
			</div>

		</div>
);

FormAnon.propTypes = {
	mixClass: React.PropTypes.string,
	checked: React.PropTypes.bool.isRequired,
	onChangeHandler: React.PropTypes.func.isRequired,
	
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default FormAnon;
