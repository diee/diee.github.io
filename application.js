(function () {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js');
  }

})();




var response = "";
function appendOutput(msg) {
  response += msg + "\n";
  console.log(response);
};
function testFunction() {
  document.getElementById("surprisePic").src = "images/icons/gon.png";
};

function testFunctionMessage() {
  var port = event.ports[0];
  if (typeof port === 'undefined') return;

  // Post message on this port.
  port.postMessage("Test")

  // Receive upcoming messages on this port.
  port.onmessage = function(event) {
    console.log("[PostMessage1] Got message" + event.data);
  };
};

