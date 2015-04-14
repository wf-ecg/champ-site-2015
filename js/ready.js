$( document ).ready(function() {
	
			  
			   
			  //check if coming from mobile version -- if so, allow
			  var location = window.location.href;
			  if (!location.match(/desktop$/)) {
				  
				  var isMobile = {
					  hasTouch: function() {
						return 'ontouchstart' in document.documentElement;
					},
					  Android: function() {
						return navigator.userAgent.match(/Android/i);
					},
					  BlackBerry: function() {
						return navigator.userAgent.match(/BlackBerry/i);
					},
					  iOS: function() {
						return navigator.userAgent.match(/iPhone|iPad|iPod/i);
					},
					  Opera: function() {
						return navigator.userAgent.match(/Opera Mini/i);
					},
					  Windows: function() {
						return navigator.userAgent.match(/IEMobile/i);
					},
					  any: function() {
						return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
					},
					  ismobi: function() {
						return navigator.userAgent.match(/Mobi/i);
					}
				  };
				  if( isMobile.ismobi() ) {window.location="mobile.html";} 
				  else {
					  var width = $(window).width(), height = $(window).height();
					  if (width < 640) { window.location="mobile.html"; } 
				  }
			  }
			  
			  else {
				  //display mobile selector
				  //document.getElementById('viewMobile').style.display = "inline";
			  }

			
				  
			var s = skrollr.init({
	  				smoothScrolling: true,
					mobileDeceleration: 0.004,
					forceHeight:true,
					render: function(data) {
						//document.querySelector('.scrollerpos').innerHTML = data.curTop;
						  clearTimeout(timer);
						  //scroll position detection
						  if ( ! boxDone ) {
							  if ((chapter != "ready") && (data.curTop >= scrollPoint_ready) && (data.curTop < scrollPoint_set)) {
							  menuUpdate('ready');
							  }
							  else if ((chapter != "set") && (data.curTop >= scrollPoint_set) && (data.curTop < scrollPoint_swing)) {
							  menuUpdate('set');
							  }
							  else if ((chapter != "swing") && (data.curTop >= scrollPoint_swing)) {
							  menuUpdate('swing');
							  }
							 
							  
						  }
						  else if (boxDone ) {
							  boxDone = false;
						  }
			  
						  timer = setTimeout(function() {
						  //The user hasn't scrolled for 1 second.
						  }, 1000);
					  }  
					  
					    
				  });
				  s.animateTo(top);
	
		function menuUpdate(chapter) {
			$('#navLeft span').removeClass('active');
			$('#navLeft #profileButton_'+chapter).addClass('active');	
			var checkElement = $('#navLeft #'+chapter).next();
			currentId = $('#navLeft #'+chapter).attr('id');
	  }
	  
  	$('#navLeft > span').click(function() {
		alert(clicked);
			currentId = $(this).attr('id');
			var result = currentId.slice(15);
			var chapterPosition = window['scrollPoint_' + result];
			window.scrollTo(0,chapterPosition);	
	  });
	  
	  	//hide body and show preloader until all elements loaded
  		
	 
});