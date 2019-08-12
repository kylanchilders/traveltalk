
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDCrkvNi0NrUuzyTIvMG59e58fAhl_p6Mk",
  authDomain: "traveltalk-1e69b.firebaseapp.com",
  databaseURL: "https://traveltalk-1e69b.firebaseio.com",
  projectId: "traveltalk-1e69b",
  storageBucket: "traveltalk-1e69b.appspot.com",
  messagingSenderId: "903453806895",
  appId: "1:903453806895:web:98061fcb91718e00"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


function ready(fn) {
  if(document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var eventID = localStorage.getItem("eventId");
var initialRating = 0
var ratingNumber = 0
var ratingTotal = 0
var newRatingTotal = 0
var selectedRating = 0
var rawInitialRating = 0

database.ref().on("value", function(snapshot) {
  if(snapshot.child('initialRating').exists()){
    initialRating = parseInt(snapshot.val().initialRating);
  }else{database.update()({ 'initialRating': initialRating})}

  if(snapshot.child('ratingNumber').exists()){
    ratingNumber = parseInt(snapshot.val().ratingNumber);
  }else{database.update()({ 'ratingNumber': ratingNumber})}
});

function ratingAg(){
  ratingTotal = initialRating * ratingNumber
  ratingNumber++
  newRatingTotal = selectedRating + ratingTotal
  rawInitialRating = newRatingTotal / ratingNumber
  initialRating = Math.round(rawInitialRating)
  database.ref().set({
    initialRating: initialRating
  });

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
      ratingAg();
      $(".rating-stars").append("Thanks for your input!")
      $(".card-text").empty();
      setTimeout(function(){
      window.location.replace('https://kylanchilders.github.io/traveltalk/')}, 2000);
    });
    });

    };

  });
