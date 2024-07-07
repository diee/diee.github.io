(function () {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js');
    }

})();

const channel = new MessageChannel();
const clientButton = document.getElementById('postMessageTest');

window.addEventListener("message", function (event) {
  // We are receiveing messages from any origin, you can check of the origin by
  // using event.origin
  console.log("origin message start --->");
  console.log("ports: " + event.ports);
  // get the port then use it for communication.
  var port = event.ports[0];
  if (typeof port === 'undefined') return;
  
  // Post message on this port.
  port.postMessage("Connected");
  clientButton.addEventListener('click', function() {
      port.postMessage("User clicked the button!");
  });

 /*clientButton.addEventListener('click', function() {
        port.postMessage("User clicked the button!");
    });

    port.onmessage = function(event) {
        console.log("[PostMessage] Got Message: " + event.data);
        appendOutput(event.data);
        port.postMessage("ACK " + event.data);
    };*/
});

// var ua = navigator.userAgent.toLowerCase();
// var isAndroid = ua.indexOf("android") > -1;
// alert(ua + isAndroid);
// if(!isAndroid) {
//     iframe.addEventListener("load", () => {
//         window.postMessage("Inital s", "*", [channel.port1]);
//       });
//       channel.port2.onmessage = handleMessage;
      
//       function handleMessage(e) {
//          appendOutput(e.data)
//         }
      
// }

  


