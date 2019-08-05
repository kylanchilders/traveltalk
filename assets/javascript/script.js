
//make a city search and then take those results and pass them into 
var originalURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCPnrEUe-GDsavDjTaLAaVR8bKZ15QOTVc&offset=3&input=Seattle";
var secondURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyCPnrEUe-GDsavDjTaLAaVR8bKZ15QOTVc&";
var queryautocom = "https://cors-anywhere.herokuapp.com/" + secondURL;
var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL;

var map;
var latitude = 47.6062
var long = -122.3321

console.log(queryautocom)
console.log(queryURL)

$.ajax({
  url: queryURL,
  method: "GET",
  dataType: "json",
  // this headers section is necessary for CORS-anywhere
  headers: {
    "x-requested-with": "xhr" 
  },
  success: function(data) {
    timestamp = data.results;
    console.log(timestamp);
},
error: function() {
    console.log("aw crap");
}
})


$.ajax({
  url: queryautocom,
  method: "GET",
  dataType: "json",
  // this headers section is necessary for CORS-anywhere
  headers: {
    "x-requested-with": "xhr" 
  }

 }).then(function(responseautocom) {
  var autocomoptions = responseautocom.results;
  console.log(autocomoptions);
 });




// $.ajax({
//     crossOrigin: true,
//     url: queryURL,
//     method: "GET"
//    }).then(function(response) {

//    options = response.results;
//     console.log(options);
//    });


//Google Map Call 



function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: long},
    zoom: 16  
  })
};

