import React from 'react';

import ForumForm from '../../components/forum-form/ForumForm';
import ForumPosts from '../../components/forum-form/ForumPosts';
// import Wishlist from '../../components/wishlist/Wishlist';

const Main = (props) => (
	<div className="section__wrap forum__wrap">
		<ForumForm mixClass="forum__form" />
		<ForumPosts mixClass="forum__posts" />
	</div>
);

Main.propTypes = {
	mixClass: React.PropTypes.string,
};


export default Main;
