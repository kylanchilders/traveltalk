var queryURL = "https://opentdb.com/api.php?amount=20&difficulty=medium";



$.ajax({
    url: queryURL,
    method: "GET"
   }).then(function(response) {

   options = response.results;
    console.log(options);
   });



//Google Map Call 
var map;
var latitude = 47.6062
var long = -122.3321

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: long},
    zoom: 10  
  });
}

