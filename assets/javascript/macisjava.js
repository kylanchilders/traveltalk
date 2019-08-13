var auth = "S5UUTS2NYPECCKBYF5JY";
var bookmark = [];

function addEventCard(event){
    var eventId = event.id;
    var template = `
        <div id="eventCard##EVENT-ID##" class="card" style="width:18rem;background-color:black;height:100px;">
            <img id="eventPhoto##EVENT-ID##" class="card-img-top" src="" alt="Card image cap">
            <div class="card-body">
                <h4 id="eventTitle##EVENT-ID##" style="text-align: center"></h4>
                <h6>Date of Event: <span id="eventDate##EVENT-ID##"></span></h6>
                <p id="eventDescription##EVENT-ID##" class="card-text"></p>
                <br>
                <div class="row text-center">
                    <a  id="addEventButton##EVENT-ID##" href="#" class="btn btn-primary" style="margin: 10px">+</a>
                    <a id="removeEventButton##EVENT-ID##" href="#" class="btn btn-primary" style="margin: 10px">-</a>
                    <a id="moreInfoButton##EVENT-ID##" target="sblank" href="#" class="btn btn-primary" style="margin: 10px">More Info</a>
                </div>
            </div>
        </div>
    `;
    template = template.replace(/##EVENT-ID##/g, eventId);
    $("#eventCardBody").append(template);
    $("#eventPhoto" + eventId).attr("src", event.logo.original.url);
    $("#eventTitle" + eventId).text(event.name.text);
    $("#eventDate" + eventId).text(moment(event.start.local).format('MMMM Do YYYY, h:mm a'));
    $("#eventDescription" + eventId).text(event.description.text.substring(0, 150) + "...");
    $("#moreInfoButton" + eventId).attr("href", event.url);
};

function getEventByLatLong(latitude, longitude) {

    var eventURL = "https://www.eventbriteapi.com/v3/events/search/?token=" + auth + "&location.longitude=" + longitude + "&location.latitude=" + latitude + "&expand=venue";

    $.ajax({
        url: eventURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        for(var i = 0; i < 10; i++){
            var currentEvent = response.events[i];
            var eventTitle = currentEvent.name.text;
            var eventDate = currentEvent.start.local;
            var eventDescription = currentEvent.description.text;
            var eventTwo = eventDescription.substring(0,150) + "...";
            var eventImage = currentEvent.logo.original.url;

            var eventLongitude = currentEvent.venue.longitude;
            var eventLatitude = currentEvent.venue.latitude;

            console.log(eventLatitude, eventLongitude);
            addEventCard(currentEvent);
        } 

    
    });


};

$("addEventButton").on("click", function(){

});
$("removeEventButton").on("click", function(){

});
getEventByLatLong(47.6062, -122.3321);