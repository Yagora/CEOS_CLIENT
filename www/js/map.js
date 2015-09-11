
function onSuccess(position)  {

        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(latitude, longitude);

        var mapOptions = {
            center: latLong,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("geolocation"), mapOptions);

        markers(45.738712, 4.839438, map);
        markers(45.733635, 4.836649, map);
        markers(45.735417, 4.836756, map);
        markers(45.737229, 4.838409, map);


        var newLL = new google.maps.LatLng(45.733635, 4.836649);

        console.log(google.maps);

        var distance = google.maps.geometry.spherical.computeDistanceBetween(newLL, latLong);

        console.log(distance);
    }


function onError(error) {
        alert('code: ' + error.code + '\n' + 'message : ' + error.message + '\n');
    }

function markers(latitude, longitude, map){
        var latLong = new google.maps.LatLng(latitude, longitude);

        var marker = new google.maps.Marker({
            position: latLong,
            map: map,
            title:"New Sighting"
        });

    }