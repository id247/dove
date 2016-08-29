'use strict';

export default (function App(window, document, $){

	const $play = $('.js-video-player-play');

	function actions(){
		$play.on('click', function(e){
			e.preventDefault();

			const $this = $(this);
			const $parent = $(this).parent();
			const $player = $parent.find('.js-video-player-frame');
			const $placeholder = $parent.find('.js-video-player-frame');

			const src = $this.attr('href');

			$player.attr('src', src);

			$this.addClass('video-player__href--invisible');
			$placeholder.addClass('video-player__frame--visible');
			
		});
	}

	function init(){
		actions();
	}

	return {
		init
	}

})(window, document, jQuery, undefined);
