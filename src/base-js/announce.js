'use strict';

import Cookies from 'js-cookie';

export default (function App(window, document, $){

	const $announce = $('#announce');	
	const $close = $announce.find('.js-announce-close');
	const $timer = $('.announce-counter');

	const myClassName = 'announce--visible';
	const myCookieName = 'announce';

	function display(){
		setTimeout(showAnnounce, 1000);
	}

	function showAnnounce(){
		$announce.addClass(myClassName);
	}

	function hideAnnounce(){
		$announce.removeClass(myClassName);
	}

	function setCookie(){
		Cookies.set(myCookieName, 'i-saw-it', { expires: 1/24 });
	}

	function timer(){
		const $days = $timer.find('.js-announce-counter-days');
		const $hours = $timer.find('.js-announce-counter-hours');
		const $minutes = $timer.find('.js-announce-counter-minutes');
		const $seconds = $timer.find('.js-announce-counter-seconds');

		const endtime = 'September 12 2016 00:00:00 GMT+0400';
		//const endtime = 'August 31 2016 13:18:39 GMT+0300';


		function declension(num, expressions) {
			let result;
			let count = num % 100;
			if (count >= 5 && count <= 20) {
				result = expressions['2'];
			} else {
				count = count % 10;
				if (count == 1) {
					result = expressions['0'];
				} else if (count >= 2 && count <= 4) {
					result = expressions['1'];
				} else {
					result = expressions['2'];
				}
			}
			return result;
		}

		function getTimeRemaining(endtime){
			var t = Date.parse(endtime) - Date.parse(new Date());
			var seconds = Math.floor( (t/1000) % 60 );
			var minutes = Math.floor( (t/1000/60) % 60 );
			var hours = Math.floor( (t/(1000*60*60)) % 24 );
			var days = Math.floor( t/(1000*60*60*24) );
			function zero(num){
				return num < 10 ? '0' + num : num;
			}
			return {
				'total': t,
				'days': days,
				'hours': zero(hours),
				'minutes': zero(minutes),
				'seconds': zero(seconds)
			};
		}

		function daysWord(days){
			return days + ' ' + declension(days, ['день','дня','дней']);
		}

		function updateClock(){
			var t = getTimeRemaining(endtime);
			// console.log( 'days: ' + t.days + '<br>' +
			// 	'hours: '+ t.hours + '<br>' +
			// 	'minutes: ' + t.minutes + '<br>' +
			// 	'seconds: ' + t.seconds );

			if(t.total<=0){
				clearInterval(timeinterval);
				hideAnnounce();
			}
			
			$days.html(daysWord(t.days));
			$hours.html(t.hours);
			$minutes.html(t.minutes);
			$seconds.html(t.seconds);
		}

		updateClock();
		var timeinterval = setInterval(updateClock, 1000);
	}

	function actions(){
		$close.on('click', function(e){
			e.preventDefault();
			hideAnnounce();
			setCookie();
		});
		$announce.on('click', function(e){
			hideAnnounce();
			setCookie();
		});
	}

	function init(){	
		timer();	
		if (Cookies.get(myCookieName)){
			return false;
		}
		actions();
		display();
	}

	return {
		init
	}

})(window, document, jQuery, undefined);
