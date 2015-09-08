var
  socket = io.connect('http://localhost:9999/'),
  subscribe = false,
  heightPage;

  function initialize() {
    heightPage =  (document.body.clientHeight);
    document.getElementById("loginPage").style.height = heightPage + 'px';
    document.getElementById("mapPage").style.height = heightPage + 'px';

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
$(document).ready( function() {
  initialize();

  socket.on('getUser', function (user) {
    if (user.statusCode == 200) {
      window.location = "#mapPage";
    }
    if (user.statusCode == 404) {
      console.log('kikou');
      var html = '<div style="color:red"><p>Wrong login or password.</p></div>';
      document.getElementById('errorConnexion').innerHTML = html;
    }
  });
});
