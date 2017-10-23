$(document).ready(function(){
	
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

