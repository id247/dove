'use strict';

export default (function App(window, document, $){

	const $opener = $('.js-top-quiz-open');
	const $content = $('.js-top-content');
	const $quiz = $('.js-top-quiz');

	function actions(){
		$opener.on('click', function(e){
			e.preventDefault();

			if ($content.is(':visible')){
				$content.hide();
				$quiz.show();
			}else{
				$content.show();
				$quiz.hide();				
			}
			
		})
	}

	function init(){
		actions();
	}

	return {
		init
	}

})(window, document, jQuery, undefined);
