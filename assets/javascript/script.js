//make a city search and then take those results and pass them into 
var map;
var latitude = parseFloat(localStorage.getItem("latitude"));
var longitude = parseFloat(localStorage.getItem("longitude"));
var numOfEventsToDisplay = 10;
var calcLong = 0;
var calcLat = 0;

var firebaseConfig = {
  apiKey: "AIzaSyDCrkvNi0NrUuzyTIvMG59e58fAhl_p6Mk",
  authDomain: "traveltalk-1e69b.firebaseapp.com",
  databaseURL: "https://traveltalk-1e69b.firebaseio.com",
  projectId: "traveltalk-1e69b",
  storageBucket: "traveltalk-1e69b.appspot.com",
  messagingSenderId: "903453806895",
  appId: "1:903453806895:web:98061fcb91718e00"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var auth = "S5UUTS2NYPECCKBYF5JY";
var events = [];
var markerArray = [];

function generateCardBody(eventId){
  // dynamically creating our html within JavaScript to display for each individual event
  // because we dynamically printed our html with javascript we can call our .on("click", function()) from within the buttons themselves.
  // we are going to write it like: onclick="functionName('##EVENT-ID##'); return false;"
  // the return false prevents the page from reloading to the top
  var template = `
  <li class="card eventCard##EVENT-ID##" style="width: 18rem; order: 1" tabindex="-1" class="uk-active">
  <img id = "eventPhoto##EVENT-ID##" class="card-img-top eventPhoto##EVENT-ID##" src="" alt="Card image cap" style="height: 165px;">
  <div class="card-body d-flex flex-column">
      <h4 id="eventTitle##EVENT-ID##" class="eventTitle##EVENT-ID##" style="text-align: center"></h4>
      <h6>Date of Event: <span id="eventDate##EVENT-ID##" class="eventDate##EVENT-ID##"></span></h6>
      <div id="fullEventURL##EVENT-ID##" class="fullEventURL##EVENT-ID##" style="display: none;"></div>
      <div id="fullEventDescription##EVENT-ID##" class="fullEventDescription##EVENT-ID##" style="display: none;"></div>
      <div id="eventVenue##EVENT-ID##" class="eventVenue##EVENT-ID##" style="display: none;"></div>
      <div id="eventVenueLat##EVENT-ID##" class="eventVenueLat##EVENT-ID##" style="display: none;"></div>
      <div id="eventVenueLong##EVENT-ID##" class="eventVenueLong##EVENT-ID##" style="display: none;"></div>
              <p id="eventDescription##EVENT-ID##" class="eventDescription##EVENT-ID## card-text"></p>
              <br>
              <div class="row text-center" >
                  <a id="addEventButton##EVENT-ID##" href="#" class="addEventButton btn btn-primary" style="margin: 5px" onclick="addEventToBookmark('##EVENT-ID##'); return false;">+</a>
                  <a id="removeEventButton##EVENT-ID##" href="#" class="removeEventButton btn btn-primary" style="margin: 5px" onclick="removeEventFromBookmark('##EVENT-ID##'); return false;">-</a>
                  <a id="moreInfoButton##EVENT-ID##" target="blank" href="#" class="moreInfoButton##EVENT-ID## btn btn-primary" style="margin: 5px">More Info</a>          
              </div>
      </li>
  `;
  // within the template we are going to call the .recplace() function which takes in two parameters
  // the first paraemter is going to take everything within our html that says "/##EVENT-ID##/" 
  // the small g identifies its going to specify every occurance of that string
  // the second parameter is what we are going to replace it with, here we are replacing with the eventId
  template = template.replace(/##EVENT-ID##/g, eventId);
  // using the .append() function
  // using jQuery selecting the ".uk-slider-items" id from the html and append() the template to it
  $(".uk-slider-items").append(template);
};

function generateModalBody(eventId) {
  var modalTemplate = `
    <div class="modal fade" id="exampleModalLong##EVENT-ID##" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
      <div class="modal-body">
      <img class="card-img-top eventPhoto##EVENT-ID##" src="" alt="Card image cap" style="height: 165px; width: 300px; display: block; margin-left: auto; margin-right: auto;">
      <div class="card-body">
          <h4 class="eventTitle##EVENT-ID##" style="text-align: center"></h4>
          <h6 style="margin:0;">Date of Event: <span class="eventDate##EVENT-ID##"></span></h6>
          <h6 style="margin:0;">Location: <span class="venueName##EVENT-ID##"></span></h6>
          <h6 style="margin:0;"><span class="venueAddress1##EVENT-ID##"></span></h6>
          <h6 style="margin:0;"><span class="venueAddress2##EVENT-ID##"></span></h6>
          <p class="card-text fullEventDescription##EVENT-ID##"></p>
          </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
      </div>
  </div>
</div>
</div>
`;

  modalTemplate = modalTemplate.replace(/##EVENT-ID##/g, eventId);
  $("body").after(modalTemplate);
};

function initializeRatings(eventId){
  var userRating
  var numberOfRatings
  var initialRating

  $(".1star" + eventId).on("click", function(){
    $(".1star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".2star" + eventId).attr("src", "./assets/images/star-icon-empty.png");
    $(".3star" + eventId).attr("src", "./assets/images/star-icon-empty.png");
    $(".4star" + eventId).attr("src", "./assets/images/star-icon-empty.png");
    $(".5star" + eventId).attr("src", "./assets/images/star-icon-empty.png");
    userRating = 1;
    numberOfRatings++;
    $(".ratingArea" + eventId).delay(1500).queue(function(n){
      $(".ratingArea" + eventId).html("<p>Thanks for your rating!</p>");
      n();
    });
  });

  $(".2star" + eventId).click(function(){
    $(".1star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".2star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".3star" + eventId).attr("src", "./assets/images/star-icon-empty.png");
    $(".4star" + eventId).attr("src", "./assets/images/star-icon-empty.png");
    $(".5star" + eventId).attr("src", "./assets/images/star-icon-empty.png");
    userRating = 2;
    numberOfRatings++;
    $(".ratingArea" + eventId).delay(1500).queue(function(n){
      $(".ratingArea" + eventId).html("<p>Thanks for your rating!</p>");
      n();
    });
  });

  $(".3star" + eventId).click(function(){
    $(".1star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".2star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".3star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".4star" + eventId).attr("src", "./assets/images/star-icon-empty.png");
    $(".5star" + eventId).attr("src", "./assets/images/star-icon-empty.png");
    userRating = 3;
    numberOfRatings++;
    $(".ratingArea" + eventId).delay(1500).queue(function(n){
      $(".ratingArea" + eventId).html("<p>Thanks for your rating!</p>");
      n();
    });
  });

  $(".4star" + eventId).click(function(){
    $(".1star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".2star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".3star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".4star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".5star" + eventId).attr("src", "./assets/images/star-icon-empty.png");
    userRating = 4;
    numberOfRatings++;
    $(".ratingArea" + eventId).delay(1500).queue(function(n){
      $(".ratingArea" + eventId).html("<p>Thanks for your rating!</p>");
      n();
    });
  });

  $(".5star" + eventId).click(function(){
    $(".1star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".2star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".3star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".4star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    $(".5star" + eventId).attr("src", "./assets/images/star-icon-full.png");
    userRating = 5;
    numberOfRatings++;
    $(".ratingArea" + eventId).delay(1500).queue(function(n){
      $(".ratingArea" + eventId).html("<p>Thanks for your rating!</p>");
      n();
    });
  });
};

// this function that dynamically adds html to the dom 
// passing our event through as a variable 
function addEventCard(event){
  // declaring a variable called eventId and assigning it the value of the id within the event return by the ajax call
  var eventId = event.id;

  generateCardBody(eventId);
  generateModalBody(eventId);

  // dynamically grab the different html elements and assigning them values from the API call to EventBrite
  // using "#eventPhoto" concatenate with eventId
  // add and attribute with .attr("src") 
  // using our (event) we are using in our function we are going to return the value of that events logo.original.url
  // that will return the url for the events photo so we can display it in our "#eventPhoto" div
    $(".eventPhoto" + eventId).attr("src", event.logo.original.url);
    $(".eventTitle" + eventId).text(event.name.text);
    $(".eventDate" + eventId).text(moment(event.start.local).format('MMMM Do YYYY, h:mm a'));
    $(".eventDescription" + eventId).text(event.description.text.substring(0, 150) + "...");
    $(".eventVenue" + eventId).text(event.venue.name);
    $(".eventVenueLat" + eventId).text(event.venue.latitude);
    $(".eventVenueLong" + eventId).text(event.venue.longitude);
    $(".moreInfoButton" + eventId).attr("href", event.url);
    $(".fullEventDescription" + eventId).text(event.description.text);
    $(".fullEventURL" + eventId).text(event.url);
    $(".venueName" + eventId).text(event.venue.name);
    $(".venueAddress1" + eventId).text(event.venue.address.address_1);
    $(".venueAddress2" + eventId).text(event.venue.address.city + ", " + event.venue.address.region + " " + event.venue.address.postal_code);

};

// Here we have a similar function to the one called addEventCard
// this function will run on items we have stored in firebase using our bookmarks option
function addEventCardFromDB(event){
  // the event object has the same structure as the bookmark object 
  var eventId = event.eventId;
  generateCardBody(eventId);

  // instead of this information coming from our ajax call to EventBrite this is coming from Firebase
  $("#eventPhoto" + eventId).attr("src", event.eventPhoto);
  $("#eventTitle" + eventId).text(event.eventTitle);
  $("#eventDate" + eventId).text(event.eventDate);
  // because we stored the fullEventDescription instead of the substring we need to run the function again
  // caping our fullEventDescription return from firebase this time at 150 characters
  $("#eventDescription" + eventId).text(event.fullEventDescription.substring(0, 150) + "...");
  $("#fullEventDescription" + eventId).text(event.fullEventDescription);
  $("#moreInfoButton" + eventId).attr("href", event.eventURL);
  $("#eventVenue" + eventId).text(event.eventVenue);
};


function addMapMarker(name,latitude,longitude,eventId,infowindow) {
  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map: map,
    title: name,
    eventId: eventId
  });

  google.maps.event.addListener(marker, 'click', (function (marker) {
    return function () {
      infowindow.setContent(name);
      infowindow.open(map, marker);
    }
  })(marker));
  return marker;
}

function zoomMapToFitMarkers() {
  if (markerArray.length > 0) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markerArray.length; i++) {
      bounds.extend(markerArray[i].getPosition());
    }
    map.fitBounds(bounds,10);
  }
}

function displayEventsByLatLong(latitude, longitude) {
  var eventURL = "https://www.eventbriteapi.com/v3/events/search/?token=" + auth + "&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue";
  $.ajax({
    url: eventURL,
    method: "GET"
  }).then(function (response) {
    events = response.events;
    initMap();
    let infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < numOfEventsToDisplay; i++) {
      let currentEvent = events[i];
      addEventCard(currentEvent);
      markerArray.push(addMapMarker(currentEvent.name.text,currentEvent.venue.latitude,currentEvent.venue.longitude,currentEvent.id,infowindow));
      zoomMapToFitMarkers();
    }
  });
  console.log(eventURL);
};

// this function will be called on page open of the bookmarks 
function populateBookmarksPage(){
  // using our localStorage we are declaring a new variable called userName
  var userName = localStorage.getItem('userName');
  // returning a call from our database using .ref()
  // looking into the .child() under username we are going to create a branch
  // 
  initMap();
  let infowindow = new google.maps.InfoWindow();
  database.ref().child(userName+"/bookmarks").orderByChild("bookmarks").on("child_added", function(snapshot){
      var tempEventCardInfo = snapshot.val();
      addEventCardFromDB(tempEventCardInfo);
      markerArray.push(addMapMarker(tempEventCardInfo.eventTitle,tempEventCardInfo.eventLat,tempEventCardInfo.eventLong,tempEventCardInfo.eventId,infowindow));
      zoomMapToFitMarkers();
  });
};


$("#search-name").on('keyup', function (e) {
  if (e.which == 13) {
    var search = $("#search-name").val();
    console.log(search)
    secondURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyCPnrEUe-GDsavDjTaLAaVR8bKZ15QOTVc"
    queryautocom = "https://cors-anywhere.herokuapp.com/" + secondURL;
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

        console.log(queryautocom);
        console.log(timestamp);
        console.log(longitude);
        console.log(latitude)



        myLatLng = { lat: latitude, lng: longitude };

        map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 12,
          mapTypeId: 'terrain'
        })

        $(".uk-slider-items").empty();
        displayEventsByLatLong(latitude, longitude);

      }
    })


  }
});


$("#submit").on("click", function () {
  var search = $("#search-name").val();
  console.log(search)
  secondURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyCPnrEUe-GDsavDjTaLAaVR8bKZ15QOTVc"
  queryautocom = "https://cors-anywhere.herokuapp.com/" + secondURL;
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

      $(".uk-slider-items").empty();
      displayEventsByLatLong(latitude, longitude);


    },
    error: function () {
      console.log("aw crap");
    }

  })
});

function addEventToBookmark(eventId){
  // window.location = "../maps.html";

  console.log(eventId);
  var eventTitle = ($("#eventTitle" + eventId).text());
  var eventPhoto = ($("#eventPhoto" + eventId).attr("src"));
  var eventDate = ($("#eventDate" + eventId).text());
  var fullEventDescription = ($("#fullEventDescription" + eventId).text());
  var eventVenue = ($("#eventVenue" + eventId).text());
  var eventLat = ($("#eventVenueLat" + eventId).text());
  var eventLong = ($("#eventVenueLong" + eventId).text());
  var eventURL = ($("#fullEventURL" + eventId).text());


  var bookmarksObject = {

      eventTitle: eventTitle,
      eventPhoto: eventPhoto,
      eventDate: eventDate,
      fullEventDescription: fullEventDescription,
      eventId: eventId,
      eventVenue: eventVenue,
      eventURL: eventURL,
      eventLat: eventLat,
      eventLong: eventLong

  };

  localStorage.setItem("eventId", eventId);

  // bookmarks.push(bookmarksObject);
  // console.log(bookmarks);

  var userName = localStorage.getItem('userName');
  var exists = false;
  database.ref().child(userName+"/bookmarks").once("value", function(snapshot){
      console.log("EVENT ID "+eventId);
      console.log(snapshot.hasChild(eventId));
      if(snapshot.hasChild(eventId)){
          notify("You already saved this event!");
          exists = true;
      }

  }).then(function(snapshot){
      if(!exists){
          database.ref().child(userName+"/bookmarks/"+eventId).set(bookmarksObject).then(function(snapshot){

              notify("This has been Added!");
      
          });
      }
  });

};


function initMap() {
  markerArray = []
  myLatLng = { lat: latitude, lng: longitude };
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 12,
    mapTypeId: 'terrain'
  })};

  function notify(message){

    UIkit.notification({
        message: message,
        status: 'success',
        timeout: 2000
    });

};

function locationRatingButton(eventId){

    localStorage.setItem("eventTitle", $("#eventTitle" + eventId).text());
    localStorage.setItem("eventLocation", $("#eventLocation" + eventId).text());

};

function removeMarkerForEvent(eventId){
  var foundIndex = 0;
  for(var i=0; i < markerArray.length; i++){
    var currentMarker = markerArray[i];
    if(currentMarker.eventId == eventId){
      //matched. remove the marker.
      foundIndex = i;
      currentMarker.setMap(null);
    }
  }
  markerArray.splice(foundIndex,1);
  zoomMapToFitMarkers();
}

function removeEventFromBookmark(eventId){

    var userName = localStorage.getItem('userName');

    database.ref().child(userName+"/bookmarks").orderByChild("bookmarks").on("child_added", function(snapshot){
        if(snapshot.val().eventId == eventId){
            database.ref().child(userName+"/bookmarks/"+eventId).remove().then(function(snapshot){

                notify("This event has been removed!");
                removeMarkerForEvent(eventId);
                $(".eventCard" + eventId).hide();

            });
        }
    });

};

$("#signUp1").on("click",function()
  {
    window.open("preworkSignUp.html");
  })
  $("#logIn1").on("click",function()
  {
    window.open("preworkLogIn.html");
  
});

$("#logOut1").on("click",function()
    {
      $("#logOut1").hide();
       $("#bookmark1").hide();
      $("#signUp1").show();
      $("#logIn1").show();
      $("#loginUser").hide();
      localStorage.clear();
      
});

  $body = $("body");
  $(document).on({
      ajaxStart: function() { $body.addClass("loading");    },
       ajaxStop: function() { $body.removeClass("loading"); }    
  });