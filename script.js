//Def. airports
let airports = {};

fetch("airports.json")
.then(response => response.json())
.then(data => {
    airports = data;
});

function searchAirport(inputId, resultsId){
let query = document.getElementById(inputId).value.toLowerCase()
let resultsBox = document.getElementById(resultsId)
    
resultsBox.innerHTML = ""
    
if(query.lenght < 2) return 
    
let count = 0    
    
for(let code in airports){

if(count >= 10) break
    
let airport = airports[code]

if(
code.toLowerCase().includes(query) ||
airport.name.toLowerCase().includes(query)
airport.city.toLowerCase().includes(query)
airport.country.toLowerCase().includes(query)
){

let div = document.createElement("div")
div.className = "result-item"
div.innerText = code + " - " + airport.city + "(" + airport.name + ")"

div.onclick = function(){
document.getElementById(inputId).value = code
resultsBox.innerHTML = ""
}

resultsBox.appendChild(div)

count++
    
}
}
}

function calculate() {

if (Object.keys(airports).length === 0) {
    alert("Airport database still loading.");
    return;
}
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
let dLat = lat1 - lat2
let dLon = lon1 - lon2

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
document.getElementById("from").addEventListener("input", function(){
    searchAirport("from", "from-results")
})
document.getElementById("to").addEventListener("input", function(){
    searchAirport("to", "to-results")
})








