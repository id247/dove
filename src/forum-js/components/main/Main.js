import React from 'react';

// import Catalog from '../../components/catalog/Catalog';
// import Wishlist from '../../components/wishlist/Wishlist';

const Main = (props) => (
	<section className={( (props.mixClass ? props.mixClass : '') + ' main')} id="main">

		<div className="main__wrap wrap">

			<h1 className="main__title">Товары для школы</h1>
		
		</div>

	</section>
);

Main.propTypes = {
	mixClass: React.PropTypes.string,
};


export default Main;
