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
$(W.document).ready(function () {
    var S, location, timer,
    boxDone = false,
    chapter = 'intro',
    currentId = 'ready',
    scrollPoints = {
        ready: 3700,
        set: 4400,
        swing: 5100,
        trew: 8200
    };

    function menuUpdate(chapter) {
        $('#navLeft span').removeClass('active');
        $('#navLeft #profileButton_' + chapter).addClass('active');
        //var checkElement = $('#navLeft #' + chapter).next();
        currentId = $('#navLeft #' + chapter).attr('id');
    }

    //check if coming from mobile version -- if so, allow
    location = W.location.href;

    if (!location.match(/desktop$/)) {

        var isMobile = {
            hasTouch: function () {
                return 'ontouchstart' in W.document.documentElement;
            },
            Android: function () {
                return W.navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return W.navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return W.navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return W.navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return W.navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            },
            ismobi: function () {
                return W.navigator.userAgent.match(/Mobi/i);
            }
        };
        if (isMobile.ismobi()) {
            W.location = 'mobile.html';
        }
        else {
            var width = $(W).width();
            if (width < 640) {
                W.location = 'mobile.html';
            }
        }
    }
    else {
    /// display mobile selector
    //W.document.getElementById('viewMobile').style.display = 'inline';
    }

    W.S = S = skrollr.init({
        smoothScrolling: true,
        mobileDeceleration: 0.004,
        forceHeight: true,
        render: function (data) {
            //W.document.querySelector('.scrollerpos').innerHTML = data.curTop;
            W.clearTimeout(timer);
            //scroll position detection
            if (!boxDone) {
                if ((chapter !== 'ready') && (data.curTop >= scrollPoints.ready) && (data.curTop < scrollPoints.set)) {
                    menuUpdate('ready');
                }
                else if ((chapter !== 'set') && (data.curTop >= scrollPoints.set) && (data.curTop < scrollPoints.swing)) {
                    menuUpdate('set');
                }
                else if ((chapter !== 'swing') && (data.curTop >= scrollPoints.swing)) {
                    menuUpdate('swing');
                }
            }
            else if (boxDone) {
                boxDone = false;
            }

            timer = W.setTimeout(function () {
                //The user hasn't scrolled for 1 second.
                }, 1000);
        }
    });

    S.animateTo('');

    $('#navLeft > span').click(function () {
        var result, chapterPosition;

        currentId = $(this).attr('id');
        result = currentId.slice(14);
        chapterPosition = scrollPoints[result];

        W.scrollTo(0, chapterPosition);
    });

    if ('\v'==='v') { // using crap browser
        $('.preloader').fadeOut(6666);
    } else {
        $('.holePreview img').eq(0).on('load', function () {
            $('.preloader').fadeOut(666);
        });
    }

    $('.fitTextIntro').fitText(2.2, {
        minFontSize: '20px',
        maxFontSize: '100px'
    });
    $('.fittext1').fitText(2.2, {
        minFontSize: '20px',
        maxFontSize: '100px'
    });
    $('.fittext2').fitText(2.2, {
        minFontSize: '20px',
        maxFontSize: '100px'
    });
    $('.fittext3').fitText(2.2, {
        minFontSize: '20px',
        maxFontSize: '100px'
    });
    $('.fittext4').fitText(2.5, {
        minFontSize: '15px',
        maxFontSize: '75px'
    });
    $('.fittext5').fitText(2.2, {
        minFontSize: '20px',
        maxFontSize: '100px'
    });
    /// HACK close the lightbox
    $(W).on('scroll', function () {
        $('.lb-close').click();
    });
    /// Separate man from beast
    if (/Trident/.test(W.navigator.userAgent)) {
        $('html').addClass('msie');
    }
});
