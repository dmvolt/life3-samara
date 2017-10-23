$(document).ready(function(){
	
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
    slider.control('bullets');
	//MSScrollParallax.setup(slider,0,50);
	
    
});

