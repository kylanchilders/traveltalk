$("#seaButton").on("click", function(){
    
    localStorage.setItem("latitude", 47.6062);
    localStorage.setItem("longitude", -122.3321);
    console.log(localStorage)
    window.location = "./maps.html";
});

$("#sanFranButton").on("click", function(){
    
    localStorage.setItem("latitude", 37.7749);
    localStorage.setItem("longitude", -122.4194);
    console.log(localStorage)
    window.location = "./maps.html";
});
$("#parisButton").on("click", function(){
    
    localStorage.setItem("latitude", 48.8566);
    localStorage.setItem("longitude", 2.3522);
    console.log(localStorage)
    window.location = "./maps.html";
});
$("#athensButton").on("click", function(){
    
    localStorage.setItem("latitude", 37.9838);
    localStorage.setItem("longitude", 23.7275);
    console.log(localStorage)
    window.location = "./maps.html";
});
$("#madridButton").on("click", function(){
    
    localStorage.setItem("latitude", 40.4168);
    localStorage.setItem("longitude", -3.7038);
    console.log(localStorage)
    window.location = "./maps.html";
});
$("#hKButton").on("click", function(){
    
    localStorage.setItem("latitude", 22.3193);
    localStorage.setItem("longitude", 114.1694);
    console.log(localStorage)
    window.location = "./maps.html";
});