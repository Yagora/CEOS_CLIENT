
function onSuccess(position)  {

  longitude = position.coords.longitude;
  latitude = position.coords.latitude;
  var latLong = new google.maps.LatLng(latitude, longitude);

  var mapOptions = {
    center: latLong,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("geolocation"), mapOptions);

  markers(45.738712, 4.839438, map);
  markers(45.733635, 4.836649, map);
  markers(45.735417, 4.836756, map);
  markers(45.737229, 4.838409, map);


  var newLL = new google.maps.LatLng(45.733635, 4.836649);

  var distance = google.maps.geometry.spherical.computeDistanceBetween(newLL, latLong);

  console.log(distance + ' m entre le centre et le simply');
}

function onError(error) {
  alert('code: ' + error.code + '\n' + 'message : ' + error.message + '\n');
}

function markers(loki){
  var latLong = new google.maps.LatLng(loki.latitude, loki.longitude);

  var marker = new MarkerWithLabel({
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

  toastr["info"](loki.tag + "<br /><a onclick='askLoki("+ loki +")'>" + loki.lokiName + "</a>");

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