$(document).ready(function () {
  var auth = "S5UUTS2NYPECCKBYF5JY";
  var city = "";
  var latitude = "";
  var longitude = "";
  var pageNumber = 0;
  $("#logOut1").hide();
  $("#bookmark1").hide();
  var localValue = localStorage.getItem("userName");
  //alert(localValue);

  if (localValue) {
    // loggedInUser=;
    // console.log(loggedInUser);
    console.log(localValue);
    $("#navBarMain").append("<li class='lists' id='loginUser'>" + localValue + "</li>");
    console.log("appended");
    $("#logOut1").show();
    $("#bookmark1").show();
    $("#logIn1").hide();
    $("#signUp1").hide();
  }
  else {
    console.log("Nothing");
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Location Available");
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(position.coords.longitude + "," + position.coords.latitude);
      $.ajax({
        type: "GET",
        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyCPnrEUe-GDsavDjTaLAaVR8bKZ15QOTVc",
        data: {},
        success: function (data) {
          console.log("Entered success");
          if (data.status === "OK") {
            console.log(data.results);
            if (data.results.length > 0) {
              console.log("Entered the if");
              $("#para1").html(data.results[0].formatted_address);
              city = data.results[0].address_components[4].long_name;
              console.log("City = " + city);
              $(".currentCity").text("-" + city.toUpperCase());
              var baseWeatherURL = "http://dataservice.accuweather.com/currentconditions/v1/"

              var weatherApiKey = "?apikey=y19ljE9enoIiYwNP3GWqpi7jyPEYrldx&language=en-us&details=false"

              var locationKey = "";

              if (city == "London") {
                locationKey = "328328"
              } if (city == "Paris") {
                locationKey = "623"
              } if (city == "Seattle" || city == "King County") {
                locationKey = "351409"
              } if (city == "San Francisco") {
                locationKey = "347629"
              } if (city == "New York") {
                locationKey = "349727"
              } if (city == "Hong Kong") {
                locationKey = "1123655"
              } if (city == "Johannesburg") {
                locationKey = "305448"
              } if (city == "Perth") {
                locationKey = "26797"
              } if (city == "Madrid") {
                locationKey = "308526"
              } if (city == "Greece") {
                locationKey = "182536"
              };

              currentWeatherURL = baseWeatherURL + locationKey + weatherApiKey;

              $.ajax({
                url: currentWeatherURL,
                method: "GET"
              }).then(function (response) {
                console.log(response);
                $(".infoId1").attr("style", "height:430px;width:180px;border: 3px solid white")
                $(".infoId1").append("<h3 style='margin:5 0 0 0;font-size:17px;font-weight:bold;'>Current Weather</h3><h4 style='margin:0; font-size:20px;'>Temp: " + response[0].Temperature.Imperial.Value + "F</h4><br><h4 style='margin:0;font-size:20px;'>Conditions: " + response[0].WeatherText + "</h4>");
              });



              // $("#text1").val(city);
              // var cityValue=$("#text1").val();
            }
          }
          //console.log(data);
        }
      })

    })
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var dateToday = new Date();
  var m = monthNames[dateToday.getMonth()];
  var d = dateToday.getDate();
  $(".months").text(m);
  $(".dates").text(d);
  $("#locationId1").text($("#image1").attr("alt").toUpperCase());
  $("#locationId2").text($("#image2").attr("alt").toUpperCase());
  $("#locationId3").text($("#image3").attr("alt").toUpperCase());
  $("#locationId4").text($("#image4").attr("alt").toUpperCase());
  $("#locationId5").text($("#image5").attr("alt").toUpperCase());
  $("#locationId6").text($("#image6").attr("alt").toUpperCase());

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDCrkvNi0NrUuzyTIvMG59e58fAhl_p6Mk",
    authDomain: "traveltalk-1e69b.firebaseapp.com",
    databaseURL: "https://traveltalk-1e69b.firebaseio.com",
    projectId: "traveltalk-1e69b",
    storageBucket: "",
    messagingSenderId: "903453806895",
    appId: "1:903453806895:web:98061fcb91718e00"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var name;
  var emailId;
  var age;
  var gender;
  var password;
  var database = firebase.database();
  var location;
  var keys;
  var ref = database.ref();

  $("#image1").on("click", function () {
    location = $("#image1").attr("alt");
    console.log(location);
    window.open("preworkSignin.html");

  })
  $("#button1").on("click", function () {
    console.log("clicked");
    name = $("#text1").val();
    emailId = $("#email1").val();
    age = $("#text2").val();
    gender = $("#select1").val();
    password = $("#password1").val();
    console.log(name);
    database.ref().push({
      dbName: name,
      dbEmail: emailId,
      dbAge: age,
      dbGender: gender,
      dbPassword: password
    });
  })

  $("#button2").on("click", function () {
    console.log("LogIn");
    window.open("preworkLogIn.html", "_self");
  })
  $("#logInButton1").on("click", function () {
    var loginName = $("#loginText1").val();
    var loginPassword = $("#loginPassword1").val();
    console.log(loginName);
    console.log(loginPassword);
    for (var i = 0; i < keys.length; i++) {
      console.log(keys[i]);
      if (keys[i].dbName === loginName && keys[i].dbPassword === loginPassword) {
        alert("Success");
      }
    }
  })

  $("#backButton1").on("click", function () {
    window.open("preworkSignin.html", "_self")
  })

  database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    keys = snapshot.val();
    console.log(keys);
  })

  $("#previousSlide1").on("click", function () {
    if ($("img").attr("id").val() === "image1") {
      console.log("Hey seattle");
    }
    else if ($("img").attr("id").val() === "image2") {
      console.log("Hey Sanfrancisco");
    }
    else if ($("img").attr("id").val() === "image3") {
      console.log("Hey Paris");
    }

  })
  $("#nextSlide1").on("click", function () {
    if ($("img").attr("id").val() === "image1") {
      console.log("Hey seattle");
    }
    else if ($("img").attr("id").val() === "image2") {
      console.log("Hey Sanfrancisco");
    }
    else if ($("img").attr("id").val() === "image3") {
      console.log("Hey Paris");
    }

  })
  $("#signUp1").on("click", function () {
    window.open("preworkSignUp.html");
  })
  $("#logIn1").on("click", function () {
    window.open("preworkLogIn.html");
  })
  $("#logOut1").on("click", function () {
    $("#logOut1").hide();
    $("#bookmark1").hide();
    $("#signUp1").show();
    $("#logIn1").show();
    $("#loginUser").hide();
    localStorage.clear();

  })

})



