$(document).ready(function(){
	
// Видение 2020
 $('.vision2020_main').click(function() {
	window.location.href = '/about/vision2020';
});
	
//MasterSlider
var slider = new MasterSlider();
slider.setup('masterslider' , {
	   width:1366,    // slider standard width
		height:400,   // slider standard height
	   /// space:5,
		layout:"fullwidth",
		autoHeight:false,
		hideLayers:false,
		grabCursor:true,
		swipe:true,
		autoplay:true,
		overPause:true,
		speed:18,
		loop:true,
		view:"parallaxMask"
		
	});
// adds Arrows navigation control to the slider.
slider.control('bullets',{autohide:true, hideUnder:'768px'});

//jplayer	
$(".jp-jplayer").each(function(indx){
	var id = $(this).attr('data-id');
	var file = $(this).attr('data-file');
	$(this).jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				mp3:"/audio/preaching/"+file+".mp3"
			});
		},
		play: function() { // To avoid both jPlayers playing together.
			$(this).jPlayer("pauseOthers");
		},
		swfPath: "/js",
		supplied: "mp3",
		cssSelectorAncestor: "#jp_container_"+id,
		wmode: "window"
	});
});
	
	
	
	
	
    
});

