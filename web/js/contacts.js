$(document).ready(function(){
	
	$('.collapse').on('show.bs.collapse', function () {
  		var header = $(this).prev('.contacts-header');
		var arrow = header.find('.fa');
		header.addClass('active');
		arrow.removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
	});
	$('.collapse').on('hide.bs.collapse', function () {
  		var header = $(this).prev('.contacts-header');
		var arrow = header.find('.fa');
		header.removeClass('active');
		arrow.removeClass('fa-angle-double-up').addClass('fa-angle-double-down');
	});
	
    
});

