var
socket = io.connect('http://62.210.236.194:9999/'),
subscribe = false,
heightPage;

function initialize() {
  heightPage =  (document.body.clientHeight);
  document.getElementById("loginPage").style.height = heightPage + 'px';
  document.getElementById("mapPage").style.height = heightPage + 'px';
  var newHeight =  Math.floor(heightPage / 1.10);
  document.getElementById("geolocation").style.height = newHeight  + 'px';
  document.getElementById("addLokiPage").style.height = heightPage + 'px';

}

function sendLogin(mess) {
  var
  login = document.getElementById("login").value,
  mdp = document.getElementById("mdp").value,
  lastName = document.getElementById("lastName").value,
  firstName = document.getElementById("firstName").value,
  email = document.getElementById("email").value,
  birthday = document.getElementById("birthday").value;

  if (!subscribe) {
    socket.emit('connexion', { 'login' : login, 'mdp' : mdp });
  }
  else {
    socket.emit('connexion', { 'login' : login, 'mdp' : mdp, 'lastName' : lastName, 'firstName' : firstName, 'email' : email, 'birthday' : birthday });
  }
  return false;


}

function display(id) {
  var elem = document.getElementById(id),
  btn_Connexion = document.getElementById("btn_connexion").innerHTML;

  if (elem.style.display == 'none') {
    elem.style.display = 'inline';
    subscribe = true;
    btn_Connexion = 'Subscribe';
  } else {
    elem.style.display = 'none';
    subscribe = true;
    btn_Connexion = 'Connexion';
  }
}

function takePicture() {
  navigator.camera.getPicture(function(imageURI) {

    console.log(imageURI);
    alert('La photo marche ' + imageURI);

  }, function(err) {

    alert('code: ' + error.code + '\n' + 'message : ' + error.message + '\n');
    console.log(err);

  }, cameraOptions);
}

function goToPage(location) {
  window.location = location;
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

$(document).ready( function() {
  initialize();

  socket.on('getUser', function (user) {
    if (user.statusCode == 200) {
      goToPage('#mapPage');
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    if (user.statusCode == 404) {
      console.log('kikou');
      var html = '<div style="color:red"><p>Wrong login or password.</p></div>';
      document.getElementById('errorConnexion').innerHTML = html;
    }
  });
});
