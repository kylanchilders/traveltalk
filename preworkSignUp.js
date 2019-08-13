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
  
$("#button1").on("click",function()
    {
        console.log("clicked");
        name=$("#text1").val();
        emailId=$("#email1").val();
        age = $("#text2").val();
        gender = $("#select1").val();
        password=$("#password1").val();
        console.log(name);
        var userNameObject = {
            dbName:name,
            dbEmail:emailId,
            dbAge:age,
            dbGender:gender,
            dbPassword:password
        };
       
        database.ref().child(name).set(userNameObject);
    })