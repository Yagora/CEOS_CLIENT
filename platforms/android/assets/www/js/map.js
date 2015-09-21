
function onSuccess(position)  {
  var 
    latLong = new google.maps.LatLng(latitude, longitude),
    mapOptions = {
      center: latLong,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
  newLL = new google.maps.LatLng(45.733635, 4.836649),
  distance = google.maps.geometry.spherical.computeDistanceBetween(newLL, latLong);

  longitude = position.coords.longitude;
  latitude = position.coords.latitude;


  map = new google.maps.Map(document.getElementById("geolocation"), mapOptions);
}

function onError(error) {
  alert('code: ' + error.code + '\n' + 'message : ' + error.message + '\n');
}

function markers(loki){
  var
    latLong = new google.maps.LatLng(loki.latitude, loki.longitude),
    marker = new MarkerWithLabel({
       position: latLong,
       map: map,
       draggable: false,
       raiseOnDrag: true,
       labelContent: loki.id, // your number
       labelAnchor: new google.maps.Point(0, 60),
       labelClass: "labels", // the CSS class for the label
       labelInBackground: false
     });

  google.maps.event.addListener(marker, 'click', function() {
    toastLoki(loki);
  });

}

function toastLoki(loki) {

  toastr["info"](loki.tag + "<br /><img src='data:image/jpeg;base64," + loki.photo + "'/><a onclick='askLoki("+ loki +")'>" + loki.lokiName + "</a>");

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": 0,
    "extendedTimeOut": 0,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    "tapToDismiss": false
  }
}

function askLoki(loki){
  //ask for the loki with its id
      // loki.id

  // show the dialog of the loki on front of the map

  // create a receiveLoki on common and innerhtml to fill the dialog with the photo

}
