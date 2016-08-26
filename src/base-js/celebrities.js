'use strict';

export default (function App(window, document, $){

	const $items = $('.js-celebrities-item');
	const $buttons = $items.find('.celebrities-girl__button');
	const $bubbles = $items.find('.celebrities-girl__bubble');

	function actions(){
		$buttons.on('click', function(e){
			e.preventDefault();

			const $this = $(this);
			const $bubble = $this.siblings().filter('.celebrities-girl__bubble');
			const myClassName = 'celebrities-girl__bubble--visible';

			if ($bubble.hasClass(myClassName)){
				$bubble.removeClass(myClassName);
				//$bubble.show();
			}else{
				$bubbles.removeClass(myClassName);
				$bubble.addClass(myClassName);
				//$bubble.hide();
			}
			
			
		});
	}

	function init(){
		actions();
	}

	return {
		init
	}

})(window, document, jQuery, undefined);
