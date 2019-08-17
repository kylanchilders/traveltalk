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
// this function that dynamically adds html to the dom 
// passing our event through as a variable 
function addEventCard(event){
  // declaring a variable called eventId and assigning it the value of the id within the event return by the ajax call
  var eventId = event.id;
  // dynamically creating our html within JavaScript to display for each individual event
  // because we dynamically printed our html with javascript we can call our .on("click", function()) from within the buttons themselves.
  // we are going to write it like: onclick="functionName('##EVENT-ID##'); return false;"
  // the return false prevents the page from reloading to the top
  var template = `
      <li id="eventCard##EVENT-ID##" class="card" style="width: 18rem;" tabindex="-1" class="uk-active">
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
                  <a id="removeEventButton##EVENT-ID##" href="#" class="removeEventButton btn btn-primary" style="margin: 5px" onclick="removeEventFromBookmark('##EVENT-ID##'); return false;">-</a>
                  <a  id="eventRatingButton##EVENT-ID##" href="#" class="eventRatingButton btn btn-primary" style="margin: 5px" onclick="locationRatingButton('##EVENT-ID##'); return false;">*</a>
                  <a id="moreInfoButton##EVENT-ID##" target="sblank" href="#" class="btn btn-primary" style="margin: 5px">More Info</a>
              </div>
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
  
  // dynamically grab the different html elements and assigning them values from the API call to EventBrite
  // using "#eventPhoto" concatenate with eventId
  // add and attribute with .attr("src") 
  // using our (event) we are using in our function we are going to return the value of that events logo.original.url
  // that will return the url for the events photo so we can display it in our "#eventPhoto" div
  $("#eventPhoto" + eventId).attr("src", event.logo.original.url);
  $("#eventTitle" + eventId).text(event.name.text);
  // using moment to format the event date to display it in a more friendly way
  $("#eventDate" + eventId).text(moment(event.start.local).format('MMMM Do YYYY, h:mm a'));
  // taking the text of our ventDescription and caping the text at 150 characters
  $("#eventDescription" + eventId).text(event.description.text.substring(0, 150) + "...");
  // this is storing the entire eventDescription
  $("#fullEventDescription" + eventId).text(event.description.text);
  $("#eventLocation" + eventId).text(event.venue.name);
  $("#moreInfoButton" + eventId).attr("href", event.url);
};
// Here we have a similar function to the one called addEventCard
// this function will run on items we have stored in firebase using our bookmarks option
function addEventCardFromDB(event){
  // the event object has the same structure as the bookmark object 
  var eventId = event.eventId;
  var template = `
    <li id="eventCard##EVENT-ID##" class="card" style="width: 18rem;" tabindex="-1" class="uk-active">
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
                <a id="removeEventButton##EVENT-ID##" href="#" class="removeEventButton btn btn-primary" style="margin: 5px" onclick="removeEventFromBookmark('##EVENT-ID##'); return false;">-</a>
                <a  id="eventRatingButton##EVENT-ID##" href="#" class="eventRatingButton btn btn-primary" style="margin: 5px" onclick="locationRatingButton('##EVENT-ID##'); return false;">*</a>
                <a id="moreInfoButton##EVENT-ID##" target="sblank" href="#" class="btn btn-primary" style="margin: 5px">More Info</a>
            </div>
        </div>
    </li>
`;
  template = template.replace(/##EVENT-ID##/g, eventId);
  $(".uk-slideshow-items").append(template);
  // instead of this information coming from our ajax call to EventBrite this is coming from Firebase
  $("#eventPhoto" + eventId).attr("src", event.eventPhoto);
  $("#eventTitle" + eventId).text(event.eventTitle);
  $("#eventDate" + eventId).text(event.eventDate);
  // because we stored the fullEventDescription instead of the substring we need to run the function again
  // caping our fullEventDescription return from firebase this time at 150 characters
  $("#eventDescription" + eventId).text(event.fullEventDescription.substring(0, 150) + "...");
  $("#fullEventDescription" + eventId).text(event.fullEventDescription);
  $("#eventLocation" + eventId).text(event.eventLocation);
  $("#moreInfoButton" + eventId).attr("href", event.eventInfo);
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
    events = response.events;
    initMap();
    let infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < numOfEventsToDisplay; i++) {
      addEventCard(events[i]);
      addMapMarker(events[i],infowindow);
    }
  });
  console.log(eventURL);
};
// function google() {
//   var search = $("#search-name").val();
//   console.log(search)
//   secondURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyCPnrEUe-GDsavDjTaLAaVR8bKZ15QOTVc"
//   queryautocom = "https://cors-anywhere.herokuapp.com/" + secondURL;
  
//   $.ajax({
//     url: queryautocom,
//     method: "GET",
//     dataType: "json",
//     // this headers section is necessary for CORS-anywhere
//     headers: {
//       "x-requested-with": "xhr"
//     },
//     // error: function (XMLHttpRequest, textStatus, errorThrown) {
//     //   alert("Status: " + textStatus); alert("Error: " + errorThrown);
//     // },
//     success: function (data1) {
//       console.log(queryautocom);
//       longitude = data1.results[0].geometry.location.lng;
//       console.log(longitude);
//       latitude = data1.results[0].geometry.location.lat
//       console.log(latitude)
//       $(".uk-slider-items").empty();
//       displayEventsByLatLong();
//     }
//   })
// };
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
$("#search").on("click", function () {
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
  var eventLocation = ($("#eventLocation" + eventId).text());
  var bookmarksObject = {
      eventTitle: eventTitle,
      eventPhoto: eventPhoto,
      eventDate: eventDate,
      fullEventDescription: fullEventDescription,
      eventId: eventId,
      eventLocation: eventLocation
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
// this function will be called on page open of the bookmarks 
function populateBookmarksPage(){
  // using our localStorage we are declaring a new variable called userName
  var userName = localStorage.getItem('userName');
  // returning a call from our database using .ref()
  // looking into the .child() under username we are going to create a branch
  // 
  database.ref().child(userName+"/bookmarks").orderByChild("bookmarks").on("child_added", function(snapshot){
      var tempEventCardInfo = snapshot.val();
      addEventCardFromDB(tempEventCardInfo);
      console.log(tempEventCardInfo);
  });
};
function initMap() {
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
function removeEventFromBookmark(eventId){
    var userName = localStorage.getItem('userName');
    database.ref().child(userName+"/bookmarks").orderByChild("bookmarks").on("child_added", function(snapshot){
        if(snapshot.val().eventId == eventId){
            database.ref().child(userName+"/bookmarks/"+eventId).remove().then(function(snapshot){
                notify("This event has been removed!");
                $("#eventCard" + eventId).hide();
            });
        }
    });
};
  $body = $("body");
  $(document).on({
      ajaxStart: function() { $body.addClass("loading");    },
       ajaxStop: function() { $body.removeClass("loading"); }    
  });
