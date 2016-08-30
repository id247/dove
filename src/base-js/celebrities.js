'use strict';

export default (function App(window, document, $){

	const $buttons = $('.js-celebrities-button');
	const $bubbles = $('.js-celebrities-bubble');
	
	const $close = $bubbles.find('.js-celebrities-close');

	const myClassName = 'celebrities-girl__bubble--visible';

	function actions(){
		$buttons.on('click', function(e){
			e.preventDefault();

			const $this = $(this);
			const targetId = $this.attr('href');

			console.log(targetId);

			const $bubble = $bubbles.filter(targetId);

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
