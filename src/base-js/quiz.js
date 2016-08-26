'use strict';

export default (function App(window, document, $){

	const $quizes = $('.quiz');

	const quizesResultsIds = {
		'top-quiz': {
			'0': '1',
			'1': '1',
			'2': '1',
		}
	}

	function quiz($quiz){

		//DOM
		const $DOMquestionNumber = $quiz.find('.js-quiz-current-quiestion-number');
		const $DOMquestionsCount = $quiz.find('.js-quiz-quiestions-count');
		const $DOMquestions = $quiz.find('.js-quiz-questions');
		const $DOMquestionsItems = $quiz.find('.js-quiz-question');
		const $DOMresults = $quiz.find('.js-quiz-results');
		const $DOMnextButton = $quiz.find('.js-quiz-next-button');
		const $DOMradios = $quiz.find('.js-quiz-radio');

		const quizId = $quiz.data('id');

		let currentQuiestionId = 0;
		let quiestionCount = $DOMquestionsItems.length;
		
		function actions(){
			$DOMnextButton.on('click', function(e){
				e.preventDefault();
				currentQuiestionId++;
				render();
			});

			$DOMradios.on('change', function(e){
				validate();
			});
		}

		function validate(){
			const $curentQuestion = $DOMquestionsItems.eq(currentQuiestionId);

			const $selectedAnswer = $curentQuestion.find('.js-quiz-radio:checked');

			if ($selectedAnswer.length === 0){
				$DOMnextButton.attr('disabled', true);
				return false;
			}

			$DOMnextButton.attr('disabled', false);

		}

		function showResults(){

			const results = [];

			$DOMquestionsItems.each(function(i){
				const answer = $DOMquestionsItems.eq(i).find('.js-quiz-radio:checked').val();
				results.push({[i]:parseInt(answer)});
			});

			console.log(results);

			const resultId = quizesResultsIds[quizId]['0'];

			$DOMquestions.hide();
			$DOMresults.show().find('.js-quiz-result-' + resultId).show();
		}

		function render(){
			validate();

			if (currentQuiestionId === quiestionCount){
				showResults();
				return;
			}

			$DOMquestionNumber.html(currentQuiestionId + 1);
			$DOMquestionsCount.html(quiestionCount);

			$DOMquestionsItems.hide().eq(currentQuiestionId).show();
		}

		function init(){
			render();
			actions();
		}

		return {
			init
		}

	}


	function getAllQuizez(){
		$quizes.each(function(){
			quiz($(this)).init();
		});
	}

	function init(){
		getAllQuizez();
	}

	return {
		init
	}

})(window, document, jQuery, undefined);
