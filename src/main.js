var map = L.map('map').setView([53.5, -8], 7);
    map.options.minZoom = 2;

// Development purposes only, ignore.
// var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
     
var MapBoxLight = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2VyZW5kb2xtYSIsImEiOiJjam9vZWZjM2wxaGx3M3Bsc2gya3hlM3ZkIn0.h5NY1p7um8zNKnRHxnVrxQ', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //id: 'cerendolma/cknrm6yvk0w6r17mjae8mdsfi',
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

var pinkIcon = L.icon({
    iconUrl: 'assets/images/marker.png',
    iconSize:     [60, 60], // size of the icon
    iconAnchor:   [30, 50],
    popupAnchor:  [0, -45] // point from which the popup should open relative to the iconAnchor
  });

var marker = {}

// code from the following : 
$.get('./proofread.csv', function(csvString) {
    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;

    // For each row in data, create a marker and add it to the map
    // For each row, columns `Latitude`, `Longitude`, and `Title` are required
    for (var i in data) {
        var row = data[i];
        
        var marker = L.marker([row.Latitude, row.Longitude], 
            {title: row.Title, 
            poem: row.Poem,
            opacity: 0.8, 
            icon: pinkIcon}).addTo(map);

        // if the sidebar doesn't work, change row.Title to rowPoem
        // marker.bindPopup(row.Title);

        marker.on('click', function () {
            sidebar.show();
            console.log(this.options.title);
            document.getElementById("Title").innerHTML = this.options.title;
            document.getElementById("Poem").innerHTML = this.options.poem;

        })
    }
});

var sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: 'right'
});

map.addControl(sidebar);

setTimeout(function () {
    sidebar.show();
}, 500);

map.on('click', function () {
    sidebar.hide();
})

L.DomEvent.on(sidebar.getCloseButton(), 'click', function () {
    console.log('Close button clicked.');
});

