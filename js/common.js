var
  socket = io.connect('http://localhost:9999/'),
  subscribe = false;

  function initialize() {
    var height =  (document.body.clientHeight);
    document.getElementById("loginPage").style.height = height + 'px';

  }
$(document).ready( function() {
  initialize();
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
  socket.on('getUser', function (userId) {
    console.log(userId);
  });

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
});
