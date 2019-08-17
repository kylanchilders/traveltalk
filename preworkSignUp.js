
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
  var valueFound = false;
  var checkValueFound =false;
  var arrName=[];
    var arrPassword = [];
    $("#logOut1").hide();
    $("#bookmark1").hide();
    var localValue = localStorage.getItem("userName");
   
       if(localValue)
      {
        // loggedInUser=;
            // console.log(loggedInUser);
            console.log(localValue);
            $("#navBarMain").append("<li class='lists' id='loginUser'>"+localValue+"</li>");
            console.log("appended");
            $("#logOut1").show();
            $("#bookmark1").show();
          $("#logIn1").hide();
          $("#signUp1").hide();
      }
      else
      {
        console.log("Nothing");
      }

    $("#submitButton1").on("click",function()
    {
   
      window.open("index.html","_self");
    })
    $("#signUp1").on("click",function()
  {
    window.open("preworkSignUp.html");
  })
  $("#logIn1").on("click",function()
  {
    window.open("preworkLogIn.html");
  })
  
  function validateMyForm()
{
  if($("#text1").val() === "")
      {
        
        alert("Please fill the field");
        return false;
      }
     else if($("#text2").val() === "")
      {
        alert("Please fill the field");
        return false;
      }
     else if($("#email1").val() === "")
      {
        alert("Please fill the field");
        return false;
      }
     else if($("#select1").val() === "Select")
      {
        alert("Please select a value");
        return false
      }
      else if($("#password1").val() === " ")
      {
        alert("Please fill the field");
        return false;
      }

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

  window.open("preworkLogIn.html","_self");
  return true;
  
}

function loginValidationForm()
{

  if($("#loginText1").val()=== "")
  {
    alert("Please fill the field");
    return false;
  }
 else if($("#loginPassword1").val()==="")
  {
    alert("Please fill the field");
    return false;
  }
 
  var userInputName = $("#loginText1").val();
      var userInputPassword = $("#loginPassword1").val();
    var foundUserName = null;
    var foundUserPassword = null;
      console.log(arrName);
      console.log(arrPassword);
      for(var i= 0;i<arrName.length;i++)
      {
        if(arrName[i] === userInputName)
        {
          foundUserName = arrName[i];
        }
      }
      for(var i =0;i<arrPassword.length;i++)
      {
        if(arrPassword[i] === userInputPassword)
        {
          foundUserPassword = arrPassword[i];
        }
      }
      if(foundUserName !== null && foundUserPassword !== null)
      {
        var success;
        var loggedInUser;

        


       //window.open("maps.html","_self");
        localStorage.setItem("userName",foundUserName);
        localStorage.setItem("userPassword",foundUserPassword);
        var localValue = localStorage.getItem("userName");
       
       if(localValue)
      {
        // loggedInUser=;
            // console.log(loggedInUser);
            console.log(localValue);
            $("#navBarMain").append("<li class='lists' id='loginUser'>"+localValue+"</li>");
            console.log("appended");
            $("#logOut1").show();
            $("#bookmark1").show();
            $("#logIn1").hide();
            $("#signUp1").hide();
      }
      else
      {
        console.log("Nothing");
      }
        
      }
      else{
        alert("You are not registered.Register First!!");
        window.open("preworkSignUp.html","_self");
      }
      window.open("index.html","_self");
  return  true;
}
$("#button1").on("click",validateMyForm);
// $("#button1").on("click",function()
//     {
      
//         console.log("clicked");
//         name=$("#text1").val();
//         emailId=$("#email1").val();
//         age = $("#text2").val();
//         gender = $("#select1").val();
//         password=$("#password1").val();
//         console.log(name);
//         var userNameObject = {
//             dbName:name,
//             dbEmail:emailId,
//             dbAge:age,
//             dbGender:gender,
//             dbPassword:password
//         };
       
//         database.ref().child(name).set(userNameObject);
//         alert("Successfully SignedUp");
//         window.open("preworkLogIn.html","_self");
//     })
    $("#button2").on("click",function()
    {
      console.log("LogIn");
      window.open("preworkLogIn.html","_self");

    $("#logInButton1").on("click",loginValidationForm);
    // $("#logInButton1").on("click",function()
    // {
    //   var userInputName = $("#loginText1").val();
    //   var userInputPassword = $("#loginPassword1").val();
    // var foundUserName = null;
    // var foundUserPassword = null;
    //   console.log(arrName);
    //   console.log(arrPassword);
    //   for(var i= 0;i<arrName.length;i++)
    //   {
    //     if(arrName[i] === userInputName)
    //     {
    //       foundUserName = arrName[i];
    //     }
    //   }
    //   for(var i =0;i<arrPassword.length;i++)
    //   {
    //     if(arrPassword[i] === userInputPassword)
    //     {
    //       foundUserPassword = arrPassword[i];
    //     }
    //   }
    //   if(foundUserName !== null && foundUserPassword !== null)
    //   {
    //     var success;
    //     var loggedInUser;
    //     alert("LogIn Successful");

    //    //window.open("maps.html","_self");
    //     localStorage.setItem("userName",foundUserName);
    //     localStorage.setItem("userPassword",foundUserPassword);
    //     var localValue = localStorage.getItem("userName");
       
    //    if(localValue)
    //   {
    //     // loggedInUser=;
    //         // console.log(loggedInUser);
    //         console.log(localValue);
    //         $("#navBarMain").append("<li class='lists' id='loginUser'>"+localValue+"</li>");
    //         console.log("appended");
    //         $("#logOut1").show();
    //         $("#logIn1").hide();
    //         $("#signUp1").hide();
    //   }
    //   else
    //   {
    //     console.log("Nothing");
    //   }
        
    //   }
    //   else{
    //     alert("You are not registered.Register First!!");
    //     window.open("preworkSignUp.html","_self");
    //   }
    // })
    $("#logOut1").on("click",function()
    {
      $("#logOut1").hide();
       $("#bookmark1").hide();
      $("#signUp1").show();
      $("#logIn1").show();
      $("#loginUser").hide();
      localStorage.clear();
    })
    database.ref().on("child_added",function(snapshot)
    {
      console.log("Entered databaser read");
        arrName.push(snapshot.val().dbName);
        arrPassword.push(snapshot.val().dbPassword);
 })

