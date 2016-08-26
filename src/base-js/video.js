'use strict';

export default (function App(window, document, $){

	const $play = $('.js-video-play');

	function actions(){
		$play.on('click', function(e){
			e.preventDefault();

			const $this = $(this);
			const $player = $this.parent().find('.js-video-player');

			const src = $this.attr('href');

			$player.attr('src', src);

			$this.addClass('video__href--invisible');
			$player.addClass('video__player--visible');
			
		});
	}

	function init(){
		actions();
	}

	return {
		init
	}

})(window, document, jQuery, undefined);
