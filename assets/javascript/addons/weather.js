var queryURL = "http://dataservice.accuweather.com/currentconditions/v1/"

var apiKey = "?apikey=y19ljE9enoIiYwNP3GWqpi7jyPEYrldx&language=en-us&details=false"

var Cities = {
    London: "328328",
    Paris: "623",
    Seattle: "351409",
    SanFrancisco: "347629",
    NewYork: "349727",
    HongKong: "1123655",
    Johannesburg: "305448",
    Perth: "26797",
    Madrid: "308526",
    Greece: "182536"
};

const locationKeys = Object.values(Cities)


for (i = 0; i < locationKeys.length; i++){
    currentURL = queryURL + locationKeys[i] + apiKey;
    
    $.ajax({
        url: currentURL,
        method: "GET"
    }).then(function(response){
        $("#weatherInfo").append("<div>" + "Conditions: " + response[0].WeatherText + "</div><br><div>Temperature: " + response[0].Temperature.Imperial.Value + "</div>")
    });
}

