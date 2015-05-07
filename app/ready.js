/*jslint white:false */
/*globals $, C:true, W:true, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var i, W = (W || window),
C = (C || W.console || {
    log: function () {}
});
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

    /// Generale hole previews (item 1.onload is bound to preloader)
    (function () {
        var i, div = $('.courseholes');

        for (i = 1; i < 19; i++) {
            div.append('<div class="holePreview"><a href="../../images/hole-detail/detail_' +
                i + '.png" data-lightbox="courseholes" data-title="Hole' +
                i + '"><img src="../../images/hole-previews/hole' +
                i + '.png" /></a></div>');
        }
        $('.holePreview img').first().on('load', function () {
            $('.preloader').fadeOut(666);
        });
    }());

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
