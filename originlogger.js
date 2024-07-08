(function () {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js');
    }
})();

const channel = new MessageChannel();
const iframe = document.getElementById('iframe');
const output = document.getElementById('history');
const clientButton = document.getElementById('postMessageTest');
const messageInput = document.getElementById('messageInput');

function appendOutput(msg) {
    var log = output.textContent;
    output.textContent = log + msg + "\n";
}

window.addEventListener('message', function(event) {
    console.log("[PostMessage] Got initial message from " + event.origin);
    appendOutput("Got initial message.");

    var port = event.ports[0];
    if (typeof port === 'undefined') return;

    console.log("[PostMessage] Got message port.");
    appendOutput("Got message port.");

    port.postMessage("Connected");
    clientButton.disabled = false;

    clientButton.addEventListener('click', function() {
        const message = messageInput.value;
        port.postMessage(message);
    });

    port.onmessage = function(event) {
        console.log("[PostMessage] Got Message: " + event.data);
        appendOutput(event.data);
        port.postMessage("ACK " + event.data);
    };
});

// Example of sending an initial message to establish the communication
iframe.addEventListener("load", () => {
    iframe.contentWindow.postMessage("Hello from main page", "*", [channel.port2]);
});

channel.port1.onmessage = handleMessage;

function handleMessage(e) {
    appendOutput(e.data);
}
