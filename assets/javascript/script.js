
//make a city search and then take those results and pass them into 

var map;
var latitude = 47.6062
var longitude = -122.3321

$("#search-name").on('keyup',function(e) {
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
         
    myLatLng = {lat: latitude, lng: longitude};
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 12,
      mapTypeId: 'terrain'  
    })

    
    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    
    ////////////Possible code to use for the eventbrite results and push markers to the google window////////////
    ///////////https://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example//////////////
        
      // var infowindow = new google.maps.InfoWindow();

      // var marker, i;
  
      // for (i = 0; i < locations.length; i++) {  
      //   marker = new google.maps.Marker({
      //     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      //     map: map
      //   });
  
      //   google.maps.event.addListener(marker, 'click', (function(marker, i) {
      //     return function() {
      //       infowindow.setContent(locations[i][0]);
      //       infowindow.open(map, marker);
      //     }
      //   })(marker, i));


    });
    var auth = "S5UUTS2NYPECCKBYF5JY";  
    function getEventByLatLong(latitude, longitude) {
    
      var eventURL = "https://www.eventbriteapi.com/v3/events/search/?token=" + auth + "&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue";
  
      $.ajax({
          url: eventURL,
          method: "GET"
      }).then(function (response) {
  
          var currentEvent = response.events[0];
          var eventTitle = currentEvent.name.text;
          var eventDescription = currentEvent.description.text;
          var eventTwo = eventDescription.substring(0,150) + "...";
          var eventImage = currentEvent.logo.original.url;
  
          var events = response.events

          var infowindow = new google.maps.InfoWindow();

          var marker, i;
          function markers() {
          for (i = 0; i < events.length; i++) {
            if (i < 9){  
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(events[i].venue.latitude, events[i].venue.longitude),
              map: map
            });
      
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(events[i].name);
                infowindow.open(map, marker);
              }
            })(marker, i));
          }}}
          markers()
          console.log(response);
  
  
  
          $("#eventPhoto").attr("src", eventImage);
          $("#eventTitle").text(eventTitle);
          $("#eventDescription").text(eventTwo);
  
          $("#eventDescription").append("<button> <>")
      });
  
  
  };
  
  getEventByLatLong(latitude, longitude);
  
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
    resultlat = data1.results[0].geometry.lat
    console.log(resultlong);
    console.log(resultlat)
    latitude = resultlat
    longitude = resultlong
    
    myLatLng = {lat: latitude, lng: longitude};
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 12,
      mapTypeId: 'terrain'  
    })
    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
      
    });
    var auth = "S5UUTS2NYPECCKBYF5JY";

    function getEventByLatLong(latitude, longitude) {
    
        var eventURL = "https://www.eventbriteapi.com/v3/events/search/?token=" + auth + "&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue";
    
        $.ajax({
            url: eventURL,
            method: "GET"
        }).then(function (response) {
    
            var currentEvent = response.events[0];
            var eventTitle = currentEvent.name.text;
            var eventDescription = currentEvent.description.text;
            var eventTwo = eventDescription.substring(0,150) + "...";
            var eventImage = currentEvent.logo.original.url;
            var events = response.events
            
          var infowindow = new google.maps.InfoWindow();

          var marker, i;
          function markers() {
          for (i = 0; i < events.length; i++) {
            if (i < 10){  
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(events[i].venue.latitude, events[i].venue.longitude),
              map: map
            });
      
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(events[i].name);
                infowindow.open(map, marker);
              }
            })(marker, i));
          }}}
          markers()
    
            console.log(response);
    
    
    
            $("#eventPhoto").attr("src", eventImage);
            $("#eventTitle").text(eventTitle);
            $("#eventDescription").text(eventTwo);
    
            $("#eventDescription").append("<button> <>")
        });
    
    
    };
    
    getEventByLatLong(latitude, longitude);
    

  },
error: function() {
    console.log("aw crap");
}

 })
});



function initMap() {
  myLatLng = {lat: latitude, lng: longitude};
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 12 ,
    mapTypeId: 'terrain'
  })
  marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
};
console.log(initMap)