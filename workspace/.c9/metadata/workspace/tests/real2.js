{"filter":false,"title":"real2.js","tooltip":"/tests/real2.js","ace":{"folds":[],"scrolltop":3522,"scrollleft":0,"selection":{"start":{"row":210,"column":5},"end":{"row":210,"column":5},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":49,"state":"no_regex","mode":"ace/mode/javascript"}},"hash":"06f0cde42f895c795ef4ea1cdbfe5bf6ed9ac771","undoManager":{"mark":0,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":210,"column":5},"action":"insert","lines":["/**"," * main.js"," * http://www.codrops.com"," *"," * Licensed under the MIT license."," * http://www.opensource.org/licenses/mit-license.php"," * "," * Copyright 2015, Codrops"," * http://www.codrops.com"," */","(function() {","","\tvar bodyEl = document.body,","\t\tdocElem = window.document.documentElement,","\t\tsupport = { transitions: Modernizr.csstransitions },","\t\t// transition end event name","\t\ttransEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },","\t\ttransEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],","\t\tonEndTransition = function( el, callback ) {","\t\t\tvar onEndCallbackFn = function( ev ) {","\t\t\t\tif( support.transitions ) {","\t\t\t\t\tif( ev.target != this ) return;","\t\t\t\t\tthis.removeEventListener( transEndEventName, onEndCallbackFn );","\t\t\t\t}","\t\t\t\tif( callback && typeof callback === 'function' ) { callback.call(this); }","\t\t\t};","\t\t\tif( support.transitions ) {","\t\t\t\tel.addEventListener( transEndEventName, onEndCallbackFn );","\t\t\t}","\t\t\telse {","\t\t\t\tonEndCallbackFn();","\t\t\t}","\t\t},","\t\tgridEl = document.getElementById('theGrid'),","\t\tsidebarEl = document.getElementById('theSidebar'),","\t\tgridItemsContainer = gridEl.querySelector('section.grid'),","\t\tcontentItemsContainer = gridEl.querySelector('section.content'),","\t\tgridItems = gridItemsContainer.querySelectorAll('.grid__item'),","\t\tcontentItems = contentItemsContainer.querySelectorAll('.content__item'),","\t\tcloseCtrl = contentItemsContainer.querySelector('.close-button'),","\t\tcurrent = -1,","\t\tlockScroll = false, xscroll, yscroll,","\t\tisAnimating = false,","\t\tmenuCtrl = document.getElementById('menu-toggle'),","\t\tmenuCloseCtrl = sidebarEl.querySelector('.close-button');","","\t/**","\t * gets the viewport width and height","\t * based on http://responsejs.com/labs/dimensions/","\t */","\tfunction getViewport( axis ) {","\t\tvar client, inner;","\t\tif( axis === 'x' ) {","\t\t\tclient = docElem['clientWidth'];","\t\t\tinner = window['innerWidth'];","\t\t}","\t\telse if( axis === 'y' ) {","\t\t\tclient = docElem['clientHeight'];","\t\t\tinner = window['innerHeight'];","\t\t}","\t\t","\t\treturn client < inner ? inner : client;","\t}","\tfunction scrollX() { return window.pageXOffset || docElem.scrollLeft; }","\tfunction scrollY() { return window.pageYOffset || docElem.scrollTop; }","","\tfunction init() {","\t\tinitEvents();","\t}","","\tfunction initEvents() {","\t\t[].slice.call(gridItems).forEach(function(item, pos) {","\t\t\t// grid item click event","\t\t\titem.addEventListener('click', function(ev) {","\t\t\t\tev.preventDefault();","\t\t\t\tif(isAnimating || current === pos) {","\t\t\t\t\treturn false;","\t\t\t\t}","\t\t\t\tisAnimating = true;","\t\t\t\t// index of current item","\t\t\t\tcurrent = pos;","\t\t\t\t// simulate loading time..","\t\t\t\tclassie.add(item, 'grid__item--loading');","\t\t\t\tsetTimeout(function() {","\t\t\t\t\tclassie.add(item, 'grid__item--animate');","\t\t\t\t\t// reveal/load content after the last element animates out (todo: wait for the last transition to finish)","\t\t\t\t\tsetTimeout(function() { loadContent(item); }, 500);","\t\t\t\t}, 1000);","\t\t\t});","\t\t});","","\t\tcloseCtrl.addEventListener('click', function() {","\t\t\t// hide content","\t\t\thideContent();","\t\t});","","\t\t// keyboard esc - hide content","\t\tdocument.addEventListener('keydown', function(ev) {","\t\t\tif(!isAnimating && current !== -1) {","\t\t\t\tvar keyCode = ev.keyCode || ev.which;","\t\t\t\tif( keyCode === 27 ) {","\t\t\t\t\tev.preventDefault();","\t\t\t\t\tif (\"activeElement\" in document)","    \t\t\t\t\tdocument.activeElement.blur();","\t\t\t\t\thideContent();","\t\t\t\t}","\t\t\t}","\t\t} );","","\t\t// hamburger menu button (mobile) and close cross","\t\tmenuCtrl.addEventListener('click', function() {","\t\t\tif( !classie.has(sidebarEl, 'sidebar--open') ) {","\t\t\t\tclassie.add(sidebarEl, 'sidebar--open');\t","\t\t\t}","\t\t});","","\t\tmenuCloseCtrl.addEventListener('click', function() {","\t\t\tif( classie.has(sidebarEl, 'sidebar--open') ) {","\t\t\t\tclassie.remove(sidebarEl, 'sidebar--open');","\t\t\t}","\t\t});","\t}","","\tfunction loadContent(item) {","\t\t// add expanding element/placeholder ","\t\tvar dummy = document.createElement('div');","\t\tdummy.className = 'placeholder';","","\t\t// set the width/heigth and position","\t\tdummy.style.WebkitTransform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';","\t\tdummy.style.transform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';","","\t\t// add transition class ","\t\tclassie.add(dummy, 'placeholder--trans-in');","","\t\t// insert it after all the grid items","\t\tgridItemsContainer.appendChild(dummy);","\t\t","\t\t// body overlay","\t\tclassie.add(bodyEl, 'view-single');","","\t\tsetTimeout(function() {","\t\t\t// expands the placeholder","\t\t\tdummy.style.WebkitTransform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';","\t\t\tdummy.style.transform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';","\t\t\t// disallow scroll","\t\t\twindow.addEventListener('scroll', noscroll);","\t\t}, 25);","","\t\tonEndTransition(dummy, function() {","\t\t\t// add transition class ","\t\t\tclassie.remove(dummy, 'placeholder--trans-in');","\t\t\tclassie.add(dummy, 'placeholder--trans-out');","\t\t\t// position the content container","\t\t\tcontentItemsContainer.style.top = scrollY() + 'px';","\t\t\t// show the main content container","\t\t\tclassie.add(contentItemsContainer, 'content--show');","\t\t\t// show content item:","\t\t\tclassie.add(contentItems[current], 'content__item--show');","\t\t\t// show close control","\t\t\tclassie.add(closeCtrl, 'close-button--show');","\t\t\t// sets overflow hidden to the body and allows the switch to the content scroll","\t\t\tclassie.addClass(bodyEl, 'noscroll');","","\t\t\tisAnimating = false;","\t\t});","\t}","","\tfunction hideContent() {","\t\tvar gridItem = gridItems[current], contentItem = contentItems[current];","","\t\tclassie.remove(contentItem, 'content__item--show');","\t\tclassie.remove(contentItemsContainer, 'content--show');","\t\tclassie.remove(closeCtrl, 'close-button--show');","\t\tclassie.remove(bodyEl, 'view-single');","","\t\tsetTimeout(function() {","\t\t\tvar dummy = gridItemsContainer.querySelector('.placeholder');","","\t\t\tclassie.removeClass(bodyEl, 'noscroll');","","\t\t\tdummy.style.WebkitTransform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';","\t\t\tdummy.style.transform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';","","\t\t\tonEndTransition(dummy, function() {","\t\t\t\t// reset content scroll..","\t\t\t\tcontentItem.parentNode.scrollTop = 0;","\t\t\t\tgridItemsContainer.removeChild(dummy);","\t\t\t\tclassie.remove(gridItem, 'grid__item--loading');","\t\t\t\tclassie.remove(gridItem, 'grid__item--animate');","\t\t\t\tlockScroll = false;","\t\t\t\twindow.removeEventListener( 'scroll', noscroll );","\t\t\t});","\t\t\t","\t\t\t// reset current","\t\t\tcurrent = -1;","\t\t}, 25);","\t}","","\tfunction noscroll() {","\t\tif(!lockScroll) {","\t\t\tlockScroll = true;","\t\t\txscroll = scrollX();","\t\t\tyscroll = scrollY();","\t\t}","\t\twindow.scrollTo(xscroll, yscroll);","\t}","","\tinit();","","})();"],"id":1}]]},"timestamp":1497530429465}