// simple paralax function
function paralax() {
	var $window = $(window),
			speed   = 0.5;
		
	$('.paralax1').each(function(){
		var $this = $(this);
		
		if ($this.data('speed'))
			speed = $this.data('speed');
		
		function bgPosition() {
			var $thisY   = $this.offset().top,
					$windowY = $window.scrollTop();

			if ($thisY > $windowY)
				$this.css({ backgroundPosition: '50% '+ (($thisY - $windowY) / speed) + 'px'});
			else
				$this.css({ backgroundPosition: '50% '+ (-($windowY - $thisY) / speed) + 'px'});
		}
		
		bgPosition();
		
		$window.on('scroll', bgPosition);
	});
}