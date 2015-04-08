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

			$(".iframe").colorbox({iframe:true, width:"854", height:"508", scrolling:false,
	  	 			  onOpen:function(){ },
					  onLoad:function(){ },
					  onComplete:function(){ pauseScrolling(); },
					  onCleanup:function(){ },
					  onClosed:function(){ resumeScrolling(); }
				  });
				  
				  
			var s = skrollr.init({
	  
					forceHeight:true,
					render: function(data) {
						//document.querySelector('.scrollerpos').innerHTML = data.curTop;
						  clearTimeout(timer);
						  //scroll position detection
						  if ( ! boxDone ) {
							  if ((chapter != "caroline") && (data.curTop >= scrollPoint_caroline) && (data.curTop < scrollPoint_robert)) {
							  menuUpdate('caroline');
							  }
							  else if ((chapter != "robert") && (data.curTop >= scrollPoint_robert) && (data.curTop < scrollPoint_monique)) {
							  menuUpdate('robert');
							  }
							  else if ((chapter != "monique") && (data.curTop >= scrollPoint_monique) && (data.curTop < scrollPoint_victor)) {
							  menuUpdate('monique');
							  }
							  else if ((chapter != "victor") && (data.curTop >= scrollPoint_victor) && (data.curTop < scrollPoint_close)) {
							  menuUpdate('victor');
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
			
			$('#cssmenu li').removeClass('active');
			$('#cssmenu #'+chapter).closest('li').addClass('active');	
			var checkElement = $('#cssmenu #'+chapter).next();
			currentId = $('#cssmenu #'+chapter).attr('id');
			
			if((checkElement.is('ul')) && (checkElement.is(':visible')) && (chapter == 'intro')) {
			  $('#cssmenu #'+chapter).closest('li').removeClass('active');
			  checkElement.slideUp('normal');
			}
			
			if((checkElement.is('ul')) && (checkElement.is(':visible')) && (chapter == 'close')) {
			  $('#cssmenu #'+chapter).closest('li').removeClass('active');
			  checkElement.slideUp('normal');
			}
			
			if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
			  $('#cssmenu ul ul:visible').slideUp('normal');
			  checkElement.slideDown('normal');
			}
			
	  }
	  
  	$('#cssmenu > ul > li > a').click(function() {
			currentId = $(this).attr('id');
			var chapterPosition = window['scrollPoint_' + currentId];
			window.scrollTo(0,chapterPosition);	
	  });
	  
	$('#profileSnapshots div').click(function() {
			
			currentId = $(this).attr('id');
			var result = currentId.slice(14);
			var chapterPosition = window['scrollPoint_' + result];
			window.scrollTo(0,chapterPosition);	
	  });
	  	//hide body and show preloader until all elements loaded
  		$('body').addClass('visible');
		$('div#preloaderImage').removeClass('visible');
		
		
	 
});