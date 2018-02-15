{"filter":false,"title":"test_scroll.js","tooltip":"/tests/test_scroll.js","undoManager":{"mark":25,"position":25,"stack":[[{"start":{"row":0,"column":0},"end":{"row":132,"column":1},"action":"remove","lines":["initSmoothScrolling();","","function initSmoothScrolling() {","  if (isCssSmoothSCrollSupported()) {","    document.getElementById('css-support-msg').className = 'supported';","    return;","  }","","  var duration = 400;","","  var pageUrl = location.hash ?","    stripHash(location.href) :","    location.href;","","  delegatedLinkHijacking();","  //directLinkHijacking();","","  function delegatedLinkHijacking() {","    document.body.addEventListener('click', onClick, false);","","    function onClick(e) {","      if (!isInPageLink(e.target))","        return;","","      e.stopPropagation();","      e.preventDefault();","","      jump(e.target.hash, {","        duration: duration,","        callback: function() {","          setFocus(e.target.hash);","        }","      });","    }","  }","","  function directLinkHijacking() {","    [].slice.call(document.querySelectorAll('a'))","      .filter(isInPageLink)","      .forEach(function(a) {","        a.addEventListener('click', onClick, false);","      });","","    function onClick(e) {","      e.stopPropagation();","      e.preventDefault();","","      jump(e.target.hash, {","        duration: duration,","      });","    }","","  }","","  function isInPageLink(n) {","    return n.tagName.toLowerCase() === 'a' &&","      n.hash.length > 0 &&","      stripHash(n.href) === pageUrl;","  }","","  function stripHash(url) {","    return url.slice(0, url.lastIndexOf('#'));","  }","","  function isCssSmoothSCrollSupported() {","    return 'scrollBehavior' in document.documentElement.style;","  }","","  // Adapted from:","  // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/","  function setFocus(hash) {","    var element = document.getElementById(hash.substring(1));","","    if (element) {","      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {","        element.tabIndex = -1;","      }","","      element.focus();","    }","  }","","}","","function jump(target, options) {","  var","    start = window.pageYOffset,","    opt = {","      duration: options.duration,","      offset: options.offset || 0,","      callback: options.callback,","      easing: options.easing || easeInOutQuad","    },","    distance = typeof target === 'string' ?","    opt.offset + document.querySelector(target).getBoundingClientRect().top :","    target,","    duration = typeof opt.duration === 'function' ?","    opt.duration(distance) :","    opt.duration,","    timeStart, timeElapsed;","","  requestAnimationFrame(function(time) {","    timeStart = time;","    loop(time);","  });","","  function loop(time) {","    timeElapsed = time - timeStart;","","    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));","","    if (timeElapsed < duration)","      requestAnimationFrame(loop)","    else","      end();","  }","","  function end() {","    window.scrollTo(0, start + distance);","","    if (typeof opt.callback === 'function')","      opt.callback();","  }","","  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/","  function easeInOutQuad(t, b, c, d) {","    t /= d / 2","    if (t < 1) return c / 2 * t * t + b","    t--","    return -c / 2 * (t * (t - 2) - 1) + b","  }","","}"],"id":22},{"start":{"row":0,"column":0},"end":{"row":66,"column":3},"action":"insert","lines":["// Smooth scroll for in page links - http://wibblystuff.blogspot.in/2014/04/in-page-smooth-scroll-using-css3.html","// Improvements from - http://codepen.io/kayhadrin/pen/KbalA","","$(function() {","\tvar $window = $(window), $document = $(document),","\t\ttransitionSupported = typeof document.body.style.transitionProperty === \"string\", // detect CSS transition support","\t\tscrollTime = 1; // scroll time in seconds","","\t$(document).on(\"click\", \"a[href*=#]:not([href=#])\", function(e) {","\t\tvar target, avail, scroll, deltaScroll;","    ","\t\tif (location.pathname.replace(/^\\//, \"\") == this.pathname.replace(/^\\//, \"\") && location.hostname == this.hostname) {","\t\t\ttarget = $(this.hash);","\t\t\ttarget = target.length ? target : $(\"[id=\" + this.hash.slice(1) + \"]\");","","\t\t\tif (target.length) {","\t\t\t\tavail = $document.height() - $window.height();","","\t\t\t\tif (avail > 0) {","\t\t\t\t\tscroll = target.offset().top;","          ","\t\t\t\t\tif (scroll > avail) {","\t\t\t\t\t\tscroll = avail;","\t\t\t\t\t}","\t\t\t\t} else {","\t\t\t\t\tscroll = 0;","\t\t\t\t}","","\t\t\t\tdeltaScroll = $window.scrollTop() - scroll;","","\t\t\t\t// if we don't have to scroll because we're already at the right scrolling level,","\t\t\t\tif (!deltaScroll) {","\t\t\t\t\treturn; // do nothing","\t\t\t\t}","","\t\t\t\te.preventDefault();","\t\t\t\t","\t\t\t\tif (transitionSupported) {","\t\t\t\t\t$(\"html\").css({","\t\t\t\t\t\t\"margin-top\": deltaScroll + \"px\",","\t\t\t\t\t\t\"transition\": scrollTime + \"s ease-in-out\"","\t\t\t\t\t}).data(\"transitioning\", scroll);","\t\t\t\t} else {","\t\t\t\t\t$(\"html, body\").stop(true, true) // stop potential other jQuery animation (assuming we're the only one doing it)","\t\t\t\t\t.animate({","\t\t\t\t\t\tscrollTop: scroll + \"px\"","\t\t\t\t\t}, scrollTime * 1000);","\t\t\t\t\t","\t\t\t\t\treturn;","\t\t\t\t}","\t\t\t}","\t\t}","\t});","","\tif (transitionSupported) {","\t\t$(\"html\").on(\"transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd\", function(e) {","\t\t\tvar $this = $(this),","\t\t\t\tscroll = $this.data(\"transitioning\");","\t\t\t","\t\t\tif (e.target === e.currentTarget && scroll) {","\t\t\t\t$this.removeAttr(\"style\").removeData(\"transitioning\");","\t\t\t\t","\t\t\t\t$(\"html, body\").scrollTop(scroll);","\t\t\t}","\t\t});","\t}","});"]}],[{"start":{"row":3,"column":0},"end":{"row":3,"column":1},"action":"remove","lines":["$"],"id":43}],[{"start":{"row":8,"column":1},"end":{"row":8,"column":2},"action":"remove","lines":["$"],"id":44}],[{"start":{"row":4,"column":15},"end":{"row":4,"column":16},"action":"remove","lines":["$"],"id":45}],[{"start":{"row":4,"column":37},"end":{"row":4,"column":38},"action":"remove","lines":["$"],"id":46}],[{"start":{"row":9,"column":40},"end":{"row":9,"column":41},"action":"insert","lines":[","],"id":47}],[{"start":{"row":9,"column":41},"end":{"row":9,"column":42},"action":"insert","lines":[" "],"id":48}],[{"start":{"row":9,"column":42},"end":{"row":9,"column":43},"action":"insert","lines":["l"],"id":49}],[{"start":{"row":9,"column":43},"end":{"row":9,"column":44},"action":"insert","lines":["o"],"id":50}],[{"start":{"row":9,"column":44},"end":{"row":9,"column":45},"action":"insert","lines":["c"],"id":51}],[{"start":{"row":9,"column":45},"end":{"row":9,"column":46},"action":"insert","lines":["a"],"id":52}],[{"start":{"row":9,"column":46},"end":{"row":9,"column":47},"action":"insert","lines":["t"],"id":53}],[{"start":{"row":9,"column":47},"end":{"row":9,"column":48},"action":"insert","lines":["i"],"id":54}],[{"start":{"row":9,"column":48},"end":{"row":9,"column":49},"action":"insert","lines":["o"],"id":55}],[{"start":{"row":9,"column":49},"end":{"row":9,"column":50},"action":"insert","lines":["n"],"id":56}],[{"start":{"row":12,"column":12},"end":{"row":12,"column":13},"action":"remove","lines":["$"],"id":57}],[{"start":{"row":13,"column":37},"end":{"row":13,"column":38},"action":"remove","lines":["$"],"id":58}],[{"start":{"row":38,"column":5},"end":{"row":38,"column":6},"action":"remove","lines":["$"],"id":59}],[{"start":{"row":43,"column":5},"end":{"row":43,"column":6},"action":"remove","lines":["$"],"id":60}],[{"start":{"row":55,"column":2},"end":{"row":55,"column":3},"action":"remove","lines":["$"],"id":61}],[{"start":{"row":56,"column":15},"end":{"row":56,"column":16},"action":"remove","lines":["$"],"id":62}],[{"start":{"row":56,"column":14},"end":{"row":56,"column":15},"action":"remove","lines":[" "],"id":63}],[{"start":{"row":56,"column":14},"end":{"row":56,"column":15},"action":"insert","lines":[" "],"id":64}],[{"start":{"row":62,"column":4},"end":{"row":62,"column":5},"action":"remove","lines":["$"],"id":66}],[{"start":{"row":0,"column":0},"end":{"row":66,"column":3},"action":"remove","lines":["// Smooth scroll for in page links - http://wibblystuff.blogspot.in/2014/04/in-page-smooth-scroll-using-css3.html","// Improvements from - http://codepen.io/kayhadrin/pen/KbalA","","(function() {","\tvar $window = (window), $document = (document),","\t\ttransitionSupported = typeof document.body.style.transitionProperty === \"string\", // detect CSS transition support","\t\tscrollTime = 1; // scroll time in seconds","","\t(document).on(\"click\", \"a[href*=#]:not([href=#])\", function(e) {","\t\tvar target, avail, scroll, deltaScroll, location;","    ","\t\tif (location.pathname.replace(/^\\//, \"\") == this.pathname.replace(/^\\//, \"\") && location.hostname == this.hostname) {","\t\t\ttarget = (this.hash);","\t\t\ttarget = target.length ? target : (\"[id=\" + this.hash.slice(1) + \"]\");","","\t\t\tif (target.length) {","\t\t\t\tavail = $document.height() - $window.height();","","\t\t\t\tif (avail > 0) {","\t\t\t\t\tscroll = target.offset().top;","          ","\t\t\t\t\tif (scroll > avail) {","\t\t\t\t\t\tscroll = avail;","\t\t\t\t\t}","\t\t\t\t} else {","\t\t\t\t\tscroll = 0;","\t\t\t\t}","","\t\t\t\tdeltaScroll = $window.scrollTop() - scroll;","","\t\t\t\t// if we don't have to scroll because we're already at the right scrolling level,","\t\t\t\tif (!deltaScroll) {","\t\t\t\t\treturn; // do nothing","\t\t\t\t}","","\t\t\t\te.preventDefault();","\t\t\t\t","\t\t\t\tif (transitionSupported) {","\t\t\t\t\t(\"html\").css({","\t\t\t\t\t\t\"margin-top\": deltaScroll + \"px\",","\t\t\t\t\t\t\"transition\": scrollTime + \"s ease-in-out\"","\t\t\t\t\t}).data(\"transitioning\", scroll);","\t\t\t\t} else {","\t\t\t\t\t(\"html, body\").stop(true, true) // stop potential other jQuery animation (assuming we're the only one doing it)","\t\t\t\t\t.animate({","\t\t\t\t\t\tscrollTop: scroll + \"px\"","\t\t\t\t\t}, scrollTime * 1000);","\t\t\t\t\t","\t\t\t\t\treturn;","\t\t\t\t}","\t\t\t}","\t\t}","\t});","","\tif (transitionSupported) {","\t\t(\"html\").on(\"transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd\", function(e) {","\t\t\tvar $this = (this),","\t\t\t\tscroll = $this.data(\"transitioning\");","\t\t\t","\t\t\tif (e.target === e.currentTarget && scroll) {","\t\t\t\t$this.removeAttr(\"style\").removeData(\"transitioning\");","\t\t\t\t","\t\t\t\t(\"html, body\").scrollTop(scroll);","\t\t\t}","\t\t});","\t}","});"],"id":67},{"start":{"row":0,"column":0},"end":{"row":24,"column":3},"action":"insert","lines":["","$(document).ready(function(){","  // Add smooth scrolling to all links","  $(\"a\").on('click', function(event) {","","    // Make sure this.hash has a value before overriding default behavior","    if (this.hash !== \"\") {","      // Prevent default anchor click behavior","      event.preventDefault();","","      // Store hash","      var hash = this.hash;","","      // Using jQuery's animate() method to add smooth page scroll","      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area","      $('html, body').animate({","        scrollTop: $(hash).offset().top","      }, 800, function(){","   ","        // Add hash (#) to URL when done scrolling (default click behavior)","        window.location.hash = hash;","      });","    } // End if","  });","});"]}],[{"start":{"row":0,"column":0},"end":{"row":24,"column":3},"action":"remove","lines":["","$(document).ready(function(){","  // Add smooth scrolling to all links","  $(\"a\").on('click', function(event) {","","    // Make sure this.hash has a value before overriding default behavior","    if (this.hash !== \"\") {","      // Prevent default anchor click behavior","      event.preventDefault();","","      // Store hash","      var hash = this.hash;","","      // Using jQuery's animate() method to add smooth page scroll","      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area","      $('html, body').animate({","        scrollTop: $(hash).offset().top","      }, 800, function(){","   ","        // Add hash (#) to URL when done scrolling (default click behavior)","        window.location.hash = hash;","      });","    } // End if","  });","});"],"id":68},{"start":{"row":0,"column":0},"end":{"row":24,"column":3},"action":"insert","lines":["","$(document).ready(function(){","  // Add smooth scrolling to all links","  $(\"a\").on('click', function(event) {","","    // Make sure this.hash has a value before overriding default behavior","    if (this.hash !== \"\") {","      // Prevent default anchor click behavior","      event.preventDefault();","","      // Store hash","      var hash = this.hash;","","      // Using jQuery's animate() method to add smooth page scroll","      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area","      $('html, body').animate({","        scrollTop: $(hash).offset().top","      }, 800, function(){","   ","        // Add hash (#) to URL when done scrolling (default click behavior)","        window.location.hash = hash;","      });","    } // End if","  });","});"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":0,"column":0},"end":{"row":24,"column":3},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1495190003861,"hash":"787f91d356516cc7fb44fdbbee824ecbdcdf3387"}