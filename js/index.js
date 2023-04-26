"use strict";

// de leaflet library is reeds geimporteerd, en beschikbaar als "L"
// dit via de script en css tag in de index.html, en de "map" div die werd toegevoegd.


const app = {
    map: null, // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
    init() {
        app.loadMarkers();
        app.addMarker();
        // initialise de kaart
        let map = L.map('map').setView([50.846349, 4.3562011], 13);

        // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
        // vergeet openstreetmap attributie niet
        L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([50.8420957, 4.3199809]).addTo(map)
            .bindPopup('Erasmushogeschool Brussel')
            .openPopup();
        // gebruik de functie "loadMarkers" om de markers toe te voegen
    },
    loadMarkers() {
        // fetch de data van opendata.brussels.be
        fetch('https://bruxellesdata.opendatasoft.com/api/records/1.0/search/?dataset=toiletten&q=')
            .then(function (response) {
                return response.json();
            })
            .then(function (APIdata) {
                console.log(APIdata);

                const allData = APIdata.records;

                allData.forEach(function (toiletteData) {
                    // console.log(toiletteData.geometry);
                    const coordinates = toiletteData.geometry;
                    // console.log(coordinates.coordinates);

                    const lat = coordinates.coordinates[0];
                    const lon = coordinates.coordinates[1];
                    app.addMarker(lat, lon);
                });
            });
        // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart


    },
    addMarker(lat, lon) {
        console.log(lat);
        console.log(lon);
        // voeg een marker toe op lat, lon

        // L.marker([lat, lon]).addTo(app.map)
        //     .bindPopup('Erasmushogeschool Brussel')
        //     .openPopup();
    }
};

app.init();