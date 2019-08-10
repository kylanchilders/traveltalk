var queryURL = "http://dataservice.accuweather.com/currentconditions/v1/351409?apikey=y19ljE9enoIiYwNP3GWqpi7jyPEYrldx&language=en-us&details=false"



$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response)
    console.log(response[0].WeatherText);

    $("#weatherInfo").append("<div>" + response.WeatherText);
});

