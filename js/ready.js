/*jslint white:false */
/*globals $, C:true, W:true, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var i, W = (W || window),
C = (C || W.console || {
    log: function () {}
});
/// Drop in console slug
(function (c) {
    var all, key; //  bondo stuff
    all = 'log quebug delay'.split(' ');
    for (; Boolean(key = all.shift());) c[key] = c[key] || c.log;
    W.C = W.console = c;
}(function () {
    try {
        return C || C.log();
    } catch (e) {
        W.alert('Minimum requirement: IE8 or greater.\n' + e);
    }
}()));

if (W.window !== window || !C.debug) {
    W = W.window;
    C.all = 'log info error warn'.split(' '); // supplant these
    for (; Boolean(i = C.all.shift());) C[i] = (function (fn) {
        return (typeof fn === 'function') ? fn : function () {
            if (fn) fn(Array.prototype.slice.call(arguments).join(', '));
        }; // close over the itr key function ref
    }(C[i]));
    C.all = ('assert clear count debug dir dirxml' + // alias the rest
        ' exception group groupCollapsed groupEnd markTimeline' + //
        ' profile profileEnd time timeEnd trace').split(' ');
    for (; Boolean(i = C.all.shift());)(function (key) {
        C[key] = function () {
            C.info(Array.prototype.slice.call(arguments).join(', ') + '<' + key);
        }; // close over the itr key
    }(i));
    C.debug('IE8+', 'window / console fixes');
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*globals menuUpdate, skrollr, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    var timer,
    chapter = 'intro',
    currentId = 'ready',
    scrollPoint_ready = 3700,
    scrollPoint_set = 4400,
    scrollPoint_swing = 5100,
    scrollPoint_true = 8200,
    boxDone = false;

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
        if( isMobile.ismobi() ) {
            window.location="mobile.html";
        }
        else {
            var width = $(window).width(), height = $(window).height();
            if (width < 640) {
                window.location="mobile.html";
            }
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
        currentId = $(this).attr('id');
        var result = currentId.slice(14);
        var chapterPosition = window['scrollPoint_' + result];
        window.scrollTo(0,chapterPosition);
    });


});

    //$(window).on('resize', function () {
    //    var width = $(window).width(),
    //    height = $(window).height();
    //    if (width < 640) {
    //    window.location = "mobile.html";
    //    }
    //});
    $(".fitTextIntro").fitText(2.2, { minFontSize: '20px', maxFontSize: '100px' })
    $(".fittext1").fitText(2.2, { minFontSize: '20px', maxFontSize: '100px' })
    $(".fittext2").fitText(2.2, { minFontSize: '20px', maxFontSize: '100px' })
    $(".fittext3").fitText(2.2, { minFontSize: '20px', maxFontSize: '100px' })
    $(".fittext4").fitText(2.5, { minFontSize: '15px', maxFontSize: '75px' })
    $(".fittext5").fitText(2.2, { minFontSize: '20px', maxFontSize: '100px' })
    //$("h1").fitText(2.4, { minFontSize: '20px', maxFontSize: '100px' })
    //$("h2").fitText(2.4, { minFontSize: '15px', maxFontSize: '75px' })

