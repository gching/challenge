// client.js
// April 22, 2014
// Gavin Ching
// Used to test server given from the challenge from Ubergrape

var WebSocket = require('ws')
  , ws = new WebSocket('ws://localhost:8000');

// Global token variable
var globalToken = {};

// Set the token
function set_token(given_token) {
  globalToken["current"] = given_token;
  return;
}

// To see if its undefined.
function isDefined(x) {
  var undefined;
  return x !== undefined;
}


// To figure longest common subsequence given in the parameters.
// Returns the length of the LCS.
// Challenge accepted UberGrape.
function challenge_accepted(a, b){


  return;
}


// Open up connection and sending let me in!!!
ws.on('open', function() {

  // Send let me in message!
  ws.send(JSON.stringify({'please': "let me in"}));


});

// Recieve messages sent back from server.
ws.on('message', function(message) {
  var data = {};
  //var token = null;
  console.log("recieved %s", message)
  // Message is the recieved token in JSON. Extract it into the token variable
  // Assumption is it does return a valid to token!
  data = JSON.parse(message);

  // If token is defined, take it and save it in global variable.
  // After send the challenge UberGrape wants me to do!
  if (isDefined(data["token"])){
    console.log("Recieved token %s", data['token']);
    set_token(data['token']);
    //token = data["token"];
    console.log('My current token is %s', globalToken["current"]);
    // Send dat challenge :>.
    ws.send(
      JSON.stringify({"token": globalToken["current"],
      "please": "let me do the challenge"})
    );
  }

  // Bring it on!
  if (isDefined(data["challenge"])){
    challenge_accepted(data["challenge"]["a"], data["challenge"]["b"]);
  }



});
