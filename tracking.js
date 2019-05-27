
var tracking = (function () {
    var mousePos, intervalHandle;

    function handleMouseMove(event) {
        var eventDoc, doc, body, pageX, pageY;

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
          return [0, 0]
        }
        return [mousePos.x, mousePos.y]
    }

    
    // TODO: This should be refactored to not swallow the main handler.
    // document.onmousemove = handleMouseMove;

    function init(intervalMs) {
      cancel();
      document.addEventListener('onmousemove', handleMouseMove); 
      intervalHandle = setInterval(getMousePosition, intervalMs); // setInterval repeats every X ms
    }

    function trackMouseMove(event, intervalMs=200) {
      /*

      */
      cancel();
      
    }

    function cancel() {
      document.removeEventListener('onmousemove', handleMouseMove); 
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

    // Objects
      // State Matrix
        // Variables being tracked (position, vel, acc) + rotational vars
      // Process Variable
        // Predictive error of measurements
      // Kalman Gain
        // 
      // Observed Data

    
    var stateVector;
    function initStateVector() {
      var x = 0,
          y = 0;
      if (!stateVector) {
        // Initialize state position
        x, y = getMousePosition();
        stateVector = tf.tensor([x, 0, 0, y, 0, 0]);
      }
      return stateVector;
    }

    function predictNewState(timeDiff) {
      const _A = tf.tensor([
        [1,      timeDiff,  (1/2)*timeDiff**2,  0,       0,          0],                  // x
        [0,      1,         timeDiff,           0,       0,          0],                  // x_vel
        [0,      0,         1,                  0,       0,          0],                  // x_acc
        [0,      0,         0,                  1,       timeDiff,   (1/2)*timeDiff**2],  // y
        [0,      0,         0,                  0,       1,          timeDiff],           // y_vel
        [0,      0,         0,                  0,       0,          1]                   // y_acc
      ]);
      

      // TODO: Is this matmul or mul in tfjs?
      const predictedStateVector = _A.mul(stateVector);
      return predictedStateVector;
    }

    function applyDynamicsModel(x, x_vel, x_acc, y, y_vel, y_acc, timeDiff) {
      _new_x = x + x_vel*timeDiff + .5*x_acc*timeDiff**2
      _new_y = y + y_vel*timeDiff + .5*y_acc*timeDiff**2;
      return x, y;
    }

    function predictNewPosition(timeDiffFuture) {
      const _stateVector = predictNewState(timeDiffFuture);
      const futureX = _stateVector.slice([0],[2]).sum()
      const futureY = _stateVector.slice([0],[2]).sum()
    }

    return {
      init: init,
      cancel: cancel,
      getMousePosition: getMousePosition,
    }
})();
