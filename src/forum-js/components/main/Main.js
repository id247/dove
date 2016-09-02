import React from 'react';

import ForumForm from '../../components/forum-form/ForumForm';
// import Wishlist from '../../components/wishlist/Wishlist';

const Main = (props) => (
	<div className="section__wrap forum__wrap">
		<ForumForm mixClass="forum__form" />
	</div>
);

Main.propTypes = {
	mixClass: React.PropTypes.string,
};


export default Main;
