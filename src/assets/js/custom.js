var t1, t2, t3, slideIndex = 1,
    items = [];

function winPos(win) {
    return {
        x: 0,
        y: 0,
        x2: win.width() - 1,
        y2: win.height() - 1
    };
}

function pos(win, el) {
    var p = el.offset();
    var x = p.left - win.scrollLeft();
    var y = p.top - win.scrollTop();
    return {
        x: x,
        y: y,
        x2: x + el.width() - 1,
        y2: y + el.height() - 1
    };
}

function intersects(a, b) {
    return !(a.x2 < b.x || a.x > b.x2 || a.y2 < b.y || a.y > b.y2);
}

function check(win, w, item) {
    var p = pos(win, $(item.el));
    var s = intersects(w, p);
    if (s != item.shown) {
        item.shown = s;
        (s ? item.show : item.hide).call(item.el);
    }
}

function slide(n) {
    this.showSlide(slideIndex += n);
}

function showSlide(n) {

    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    var i;
    var x = document.getElementsByClassName("banner");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    var tis = $(x[slideIndex - 1]);
    if (!tis.hasClass('loaded')) {
        $qs = tis.find('img').attr('src').split('?');
        tis.find('img').attr('src', $qs[0] + '?q=70&w=' + $(x).width());
        tis.addClass('loaded');
    }
    x[slideIndex - 1].style.display = "block";
    t1 = setTimeout(this.carousel, 3000);
}

function carousel() {
    var i;
    var x = document.getElementsByClassName("banner");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {
        slideIndex = 1
    }
    var tis = $(x[slideIndex - 1]);
    if (!tis.hasClass('loaded')) {
        $qs = tis.find('img').attr('src').split('?');
        tis.find('img').attr('src', $qs[0] + '?q=70&w=' + $(x).width());
        tis.addClass('loaded');
    }

    x[slideIndex - 1].style.display = "block";
    t3 = setTimeout(this.carousel, 3000);
}

function is_touch_device() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

function hasClass(target, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}

function visible(show, hide) {
    var win = $(window),
        w = winPos(win);
    return this.each(function(i, el) {
        var item = {
            el: el,
            show: show,
            hide: hide,
            shown: false
        };
        items.push(item);
        check(win, w, item);
    });
}


function start_search_by_voice() {

    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 10;
    recognition.start();

    recognition.onresult = function(event) {
        console.log('You said: ', event.results[0][0].transcript);
        document.querySelector("input.search").value = event.results[0][0].transcript;
    };
}


document.querySelector("input.search").addEventListener("click", function(){
    start_search_by_voice();
   
});


