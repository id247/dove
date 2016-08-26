'use strict';

export default (function App(window, document, $){

	const $quizes = $('.quiz');

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

			const results = [
				{ id: 1, value: 0},
				{ id: 2, value: 0},
				{ id: 3, value: 0},
			];

			let resultId;

			function getMotherQuizResult(results){

				const sorted = results.sort(function(a, b) {
					return parseFloat(a.value) - parseFloat(b.value);
				});

				return sorted.reverse()[0].id; //to chose better result
			}

			$DOMquestionsItems.each(function(i){
				const answer = $DOMquestionsItems.eq(i).find('.js-quiz-radio:checked').val();
				//results.push({[i]:parseInt(answer)});
				results[answer - 1].value++;
			});


			switch(quizId){
				case 'mother-quiz':
					resultId = getMotherQuizResult(results);
					break;
				default: 
					resultId = 1;
			}

			console.log(results, resultId);

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
