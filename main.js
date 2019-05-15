
var tracking = (function () {
  var mousePos;
  var intervalHandle;

  document.onmousemove = handleMouseMove;

  function handleMouseMove(event) {
      var dot, eventDoc, doc, body, pageX, pageY;

      event = event || window.event; // IE-ism

      // If pageX/Y aren't available and clientX/Y are,
      // calculate pageX/Y - logic taken from jQuery.
      // (This is to support old IE)
      if (event.pageX == null && event.clientX != null) {
          eventDoc = (event.target && event.target.ownerDocument) || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;

          event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
      }

      mousePos = {
          x: event.pageX,
          y: event.pageY
      };
  }

  function getMousePosition() {
      var pos = mousePos;
      if (!pos) {
        // We haven't seen any movement yet
      }
      else {
        // Use pos.x and pos.y
      }
      return mousePos.x, mousePos.y
  }

  function init(intervalMs) {
    cancel()
    intervalHandle = setInterval(getMousePosition, intervalMs); // setInterval repeats every X ms
  }

  function cancel() {
    if (intervalHandle) {
      clearInterval(intervalHandle)
    }
  }
  
  function update() {
    // Update model parameters based on mousePos
  }

  function predict() {
    // Predict new pos based on model and time
      // f(t) = model(t)
  }

  return {
    init: init,
    cancel: cancel,
    getMousePosition: getMousePosition
  }
})();

