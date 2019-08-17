$(".seaButton").on("click", function(){
    
    localStorage.setItem("latitude", 47.6062);
    localStorage.setItem("longitude", -122.3321);
    console.log(localStorage)
    window.location = "./maps.html";
});

$(".sanFranButton").on("click", function(){
    
    localStorage.setItem("latitude", 37.7749);
    localStorage.setItem("longitude", -122.4194);
    console.log(localStorage)
    window.location = "./maps.html";
});
$(".parisButton").on("click", function(){
    
    localStorage.setItem("latitude", 48.8566);
    localStorage.setItem("longitude", 2.3522);
    console.log(localStorage)
    window.location = "./maps.html";
});
$(".athensButton").on("click", function(){
    
    localStorage.setItem("latitude", 37.9838);
    localStorage.setItem("longitude", 23.7275);
    console.log(localStorage)
    window.location = "./maps.html";
});
$(".madridButton").on("click", function(){
    
    localStorage.setItem("latitude", 40.4168);
    localStorage.setItem("longitude", -3.7038);
    console.log(localStorage)
    window.location = "./maps.html";
});
$(".hKButton").on("click", function(){
    
    localStorage.setItem("latitude", 22.3193);
    localStorage.setItem("longitude", 114.1694);
    console.log(localStorage)
    window.location = "./maps.html";
});

function google() {
    var search = $(".form-control").val();
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
      // error: function (XMLHttpRequest, textStatus, errorThrown) {
      //   alert("Status: " + textStatus); alert("Error: " + errorThrown);
      // },
      success: function (data1) {
        console.log(queryautocom);
        longitude = data1.results[0].geometry.location.lng;
        console.log(longitude);
        latitude = data1.results[0].geometry.location.lat
        console.log(latitude)
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
        window.location = "./maps.html"
      }
    })
  };

  $(".form-control").on('keyup', function (e) {
    if (e.which == 13) {
      google();
  
    }
  })
  
  $("#custom").on("click", function () {
    google()
  });