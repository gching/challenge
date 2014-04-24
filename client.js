// client.js
// April 22, 2014
// Gavin Ching
// Used to test server given from the challenge from Ubergrape

var WebSocket = require('ws')
  , ws = new WebSocket('ws://localhost:8080');

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
  // Get the lengths of the two strings inputted.
  var n = a.length;
  var m = b.length;

  // Create an array that stores the lengths of the subproblems, eventually finding
  // the solution.
  // Array will be two-dim with n+1 rows and m+1 columns.
  var commonLength = new Array(n+1);
  for (var i = 0; i<=n; i++){
    commonLength[i] = new Array(m+1);
  }
  // Preset the base case when it reaches the 0 indexes to be a 0\
  for(var i = 1; i<=n; i++){
    commonLength[i][0] = 0;

  }
  for(var i = 0; i<=m; i++){
    commonLength[0][i] = 0;

  }


  // Go through the 2 strings using two for loops and iterate through depending
  // on the case. Depending on the situation, it will go into another subproblem.
  // Start at indexes [1][1] for the two dim array to incorporate the base case
  // of 0.
  for(var i = 0; i<n; i++){
    for(var j = 0; j<m; j++){
      // Case when the two letters are the same. Add 1 to the length.
      if (a[i] == b[j]){
        commonLength[i+1][j+1] = commonLength[i][j] + 1;
      }
      // Case when they do not equal, so take on the previous greater length.
      // If the case when the decremented string a has a larger common seq than
      // the decremented string b, then get that value of the length as it is
      // the max of the 2 choices/cases.
      else if(commonLength[i][j+1] >= commonLength[i+1][j] ){
        commonLength[i+1][j+1] = commonLength[i][j+1];

      }
      // Case when decremented string b has a higher common sequence compared to
      // the case of the decremented string a.
      else{
        commonLength[i+1][j+1] = commonLength[i+1][j];
      }
    }
  }
  // Last index of the two dimensional array contains the LCS.
  return commonLength[n][m];
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
  try{
    data = JSON.parse(message)
  }catch(e){
    console.log(message);
    return;
  }

  // If token is defined, take it and save it in global variable.
  // After send the challenge UberGrape wants me to do!
  if (isDefined(data["token"])){
    console.log("Recieved token %s", data['token']);
    set_token(data['token']);
    //token = data["token"];
    console.log('My current token is %s', globalToken["current"]);
    // Send dat challenge :>.
    ws.send(
      JSON.stringify({"token": globalToken["current"],"please": "let me do the challenge"})
    );
    console.log("SENDING CHALLENGE");
  }

  // Bring it on!
  if (isDefined(data["challenge"])){

    var bigResult = challenge_accepted(data["challenge"]["a"], data["challenge"]["b"]);
    ws.send(JSON.stringify({"token": globalToken["current"],"please": "I have the solution","solution": bigResult}));
  }



});
