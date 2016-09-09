import React from 'react';

import Button from '../../components/common/Button';

const PostAdmin = (props) => {

	if (!props.visible){
		return null;
	}

	return(
		<div className={( (props.mixClass ? props.mixClass : '') + ' post-admin')}>

			{
				(props.isSystem)
				?
				<Button 
					mixClass="post-admin__button"
					color="blue-light"
					size="s"
					onClickHandler={props.deletePostHandler}
				>
					Удалить
				</Button>
				:
				null
			}

			<Button 
				mixClass="post-admin__button"
				color="blue-light"
				size="s"
				onClickHandler={props.editPostHandler}
			>
				Редактировать
			</Button>

		</div>

	)
};

PostAdmin.propTypes = {
	mixClass: React.PropTypes.string,
	visible: React.PropTypes.bool.isRequired,
	deletePostHandler: React.PropTypes.func.isRequired,
	editPostHandler: React.PropTypes.func.isRequired,
	isSystem: React.PropTypes.bool.isRequired,
	
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default PostAdmin;
