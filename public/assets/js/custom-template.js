



$(document).ready(function(){ 
    // sticky menu===================
    var wind = $(window);
    var sticky = $('#sticky-header');
    wind.on('scroll', function () {
        var scroll = wind.scrollTop();
        if (scroll <100) {
            sticky.removeClass('sticky-nav');
        } else {
            sticky.addClass('sticky-nav');
        }
    });
});


    // Mobile Menu
    $('.mobile-menu nav').meanmenu({
        meanScreenWidth: "991",
        meanMenuContainer: ".mobile-menu",
        onePage: false,
    }); 

// slider Active
$('.slider-list').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 10000,
    dots: false,
    dotsEach:false,
    nav: true,
    navText: ["next", "<i class='fas fa-chevron-right''></i>"],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 1
        },
        992: {
            items: 1
        },
        1000: {
            items: 1
        },
        1920: {
            items: 1
        }
    }
})

// slider Active
$('.testi-list').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 10000,
    dots: false,
    dotsEach:false,
    nav: false,
    navText: ["<i class='fas fa-chevron-left''></i>", "<i class='fas fa-chevron-right''></i>"],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        992: {
            items: 3
        },
        1000: {
            items: 3
        },
        1920: {
            items: 3
        }
    }
})

// slider Active
$('.shop-list').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 20000,
    dots: false,
    dotsEach:false,
    nav: false,
    navText: ["<i class='fas fa-chevron-left''></i>", "<i class='fas fa-chevron-right''></i>"],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        992: {
            items: 3
        },
        1000: {
            items: 4
        },
        1920: {
            items: 4
        }
    }
})


// Loder  //
$(function () {
    $('body').addClass('loaded');
  });

 // table tabs
        
 $(document).ready(function() { 

    (function ($) { 
        $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
        
        $('.tab ul.tabs li a').click(function (g) { 
            var tab = $(this).closest('.tab'), 
            index = $(this).closest('li').index();
            
            tab.find('ul.tabs > li').removeClass('current');
            $(this).closest('li').addClass('current');
            
            tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
            tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
            
            g.preventDefault();
        } );
    })(jQuery);

});











(function($) {
    'use strict';
	//Header Search
	if($('.search-box-outer').length) {
		$('.search-box-outer').on('click', function() {
			$('body').addClass('search-active');
		});
		$('.close-search').on('click', function() {
			$('body').removeClass('search-active');
		});
	}
	
	
	// Venubox

    $('.venobox').venobox({

        numeratio: true,

        infinigall: true

    });
	
	
// Loder  
    $(function () {
      $('body').addClass('loaded');
    }); 







// slider Active
$('.brand-list').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 10000,
    dots: true,
    dotsEach:false,
    nav: false,
    navText: ["<i class='fas fa-long-arrow-alt-left''></i>", "<i class='fas fa-long-arrow-alt-right''></i>"],
    responsive: {
        0: {
            items: 3
        },
        768: {
            items: 3
        },
        992: {
            items: 5
        },
        1000: {
            items: 6
        },
        1920: {
            items: 6
        }
    }
})





// scroll strat============================

         $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 300) $('.go-top').addClass('active');
        if (scrolled < 300) $('.go-top').removeClass('active');
    });

    $('.go-top').on('click', function () {
        $("html, body").animate({
            scrollTop: "0"
        }, 1200);
    });


})(jQuery);




