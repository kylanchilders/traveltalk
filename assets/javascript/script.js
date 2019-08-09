
//make a city search and then take those results and pass them into 

var map;
var latitude = 47.6062
var longitude = -122.3321

$("#search-name").on('keyup', function (e) {
  if (e.which == 13) {
    var search = $("#search-name").val();
    console.log(search)
    //secondURL = "https://api.opencagedata.com/geocode/v1/json?q=" + search +"&key=ce4024be27f7473587cd9b456f635db5";
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
        function getEventByLatLong(latitude, longitude) {

          var eventURL = "https://www.eventbriteapi.com/v3/events/search/?token=" + auth + "&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue";

          $.ajax({
            url: eventURL,
            method: "GET"
          }).then(function (response) {

            var currentEvent = response.events[0];
            var eventTitle = currentEvent.name.text;
            var eventDescription = currentEvent.description.text;
            var eventTwo = eventDescription.substring(0, 150) + "...";
            var eventImage = currentEvent.logo.original.url;

            var events = response.events

            var infowindow = new google.maps.InfoWindow();

            var marker, i;
            function markers() {
              for (i = 0; i < events.length; i++) {
                if (i < 10) {
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
      console.log(timestamp);
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

      function getEventByLatLong(latitude, longitude) {

        var eventURL = "https://www.eventbriteapi.com/v3/events/search/?token=" + auth + "&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue";

        $.ajax({
          url: eventURL,
          method: "GET"
        }).then(function (response) {

          var currentEvent = response.events[0];
          var eventTitle = currentEvent.name.text;
          var eventDescription = currentEvent.description.text;
          var eventTwo = eventDescription.substring(0, 150) + "...";
          var eventImage = currentEvent.logo.original.url;
          var events = response.events

          var infowindow = new google.maps.InfoWindow();

          var marker, i;
          function markers() {
            for (i = 0; i < events.length; i++) {
              if (i < 10) {
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

          $("#eventPhoto").attr("src", eventImage);
          $("#eventTitle").text(eventTitle);
          $("#eventDescription").text(eventTwo);

          $("#eventDescription").append("<button> <>")
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