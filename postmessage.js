(function () {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js');
    }

})();

const iframe = document.querySelector("iframe");
const channel = new MessageChannel();

window.addEventListener("message", function (event) {
  console.log("[PostMessage] Got initial message.");
  appendOutput("Got initial message.");
  const clientButton = document.getElementById('butMessageClient');

  var port = event.ports[0];
  if (typeof port === 'undefined') return;
  
  console.log("[PostMessage1] Got message port. ");
  appendOutput("Got message port.");

  iframe.contentWindow.postMessage("this should be delivered to an iframe", "*", [port]);
  alert(event.origin);
  port.onmessage = function(event) {
    console.log("[PostMessage] Got Message: " + event.data + " " + event.origin);
    alert(event.origin);
    appendOutput(event.data);
  };
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

  
const output = document.getElementById('history');

function appendOutput(msg) {
    var log = output.textContent;
    output.textContent = log + msg + "\n"
};



