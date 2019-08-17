function ready(fn) {
  if(document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){
  function addClass(el, className) {
    if(typeof el.length == "number") {
      Array.prototype.forEach.call(el, function(e,i){ addClass(e, className) });
      return;
    }
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;    
  }
  function removeClass(el, className) {
    if(typeof el.length == "number") {
      Array.prototype.forEach.call(el, function(e,i){ removeClass(e, className) });
      return;
    }
    if (el.classList)
      el.classList.remove(className);
    else if(el.className)
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
  var stars = document.querySelectorAll(".rating-stars a");
  Array.prototype.forEach.call(stars, function(el, i){
    el.addEventListener("mouseover", function(evt){
      removeClass(stars, "selected");
      // For each star up to the highlighted one, add "hover"
      var to = parseInt(evt.target.getAttribute("data-rating"));
      Array.prototype.forEach.call(stars, function(star, i) {
        if(parseInt(star.getAttribute("data-rating")) <= to) {
          addClass(star, "hover");
        }
      });
    });
    el.addEventListener("mouseout", function(evt){
      removeClass(evt.target, "hover");
    });
    el.addEventListener("click", function(evt){
      selectedRating = parseInt(evt.target.getAttribute("data-rating"));
      removeClass(stars, "hover");
      Array.prototype.forEach.call(stars, function(star, i) {
        if(parseInt(star.getAttribute("data-rating")) <= selectedRating) {
          addClass(star, "selected");
        }
        console.log(selectedRating)
      });      
      evt.preventDefault();
      $(".rating-stars").append("Thanks for your input!")
      $(".card-text").empty();
      setTimeout(function(){
      window.location.replace('https://kylanchilders.github.io/traveltalk/')}, 2000);
    });
    });
  });
