"use strict";

/**
 * Created by Serhii on 12.01.2017.
 */

//-----------------------------------------------------
// style map
// стили для того чтобы сделать карту с серым фономб также с помощью этих стилей можно настроить разный цвет карты
//-----------------------------------------------------
var styleArray = [{
    featureType: "all",
    stylers: [{ saturation: -80 }]
}, {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ hue: "#00ffee" }, { saturation: 50 }]
}, {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
}];

//-----------------------------------------------------
// global vars
//-----------------------------------------------------
var idMap = $('#map'),
    image = idMap.attr("data-url-marker"),
    // take url marker from attribute data-url-marker
location_adress = idMap.attr("title"); // take adress from attribute title


//-----------------------------------------------------
// инициализация карты
//-----------------------------------------------------
function initMap() {

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        scrollwheel: false,
        draggable: true,
        center: { lat: -34.397, lng: 150.644 },
        styles: styleArray
    });
    var geocoder = new google.maps.Geocoder();

    geocodeAddress(geocoder, map);
}

//-----------------------------------------------------
// преобразование адресса в географические координаты
//-----------------------------------------------------
/*
 Geocoding is the process of converting addresses (like "1600 Amphitheatre Parkway, Mountain View, CA")
 into geographic coordinates (like latitude 37.423021 and longitude -122.083739),
 which you can use to place markers or position the map.
*/

function geocodeAddress(geocoder, resultsMap) {
    geocoder.geocode({ 'address': location_adress }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                icon: image
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}