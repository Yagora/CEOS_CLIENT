var
//socket = io.connect('http://localhost:9999/'),
socket = io.connect('http://62.210.236.194:9999/'),
subscribe = false,
heightPage,
longitude,
latitude,
informationsUser = {},
map;



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

function sendLoki(mess) {
  var
  lokiName = document.getElementById("lokiName").value,
  tag = document.getElementById("tag").value,
  photo = document.getElementById("photo").value,
  description = document.getElementById("description").value;

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  socket.emit('addLoki', { 'lokiName' : lokiName, 'tag' : tag, 'photo' : photo, 'longitude' : longitude, 'latitude' : latitude, 'description': description });
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
  if (!navigator.camera) {
     alert("Camera API not supported", "Error");
     return;
  }

  navigator.camera.getPicture(function(imageURI) {

     document.getElementById("photo").value = imageURI;

  }, function(err) {
    alert('code: ' + error.code + '\n' + 'message : ' + error.message + '\n');
  }, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
    encodingType: 0     // 0=JPG 1=PNG
  });

  return false;
}

function askList(){
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  socket.emit('askList', { 'longitude' : longitude, 'latitude' : latitude});
}

function goToPage(location) {
  window.location = location;
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

$(document).ready( function() {
  initialize();
askList();
  socket.on('getUser', function (user) {
    if (user.statusCode == 200) {

      informationsUser.login = user.login;
      informationsUser.mdp = user.mdp;
      informationsUser.lastName = user.lastName;
      informationsUser.firstName = user.firstName;
      informationsUser.email = user.email;
      informationsUser.birthday = user.birthday;

      goToPage('#mapPage');
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
      askList();
    }
    if (user.statusCode == 404) {
      console.log('kikou');
      var html = '<div style="color:red"><p>Wrong login or password.</p></div>';
      document.getElementById('errorConnexion').innerHTML = html;
    }
  });

  socket.on('getLoki', function (loki){
    if (loki.statusCode == 200) {
      toast.success('Loki added !');
    }
    else {
      console.log('error Loki not added !');
      toast.error('code: ' + error.code + '\n' + 'message : ' + error.message + '\n');
    }
  });

  socket.on('getList', function (list){
   list.forEach(function (loki) {
     markers(loki);
   });
});

    //receive loki (socket)

});
