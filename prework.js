$(document).ready(function()
{
  var city = "";
if(navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(function(position)
    {
        console.log("Location Available");
        console.log(position.coords.longitude+","+position.coords.latitude);
        $.ajax({
            type:"GET",
            url:"https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&key=AIzaSyCPnrEUe-GDsavDjTaLAaVR8bKZ15QOTVc",
            data:{},
            success:function(data)
            {
                console.log("Entered success");
                if(data.status === "OK")
                {
                    console.log(data.results);
                    if(data.results.length>0)
                    {
                        console.log("Entered the if");
                        $("#para1").html(data.results[0].formatted_address); 
                        city=data.results[0].address_components[4].long_name; 
                        console.log(city);
                        $(".currentCity").text("-"+city.toUpperCase());
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
      var name ;
      var emailId;
      var age;
      var gender;
      var password;
      var database = firebase.database();
    var location;
    var keys;
    var ref = database.ref();

    $("#image1").on("click", function()
    {
        location=$("#image1").attr("alt");
       console.log(location);
        window.open("preworkSignin.html");
       
    })
    $("#button1").on("click",function()
    {
      console.log("clicked");
        name=$("#text1").val();
        emailId=$("#email1").val();
        age = $("#text2").val();
        gender = $("#select1").val();
        password=$("#password1").val();
        console.log(name);
        database.ref().push({
          dbName:name,
          dbEmail:emailId,
          dbAge:age,
          dbGender:gender,
          dbPassword:password
        });
    })

    $("#button2").on("click",function()
    {
      console.log("LogIn");
      window.open("preworkLogIn.html","_self");
    })
    $("#logInButton1").on("click",function()
    {
      var loginName = $("#loginText1").val();
      var loginPassword=$("#loginPassword1").val();
      console.log(loginName);
      console.log(loginPassword);
      for(var i =0;i<keys.length;i++)
      {
        console.log(keys[i]);
        if(keys[i].dbName === loginName && keys[i].dbPassword===loginPassword)
        {
          alert("Success");
        }
      }
    })

    $("#backButton1").on("click",function()
    {
      window.open("preworkSignin.html","_self")
    })

    database.ref().on("child_added",function(snapshot)
    {
      console.log(snapshot.val());
        keys = snapshot.val();
        console.log(keys);
    })

    
})
// var name;
// var role;
// var startDate;
// var monthlyRate;
// var database =firebase.database();
// $("#button1").on("click",function()
// {
//    name = $("#text1").val();
//    role=$("#text2").val();
//    startDate=$("#text3").val();
//    monthlyRate=$("#text4").val();
//    database.ref().push(
//        {
//         dbName:name,
//         dbRole:role,
//         dbStartDate:startDate,
//         dbMonthlyRate:monthlyRate
//  } );
// })
    

