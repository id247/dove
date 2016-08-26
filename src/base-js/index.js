'use strict';

import topQuiz from './top-quiz';
import quiz from './quiz';
import video from './video';
import celebrities from './celebrities';

console.log('run');

$(function(){
	topQuiz.init();
	video.init();
	quiz.init();
	celebrities.init();
});



