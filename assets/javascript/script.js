var queryURL = "https://opentdb.com/api.php?amount=20&difficulty=medium";


function eventBrite(queryURL) {
$.ajax({
    url: queryURL,
    method: "GET"
   }).then(function(response) {

   options = response.results;
    console.log(options);
   });
}

eventBrite(queryURL)



//Google Map Call 
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6062, lng: -122.3321},
    zoom: 16
  });
}

