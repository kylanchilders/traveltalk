
//make a city search and then take those results and pass them into 
var originalURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCPnrEUe-GDsavDjTaLAaVR8bKZ15QOTVc&offset=4&input=Seattle";
var secondURL = "https://api.opencagedata.com/geocode/v1/json?q=Portland&key=ce4024be27f7473587cd9b456f635db5;"
var queryautocom = "https://cors-anywhere.herokuapp.com/" + secondURL;
var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL;

var map;
var latitude = 47.6062
var longitude = -122.3321

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
    timestamp = data.predictions;
    console.log(timestamp);
},
error: function() {
    console.log("aw crap");
}
})

$("#search-name").on('keypress',function(e) {
  if(e.which == 13) {
    var search = $("#search-name").val();
    console.log(search)
    secondURL = "https://api.opencagedata.com/geocode/v1/json?q=" + search +"&key=ce4024be27f7473587cd9b456f635db5";
    queryautocom = "https://cors-anywhere.herokuapp.com/" + secondURL;
  
    $.ajax({
    url: queryautocom,
    method: "GET",
    dataType: "json",
    // this headers section is necessary for CORS-anywhere
    headers: {
      "x-requested-with": "xhr" 
    },
    success: function(data1) {
      timestamp = data1;
      console.log(timestamp);
      resultlong = data1.results[0].geometry.lng;
      console.log(resultlong);
      longitude = resultlong
      resultlat = data1.results[0].geometry.lat
      console.log(resultlat)
      latitude = resultlat
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latitude, lng: longitude},
        zoom: 10  
      })
    },
  error: function() {
      console.log("aw crap");
  }
  
   })
  

  }
});


$("#search").on("click", function() {
  var search = $("#search-name").val();
  console.log(search)
  secondURL = "https://api.opencagedata.com/geocode/v1/json?q=" + search +"&key=ce4024be27f7473587cd9b456f635db5";
  queryautocom = "https://cors-anywhere.herokuapp.com/" + secondURL;

  $.ajax({
  url: queryautocom,
  method: "GET",
  dataType: "json",
  // this headers section is necessary for CORS-anywhere
  headers: {
    "x-requested-with": "xhr" 
  },
  success: function(data1) {
    timestamp = data1;
    console.log(timestamp);
    resultlong = data1.results[0].geometry.lng;
    console.log(resultlong);
    longitude = resultlong
    resultlat = data1.results[0].geometry.lat
    console.log(resultlat)
    latitude = resultlat
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: latitude, lng: longitude},
      zoom: 10  
    })
  },
error: function() {
    console.log("aw crap");
}

 })
});



function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 10  
  })
};