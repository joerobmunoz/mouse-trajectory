
var simulate = (function () {
    var canvas,
        lastMouseX,
        lastMouseY,
        mousePosCircle;

    var objects = [];
    const BODY_MARGIN = 5

    function init(canvasId) {
        canvas = document.getElementById(canvasId);
        canvas.width  = document.documentElement.clientWidth - BODY_MARGIN; 
        canvas.height = document.documentElement.clientHeight - BODY_MARGIN;
    }

    function _redrawCursor(ctx, x, y) {
        if (!mousePosCircle) {
            console.error("Mouse cursor object does not exist.");
        }

        ctx.beginPath();
        mousePosCircle = new Path2D();
        mousePosCircle.moveTo(x, y);
        mousePosCircle.arc(x, y, 25, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fill(mousePosCircle);
    }

    function updateCurrentPos(x, y) {
        var ctx = canvas.getContext('2d');  

        if (!mousePosCircle) {
            mousePosCircle = new Path2D();
        }

        // if (!lastMouseX || !lastMouseY) {
        //     throw "Re-render called without mouse movement.";
        // }

        ctx.clearRect(0,0,canvas.width,canvas.height);

        // Update current cursor
        _redrawCursor(ctx, x, y);

        // Update trajectory illustration: TODO

        lastMouseX = x;
        lastMouseY = y;
    }

    return {
        init: init,
        updateCurrentPos: updateCurrentPos,
    }
})();