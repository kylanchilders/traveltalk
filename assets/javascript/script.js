
var map;
//var latitude = 47.6062 
//var longitude = -122.3321
var latitude = parseFloat(localStorage.getItem("latitude"))
var longitude = parseFloat(localStorage.getItem("longitude"))
var numOfEventsToDisplay = 10
var calcLong = 0;
var calcLat = 0;

function google() {
  var search = $("#search-name").val();
  console.log(search)
  secondURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyCPnrEUe-GDsavDjTaLAaVR8bKZ15QOTVc"
  queryautocom = "https://cors-anywhere.herokuapp.com/" + secondURL;
  $(".uk-slider-items").empty();
  
  $.ajax({
    url: queryautocom,
    method: "GET",
    dataType: "json",
    // this headers section is necessary for CORS-anywhere
    headers: {
      "x-requested-with": "xhr"
    },
    // error: function (XMLHttpRequest, textStatus, errorThrown) {
    //   alert("Status: " + textStatus); alert("Error: " + errorThrown);
    // },
    success: function (data1) {
      console.log(queryautocom);
      longitude = data1.results[0].geometry.location.lng;
      console.log(longitude);
      latitude = data1.results[0].geometry.location.lat
      console.log(latitude)
      eventbrite();
    }
  })
};

function eventbrite() {
  var auth = "S5UUTS2NYPECCKBYF5JY";
  var bookmarks = [];
  var eventsID = [];

  function addEventCard(event) {


    var eventId = event.id;
    var template = `
      <li class="card eventCard##EVENT-ID##" style="width: 18rem; order: 1" tabindex="-1" class="uk-active">
          <img class="card-img-top eventPhoto##EVENT-ID##" src="" alt="Card image cap" style="height: 165px;">
          <div class="card-body">
              <h4 class="eventTitle##EVENT-ID##" style="text-align: center"></h4>
              <h6>Date of Event: <span class="eventDate##EVENT-ID##"></span></h6>
              <br>
              <div class="ratingArea##EVENT-ID##">
                <p style="margin: 0;">Venue Rating:</p>
                <img src="./assets/images/star-icon-empty.png" class="1star##EVENT-ID##" style="height: 20px; width: 20px;" onclick="1star('##EVENT-ID##'); return false;">
                <img src="./assets/images/star-icon-empty.png" class="2star##EVENT-ID##" style="height: 20px; width: 20px;">
                <img src="./assets/images/star-icon-empty.png" class="3star##EVENT-ID##" style="height: 20px; width: 20px;">
                <img src="./assets/images/star-icon-empty.png" class="4star##EVENT-ID##" style="height: 20px; width: 20px;">
                <img src="./assets/images/star-icon-empty.png" class="5star##EVENT-ID##" style="height: 20px; width: 20px;">
              </div>
              <div class="row text-center">
                  <a id="addEventButton##EVENT-ID##" href="#" class="btn btn-primary" style="margin: 10px">+</a>
                  <a id="removeEventButton##EVENT-ID##" href="#" class="btn btn-primary" style="margin: 10px">-</a>
                  <a id="moreInfoButton##EVENT-ID##" data-toggle="modal" data-target="#exampleModalLong##EVENT-ID##" class="btn btn-primary" style="margin: 10px">More Info</a>
              </div>
          </div>
      </li>
  `;

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

    template = template.replace(/##EVENT-ID##/g, eventId);
    modalTemplate = modalTemplate.replace(/##EVENT-ID##/g, eventId);

    $("body").after(modalTemplate);

    $(".uk-slider-items").append(template);


    $(".eventPhoto" + eventId).attr("src", event.logo.original.url);
    $(".eventTitle" + eventId).text(event.name.text);
    $(".eventDate" + eventId).text(moment(event.start.local).format('MMMM Do YYYY, h:mm a'));
    $(".eventDescription" + eventId).text(event.description.text.substring(0, 150) + "...");
    $(".moreInfoButton" + eventId).attr("href", event.url);
    $(".fullEventDescription" + eventId).text(event.description.text);
    $(".venueName" + eventId).text(event.venue.name);
    $(".venueAddress1" + eventId).text(event.venue.address.address_1);
    $(".venueAddress2" + eventId).text(event.venue.address.city + ", " + event.venue.address.region + " " + event.venue.address.postal_code);

    //Rating System//

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

  function getEventByLatLong(latitude, longitude) {

    var eventURL = "https://www.eventbriteapi.com/v3/events/search/?token=" + auth + "&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue";

    $.ajax({
      url: eventURL,
      method: "GET"
    }).then(function (response) {

      for (var i = 0; i < numOfEventsToDisplay; i++) {
        var currentEvent = response.events[i];
        var eventLongitude = currentEvent.venue.longitude;
        var eventLatitude = currentEvent.venue.latitude;
        console.log(response)
        console.log(eventLatitude, eventLongitude);
        calcLat = parseFloat(calcLat) + parseFloat(eventLatitude)
        calcLong = parseFloat(calcLong) + parseFloat(eventLongitude)

        addEventCard(currentEvent);
      }
      avgLat = (calcLat / 10)
      avgLong = (calcLong / 10)
      calcLat = 0
      calcLong = 0


      myLatLng = { lat: avgLat, lng: avgLong };
      map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 12,
        mapTypeId: 'terrain'
      });

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


$("#search-name").on('keyup', function (e) {
  if (e.which == 13) {
    google();

  }
})

$("#search").on("click", function () {
  google()
});

//RatingSystem//



//Rating End//

$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});


eventbrite();

