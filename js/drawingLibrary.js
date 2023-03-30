// Prof: Saeed Mirjalili
/* Tim Supan
CPSC 1045
July 14, 2022 */

/*jshint esversion: 6 */
/*
 * All functions for drawing shapes are stored in this file.
 * This is for organizing our code. For big software projects, it is important.
 */

//clears the canvas
function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// draws grid on the canvas
function drawGrid(ctx, gridDivision) {
    'use strict';
    // local constants
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    // local variables
    let gridWidth = canvasWidth / gridDivision;
    let gridHeight = canvasHeight / gridDivision;

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = '#aabbee';
    ctx.setLineDash([5, 3]);

    for (let col = gridWidth; col < canvasWidth; col += gridWidth) {
        ctx.moveTo(col, 0);
        ctx.lineTo(col, canvasHeight);
        ctx.stroke();
    }

    for (let row = gridHeight; row < canvasHeight; row += gridHeight) {
        ctx.moveTo(0, row);
        ctx.lineTo(canvasWidth, row);
        ctx.stroke();
    }
    ctx.restore();
}

function getCanvasContext(canvasID) {
    'use strict';
    let ctx;  // local variable

    //let myVar = 1;
    // cnv = document.getElementById("drawingBox");
    // ctx = cnv.getContext("2d");

    // I can write the following line instead of the above two lines. They are the same, 
    // the line below uses only one variable ctx, and we do not need to use the variable cnv
    ctx = document.getElementById(canvasID).getContext("2d");

    return ctx;
}
function drawCircle(ctx, centerX, centerY, radius, strokeColor, fillColor, strokeWidth) {
    "use strict";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = strokeWidth;
    ctx.fill();
    ctx.stroke();
}

function drawSemicircle(ctx, centerX, centerY, radius, strokeColor, fillColor, strokeWidth, upperHalf) {
    "use strict";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI, upperHalf);
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = strokeWidth;
    ctx.fill();
    ctx.stroke();
}

function drawTriangle(ctx, cornerX, cornerY, triangleWidth, triangleHeight, strokeColor, fillColor, strokeWidth) {
    "use strict";
    ctx.beginPath();
    ctx.moveTo(cornerX, cornerY);
    ctx.lineTo(cornerX + triangleWidth / 2, cornerY + triangleHeight);
    ctx.lineTo(cornerX - triangleWidth / 2, cornerY + triangleHeight);
    ctx.closePath();
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
    ctx.fill();

}

function drawLine(ctx, startX, startY, endX, endY, strokeColor, strokeWidth) {
    "use strict";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
}

function drawDiamond(ctx, cornerX, cornerY, dWidth, dHeight, strokeColor, fillColor, strokeWidth) {
    "use strict";
    ctx.beginPath();
    ctx.moveTo(cornerX, cornerY);
    ctx.lineTo(cornerX - dWidth / 2, cornerY + dHeight / 2);
    ctx.lineTo(cornerX, cornerY + dHeight);
    ctx.lineTo(cornerX + dWidth / 2, cornerY + dHeight / 2);
    ctx.closePath();
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
    ctx.fill();
}

function drawRectangle(ctx, cornerX, cornerY, rectWidth, rectHeight, strokeColor, fillColor, strokeWidth) {
    "use strict";
    ctx.beginPath();
    ctx.rect(cornerX, cornerY, rectWidth, rectHeight);
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
    ctx.fill();
}