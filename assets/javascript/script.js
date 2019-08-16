
//make a city search and then take those results and pass them into 

var map;
//var latitude = 47.6062 
//var longitude = -122.3321
var latitude = parseFloat(localStorage.getItem("latitude"));
var longitude = parseFloat(localStorage.getItem("longitude"));
var numOfEventsToDisplay = 10;
var calcLong = 0;
var calcLat = 0;

var auth = "S5UUTS2NYPECCKBYF5JY";
var bookmarks = [];
var events = [];

function addEventCard(event){
  var eventId = event.id;
  var template = `
      <div id="eventCard##EVENT-ID##" class="card" style="width: 18rem;">
          <img id="eventPhoto##EVENT-ID##" class="card-img-top" src="" alt="Card image cap">
          <div class="card-body">
              <h4 id="eventTitle##EVENT-ID##" style="text-align: center"></h4>
              <h6>Date of Event: <span id="eventDate##EVENT-ID##"></span></h6>
              <p id="eventDescription##EVENT-ID##" class="card-text"></p>
              <div id="fullEventDescription##EVENT-ID##" style="display: none;"></div>
              <div id="eventLocation##EVENT-ID##" style="display: none;"></div>
              <br>
              <div class="row text-center">
                  <a  id="addEventButton##EVENT-ID##" href="#" class="addEventButton btn btn-primary" style="margin: 5px" onclick="addEventToBookmark('##EVENT-ID##'); return false;">+</a>
                  <a id="removeEventButton##EVENT-ID##" href="#" class="removeEventButton btn btn-primary" style="margin: 5px">-</a>
                  <a  id="eventRatingButton##EVENT-ID##" href="#" class="eventRatingButton btn btn-primary" style="margin: 5px" onclick="locationRatingButton('##EVENT-ID##'); return false;">*</a>
                  <a id="moreInfoButton##EVENT-ID##" target="sblank" href="#" class="btn btn-primary" style="margin: 5px">More Info</a>
              </div>
          </div>
      </div>
  `;
  template = template.replace(/##EVENT-ID##/g, eventId);
  $("#eventCardBody").append(template);
  

  $("#eventPhoto" + eventId).attr("src", event.logo.original.url);
  $("#eventTitle" + eventId).text(event.name.text);
  $("#eventDate" + eventId).text(moment(event.start.local).format('MMMM Do YYYY, h:mm a'));
  $("#eventDescription" + eventId).text(event.description.text.substring(0, 150) + "...");
  $("#fullEventDescription" + eventId).text(event.description.text);
  $("#eventLocation" + eventId).text(event.venue.name);
  $("#moreInfoButton" + eventId).attr("href", event.url);

};

function addMapMarker(event,infowindow) {
  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(event.venue.latitude, event.venue.longitude),
    map: map,
    title: event.name.text
  });

  google.maps.event.addListener(marker, 'click', (function (marker) {
    return function () {
      infowindow.setContent(event.name.text);
      infowindow.open(map, marker);
    }
  })(marker));
}

function displayEventsByLatLong(latitude, longitude) {
  var eventURL = "https://www.eventbriteapi.com/v3/events/search/?token=" + auth + "&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue";
  $.ajax({
    url: eventURL,
    method: "GET"
  }).then(function (response) {
    events = response.events
    let infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < numOfEventsToDisplay; i++) {
      addEventCard(events[i]);
      addMapMarker(events[i],infowindow);
    }
  });
};

displayEventsByLatLong(latitude, longitude);


$("#search-name").on('keyup', function (e) {
  if (e.which == 13) {
    var search = $("#search-name").val();
    console.log(search)
    secondURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyCPnrEUe-GDsavDjTaLAaVR8bKZ15QOTVc"
    queryautocom = "https://cors-anywhere.herokuapp.com/" + secondURL;
    $("#eventCardBody").empty();
    $.ajax({
      url: queryautocom,
      method: "GET",
      dataType: "json",
      // this headers section is necessary for CORS-anywhere
      headers: {
        "x-requested-with": "xhr"
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
      },
      success: function (data1) {
        console.log(queryautocom);
        timestamp = data1.results;
        console.log(timestamp);
        longitude = data1.results[0].geometry.location.lng;
        console.log(longitude);
        latitude = data1.results[0].geometry.location.lat
        console.log(latitude)


        myLatLng = { lat: latitude, lng: longitude };
        map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 12,
          mapTypeId: 'terrain'
        })

        displayEventsByLatLong(latitude, longitude);

      }
    })


  }
});


$("#search").on("click", function () {
  var search = $("#search-name").val();
  console.log(search)
  secondURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyCPnrEUe-GDsavDjTaLAaVR8bKZ15QOTVc"
  queryautocom = "https://cors-anywhere.herokuapp.com/" + secondURL;
  $("#eventCardBody").empty();
  $.ajax({
    url: queryautocom,
    method: "GET",
    dataType: "json",
    // this headers section is necessary for CORS-anywhere
    headers: {
      "x-requested-with": "xhr"
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus); alert("Error: " + errorThrown);
    },
    success: function (data1) {
      timestamp = data1.results;
      longitude = data1.results[0].geometry.location.lng;
      latitude = data1.results[0].geometry.location.lat
      console.log(longitude);
      console.log(latitude)

      myLatLng = { lat: latitude, lng: longitude };
      map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 12,
        mapTypeId: 'terrain'
      })

      displayEventsByLatLong(latitude, longitude);


    },
    error: function () {
      console.log("aw crap");
    }

  })
});



function initMap() {
  myLatLng = { lat: latitude, lng: longitude };
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 12,
    mapTypeId: 'terrain'
  })};
