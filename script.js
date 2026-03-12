//Def. airports
let airports = {};

fetch("airports.json")
.then(response => response.json())
.then(data => {
    airports = data;
});

function calculate() {

//Def. route
let from = document.getElementById("from").value.replace(/\s+/g,"").toUpperCase()
let to = document.getElementById("to").value.replace(/\s+/g,"").toUpperCase()



//Def. origin & destination
 let origin = airports[from]
let destination = airports[to]
if (!origin || !destination) {
    alert("Airport not found");
    return;
}

// Def. lats and lons in R
let lat1 = origin.lat*Math.PI/180
let lon1 = origin.lon*Math.PI/180
let lat2 = destination.lat*Math.PI/180
let lon2 = destination.lon*Math.PI/180

//Def. dLat and dLon
let dLat = lat1-lat2
let dLon = lon1-lon2

//Haversine Form. 
 let a = Math.sin(dLat/2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon/2)**2
let c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

// Def. distance
 let distanceog = 6371*c
let distance = distanceog.toFixed(3);

// Def. time
 let timeog = distance/850
let time = timeog.toFixed(1);

//Def. messages given
let message1 = "Route: " + from + " → "+ to
let message2 = "Distance: " + distance +  " km"
let message3 = "Time to destination: " + time + " h"

document.getElementById("Route").innerText = message1;
document.getElementById("Distance").innerText = message2;
document.getElementById("Time").innerText = message3;
document.getElementById("container").style.display = "block";
}


