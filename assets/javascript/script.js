
//make a city search and then take those results and pass them into 

var map;
//var latitude = 47.6062 
//var longitude = -122.3321
var latitude = parseFloat(localStorage.getItem("latitude"))
var longitude = parseFloat(localStorage.getItem("longitude"))
var numOfEventsToDisplay = 10
var calcLong = 0;
var calcLat = 0;

var auth = "S5UUTS2NYPECCKBYF5JY";
var bookmark = [];
function addEventCard(event){
  

  var eventId = event.id;
  var template = `
      <div id="eventCard##EVENT-ID##" class="card" style="width: 18rem;">
          <img id="eventPhoto##EVENT-ID##" class="card-img-top" src="" alt="Card image cap">
          <div class="card-body">
              <h4 id="eventTitle##EVENT-ID##" style="text-align: center"></h4>
              <h6>Date of Event: <span id="eventDate##EVENT-ID##"></span></h6>
              <p id="eventDescription##EVENT-ID##" class="card-text"></p>
              <br>
              <div class="row text-center">
                  <a  id="addEventButton##EVENT-ID##" href="#" class="btn btn-primary" style="margin: 10px">+</a>
                  <a id="removeEventButton##EVENT-ID##" href="#" class="btn btn-primary" style="margin: 10px">-</a>
                  <a id="moreInfoButton##EVENT-ID##" target="sblank" href="#" class="btn btn-primary" style="margin: 10px">More Info</a>
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
  $("#moreInfoButton" + eventId).attr("href", event.url);
};

function getEventByLatLong(latitude, longitude) {

  var eventURL = "https://www.eventbriteapi.com/v3/events/search/?token=" + auth + "&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue";

  $.ajax({
    url: eventURL,
    method: "GET"
  }).then(function (response) {

for(var i = 0; i < numOfEventsToDisplay; i++){
    var currentEvent = response.events[i];
    var eventTitle = currentEvent.name.text;
    var eventDate = currentEvent.start.local;
    var eventDescription = currentEvent.description.text;
    var eventTwo = eventDescription.substring(0,150) + "...";
    var eventImage = currentEvent.logo.original.url;

    var eventLongitude = currentEvent.venue.longitude;
    var eventLatitude = currentEvent.venue.latitude;

    console.log(eventLatitude, eventLongitude);
    calcLat = parseFloat(calcLat) + parseFloat(eventLatitude)
    calcLong = parseFloat(calcLong) + parseFloat(eventLongitude)
    
    addEventCard(currentEvent);
} 
    console.log(calcLat)
    console.log(calcLong)
    avgLat = (calcLat / 10)
    avgLong = (calcLong / 10)
    calcLat = 0 
    calcLong = 0
    console.log(avgLat)
    console.log(avgLong)
    console.log(calcLat)
    console.log(calcLong)


    events = response.events
    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    function markers() {
      for (i = 0; i < events.length; i++) {
        if (i < numOfEventsToDisplay) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(events[i].venue.latitude, events[i].venue.longitude),
            map: map,
            title: events[i].name.text
          });

          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
              infowindow.setContent(events[i].name.text);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
      }
    }
    markers()
    console.log(response);
  });


};

getEventByLatLong(latitude, longitude);


$("#search-name").on('keyup', function (e) {
  if (e.which == 13) {
    var search = $("#search-name").val();
    console.log(search)
    //secondURL = "https://api.opencagedata.com/geocode/v1/json?q=" + search +"&key=ce4024be27f7473587cd9b456f635db5";
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


        var auth = "S5UUTS2NYPECCKBYF5JY";
        var bookmark = [];
        function addEventCard(event){
          

          var eventId = event.id;
          var template = `
              <div id="eventCard##EVENT-ID##" class="card" style="width: 18rem;">
                  <img id="eventPhoto##EVENT-ID##" class="card-img-top" src="" alt="Card image cap">
                  <div class="card-body">
                      <h4 id="eventTitle##EVENT-ID##" style="text-align: center"></h4>
                      <h6>Date of Event: <span id="eventDate##EVENT-ID##"></span></h6>
                      <p id="eventDescription##EVENT-ID##" class="card-text"></p>
                      <br>
                      <div class="row text-center">
                          <a  id="addEventButton##EVENT-ID##" href="#" class="btn btn-primary" style="margin: 10px">+</a>
                          <a id="removeEventButton##EVENT-ID##" href="#" class="btn btn-primary" style="margin: 10px">-</a>
                          <a id="moreInfoButton##EVENT-ID##" target="sblank" href="#" class="btn btn-primary" style="margin: 10px">More Info</a>
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
          $("#moreInfoButton" + eventId).attr("href", event.url);
      };

        function getEventByLatLong(latitude, longitude) {

          var eventURL = "https://www.eventbriteapi.com/v3/events/search/?token=" + auth + "&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue";

          $.ajax({
            url: eventURL,
            method: "GET"
          }).then(function (response) {

        for(var i = 0; i < numOfEventsToDisplay; i++){
            var currentEvent = response.events[i];
            var eventTitle = currentEvent.name.text;
            var eventDate = currentEvent.start.local;
            var eventDescription = currentEvent.description.text;
            var eventTwo = eventDescription.substring(0,150) + "...";
            var eventImage = currentEvent.logo.original.url;

            var eventLongitude = currentEvent.venue.longitude;
            var eventLatitude = currentEvent.venue.latitude;

            console.log(eventLatitude, eventLongitude);
            calcLat = parseFloat(calcLat) + parseFloat(eventLatitude)
            calcLong = parseFloat(calcLong) + parseFloat(eventLongitude)
            
            addEventCard(currentEvent);
        } 
            console.log(calcLat)
            console.log(calcLong)
            avgLat = (calcLat / 10)
            avgLong = (calcLong / 10)
            calcLat = 0 
            calcLong = 0
            console.log(avgLat)
            console.log(avgLong)
            console.log(calcLat)
            console.log(calcLong)


            events = response.events
            var infowindow = new google.maps.InfoWindow();

            var marker, i;
            function markers() {
              for (i = 0; i < events.length; i++) {
                if (i < numOfEventsToDisplay) {
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng(events[i].venue.latitude, events[i].venue.longitude),
                    map: map,
                    title: events[i].name.text
                  });

                  google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                      infowindow.setContent(events[i].name.text);
                      infowindow.open(map, marker);
                    }
                  })(marker, i));
                }
              }
            }
            markers()
            console.log(response);
          });


        };

        getEventByLatLong(latitude, longitude);

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

      var auth = "S5UUTS2NYPECCKBYF5JY";
      var bookmark = [];
      function addEventCard(event){
        $("#eventCardBody").empty();
        var eventId = event.id;
        var template = `
            <div id="eventCard##EVENT-ID##" class="card" style="width: 18rem;">
                <img id="eventPhoto##EVENT-ID##" class="card-img-top" src="" alt="Card image cap">
                <div class="card-body">
                    <h4 id="eventTitle##EVENT-ID##" style="text-align: center"></h4>
                    <h6>Date of Event: <span id="eventDate##EVENT-ID##"></span></h6>
                    <p id="eventDescription##EVENT-ID##" class="card-text"></p>
                    <br>
                    <div class="row text-center">
                        <a  id="addEventButton##EVENT-ID##" href="#" class="btn btn-primary" style="margin: 10px">+</a>
                        <a id="removeEventButton##EVENT-ID##" href="#" class="btn btn-primary" style="margin: 10px">-</a>
                        <a id="moreInfoButton##EVENT-ID##" target="sblank" href="#" class="btn btn-primary" style="margin: 10px">More Info</a>
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
        $("#moreInfoButton" + eventId).attr("href", event.url);
    };

      function getEventByLatLong(latitude, longitude) {

        var eventURL = "https://www.eventbriteapi.com/v3/events/search/?token=" + auth + "&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue";

        $.ajax({
          url: eventURL,
          method: "GET"
        }).then(function (response) {
      console.log(response);

      for(var i = 0; i < numOfEventsToDisplay; i++){
          var currentEvent = response.events[i];
          var eventTitle = currentEvent.name.text;
          var eventDate = currentEvent.start.local;
          var eventDescription = currentEvent.description.text;
          var eventTwo = eventDescription.substring(0,150) + "...";
          var eventImage = currentEvent.logo.original.url;

          var eventLongitude = currentEvent.venue.longitude;
          var eventLatitude = currentEvent.venue.latitude;

          console.log(eventLatitude, eventLongitude);
          calcLat = parseFloat(calcLat) + parseFloat(eventLatitude)
          calcLong = parseFloat(calcLong) + parseFloat(eventLongitude)
          addEventCard(currentEvent);
      } 
      avgLat = calcLat / 10;
      avgLong = calcLong / 10;
      calcLat = 0 
      calcLong = 0
      console.log(calcLat)
      console.log(calcLong)
          events = response.events
          var infowindow = new google.maps.InfoWindow();

          var marker, i;
          function markers() {
            for (i = 0; i < events.length; i++) {
              if (i < numOfEventsToDisplay) {
                marker = new google.maps.Marker({
                  position: new google.maps.LatLng(events[i].venue.latitude, events[i].venue.longitude),
                  map: map,
                  title: events[i].name.text
                });

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                  return function () {
                    infowindow.setContent(events[i].name.text);
                    infowindow.open(map, marker);
                  }
                })(marker, i));
              }
            }
          }
          markers()
          console.log(response);

        });


      };

      getEventByLatLong(latitude, longitude);


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
  })

};