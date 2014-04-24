// challenge.js
// April 22, 2014
// Gavin Ching
// Connects to given server and outputs the given answer for the challenge!

var challengeFunc = function() {
  var globalToken = {},

  connect = function() {
        var ws = new WebSocket('ws://localhost:8080');

        ws.onopen = function () {
          // Send let me in message!
          ws.send(JSON.stringify({'please': "let me in"}));
        };

        ws.onmessage = function (message) {
          var data = {};
          //var token = null;
          // Message is the recieved token in JSON. Extract it into the token variable
          // Assumption is it does return a valid to token!
          try{
            data = JSON.parse(message.data)
          }catch(e){
            var thanks =  document.querySelector('div#thanks');
            thanks.innerHTML = message.data;
            return;
          }


          // If token is defined, take it and save it in global variable.
          // After send the challenge UberGrape wants me to do!
          if (isDefined(data["token"])){
            set_token(data['token']);
            // Send dat challenge :>.
            ws.send(
              JSON.stringify({"token": globalToken["current"],
              "please": "let me do the challenge"})
            );
          }

          // Bring it on!
          if (isDefined(data["challenge"])){
            var bigResult =
            challenge_accepted(data["challenge"]["a"], data["challenge"]["b"]);
            yolo =  document.querySelector('div#yolo');
            yolo.innerHTML = "Result is " + "<strong>" + bigResult +"</strong>" + " from string "
            + data["challenge"]["a"] + " and " + data["challenge"]["b"];

          }

        };

    },

  set_token = function(given_token){
    globalToken["current"] = given_token;
  },

  isDefined = function(x) {
    var undefined;
    return x !== undefined;
  };

  return {
        connect: connect
  };

}();
