'use strict';

import topQuiz from './top-quiz';
import quiz from './quiz';
import video from './video';

console.log('run');

$(function(){
	topQuiz.init();
	video.init();
	quiz.init();
});



