'use strict';

export default (function App(window, document, $){

	const $items = $('.js-celebrities-item');
	const $buttons = $items.find('.celebrities-girl__button');
	const $bubbles = $items.find('.celebrities-girl__bubble');
	
	const $close = $items.find('.js-celebrities-close');

	const myClassName = 'celebrities-girl__bubble--visible';

	function actions(){
		$buttons.on('click', function(e){
			e.preventDefault();

			const $this = $(this);
			const $bubble = $this.siblings().filter('.celebrities-girl__bubble');

			if ($bubble.hasClass(myClassName)){
				$bubble.removeClass(myClassName);
			}else{
				$bubbles.removeClass(myClassName);
				$bubble.addClass(myClassName);
			}
		});

		$close.on('click', function(e){
			e.preventDefault();
			$bubbles.removeClass(myClassName);
		});
	}

	function init(){
		actions();
	}

	return {
		init
	}

})(window, document, jQuery, undefined);
