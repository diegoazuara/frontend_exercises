$(document).ready(function() {
  $('.header__btn').on('click', function() {
    $('ul').toggleClass('show');

  });
});

var animateHTMLFadeInLeft = function() {
  var elems,
    windowHeight
  var init = function() {
    elems = document.getElementsByClassName('hidden-fade_in_left')
    windowHeight = window.innerHeight
    _addEventHandlers()
  }
  var _addEventHandlers = function() {
    window.addEventListener('scroll', _checkPosition)
    window.addEventListener('resize', init)
  }

  var _checkPosition = function() {
    for (var i = 0; i < elems.length; i++) {
      var posFromTop = elems[i].getBoundingClientRect().top
      if (posFromTop - windowHeight <= 0) {

        console.log(elems);
        elems[i].className = elems[i].className.replace('hidden-fade_in_left', 'fadeInLeft')
      }
    }
  }
  return {
    init: init
  }
}

var animateHTMLFadeIn = function() {
  var elems,
    windowHeight
  var init = function() {
    elems = document.getElementsByClassName('hidden-fade_in')
    windowHeight = window.innerHeight
    _addEventHandlers()
  }
  var _addEventHandlers = function() {
    window.addEventListener('scroll', _checkPosition)
    window.addEventListener('resize', init)
  }

  var _checkPosition = function() {
    for (var i = 0; i < elems.length; i++) {
      var posFromTop = elems[i].getBoundingClientRect().top
      if (posFromTop - windowHeight <= 0) {

        console.log(elems);
        elems[i].className = elems[i].className.replace('hidden-fade_in', 'fadeIn')
      }
    }
  }
  return {
    init: init
  }
}

animateHTMLFadeInLeft().init()
animateHTMLFadeIn().init()