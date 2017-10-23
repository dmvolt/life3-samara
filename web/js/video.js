$(document).ready(function(){
	
$('.video-block').on('click',function(e) {
		e.preventDefault();
		var id = $(this).attr('data-id');
		$('.video-block').removeClass('active');
		$(this).addClass('active');
		$('.embed-responsive').html('<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/'+id+'" allowfullscreen></iframe>');
		$.scrollTo('.embed-responsive',500,{offset:-100});
	});	
    
});

