(function () {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js');
    }

})();

const channel = new MessageChannel();
const clientButton = document.getElementById('postMessageTest');
document.getElementById("miBoton").addEventListener("click", function() {
    alert("¡Hola! Has hecho clic en el botón.");
});

window.addEventListener("message", function (event) {
    console.log("origin message start --->");
    console.log("ports: " + event.ports);
    
    var port = event.ports[0];
    if (typeof port === 'undefined') return;

    port.postMessage("Connected");

    clientButton.addEventListener('click', function() {
        port.postMessage("User clicked the button!");
    });

    port.onmessage = function(event) {
        console.log("[PostMessage] Got Message: " + event.data);
        appendOutput(event.data);
        port.postMessage("ACK " + event.data);
    };
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

  


