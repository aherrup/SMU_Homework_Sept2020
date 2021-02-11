$(document).ready(function() {
    makeMap();
})

function makeMap() {
    // calling the url not using the data already pulled in data folder
    var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

    // Perform a GET request to the query URL
    $.ajax({
        type: "GET",
        url: queryUrl,
        success: function(data) {
            console.log(data.features);
            // calling the function to build the map
            buildMap(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

function buildMap(data) {
    // Step 0: Create the Tile Layers
    // Add a tile layer
    var dark_mode = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/dark-v10",
        accessToken: API_KEY
    });

    var light_mode = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });

    // STEP 1: INIT MAP
    // Create a map object
    myMap = L.map("mapid", {
        center: [40.5994, -96.6731],
        zoom: 4.1,
        layers: [light_mode, dark_mode]
    });


    // Define function to set the circle color based on the magnitude

    var circleMarkers = [];


    data.features.forEach(function(item) {
        var circle = L.geoJSON(item, {
            style: (feature) => circleSettings(feature),
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng);
            },
            onEachFeature: onEachFeature
        });
        circleMarkers.push(circle);
    });


    var circle_group = L.layerGroup(circleMarkers);
    circle_group.addTo(myMap);

    // Create Layer Legend
    var baseMaps = {
        "Light Mode": light_mode,
        "Dark Mode": dark_mode
    };

    var overlayMaps = {
        "Circles": circle_group
    };
    // Slap Layer Legend onto the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    // Add legend to the map
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function(map) {

        var div = L.DomUtil.create('div', 'info legend'),
            depth = [-10, 10, 30, 50, 70, 90],
            colors = ["#F6AA1C", "#D97212", "#BC3908", "#941B0C", "#621708", "#220901"];


        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < depth.length; i++) {
            div.innerHTML +=
                '<i style="background:' + (colors[i]) + '"></i> ' +
                depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
    };

    legend.addTo(myMap);
}



function circleSettings(feature) {
    var circleOptions = {
        radius: radiusSize(feature.properties.mag),
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        color: "ivory",
        opacity: 0.3,
        fillOpacity: 0.7
    }

    return (circleOptions);
}

function radiusSize(strength) {
    return strength * 5;
}

function chooseColor(quakeDepth) {
    if (quakeDepth < 10) {
        return "#F6AA1C"
    } else if (quakeDepth < 30) {
        return "#D97212"
    } else if (quakeDepth < 50) {
        return "#BC3908"
    } else if (quakeDepth < 70) {
        return "#941B0C"
    } else if (quakeDepth < 90) {
        return "#621708"
    } else {
        return "#220901"
    }
}

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.place) {
        layer.bindPopup(`<strong>${feature.properties.place}</strong><hr><strong>Strength: ${feature.properties.mag}<strong>`);
    }
}