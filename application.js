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

