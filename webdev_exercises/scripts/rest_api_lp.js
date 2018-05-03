$(document).ready(function() {
  $('.header__btn').on('click', function() {
    $('.container ul').toggleClass('show');
  });

  var offset = function() {
    return {
      top: 0 - $('#nav').height()
    };
  };

  $('#nav').localScroll({
    duration: 800,
    offset: offset
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

var animateHTMLLightSpeedIn = function() {
  var elems,
    windowHeight
  var init = function() {
    elems = document.getElementsByClassName('hidden-light_speed_in')
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
        elems[i].className = elems[i].className.replace('hidden-light_speed_in', 'lightSpeedIn')
      }
    }
  }
  return {
    init: init
  }
}


animateHTMLFadeInLeft().init();
animateHTMLFadeIn().init();
animateHTMLLightSpeedIn().init();