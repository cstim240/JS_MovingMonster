// Prof: Saeed Mirjalili
/* Tim Supan
CPSC 1045
July 14, 2022 */

/*jshint esversion: 6 */

// global variables
const GRID_SIZE = 20;
let x, y, h, w, shapeColor;
let r;
let monster, showGrid;
let ctx;
let moveStep = 5;

function setup() { //forEach element with the inValue class is assigned the event handler, change, when the drawOnCanvas is called
    document.querySelectorAll('.inValue').forEach(function (item) { //the variable item refers to the x,y,w,h, etc variables on top of the canvas
        item.addEventListener('change', drawOnCanvas); //adds the change event to all elements/select options under the class inValue
    });

    document.querySelectorAll('.moveBtn').forEach(function (item) { //adds click event to all buttons in the class moveBtn
        item.addEventListener('click', moveBtnClick);
    });

    //below are event handlers, calling a function when a specific event occurs
    document.getElementById('drawingBox1').addEventListener('mousedown', canvasMouseDown); 
    document.getElementById('drawingBox1').addEventListener('keydown', canvasKeyDown);
    document.getElementById('drawingBox1').addEventListener('mousewheel', canvasMouseWheel);

    drawOnCanvas();
}


function drawShapes(ctx, x, y, w, h, shapeColor) {
    'use strict';
    switch (monster) {
        case 'happyM':
            drawHappyMonster(ctx, x, y, w, h, shapeColor);
            break;
        case 'angryM':
            drawAngryMonster(ctx, x, y, w, h, shapeColor);
            break;
    }

    if (showGrid === true) {
        drawGrid(ctx, GRID_SIZE);    // this function draws grid with 20 vertical lines
    }
}

function drawHappyMonster(ctx, cornerX, cornerY, monsterWidth, monsterHeight, monsterColor) {
    "use strict";
    ctx.save();
    ctx.translate(cornerX, cornerY);

    let wUnit = monsterWidth / 16,
        hUnit = monsterHeight / 22;

    //legs
    drawLine(ctx, 5 * wUnit, 15 * hUnit, 3.5 * wUnit, 22 * hUnit, "#ffa500", 1 * wUnit);
    drawLine(ctx, 11 * wUnit, 15 * hUnit, 12.5 * wUnit, 22 * hUnit, "#ffa500", 1 * wUnit);

    //feet
    drawSemicircle(ctx, 2 * wUnit, 22 * hUnit, 2 * wUnit, "#ffa500", "#ffa500", 1, true);
    drawSemicircle(ctx, 14 * wUnit, 22 * hUnit, 2 * wUnit, "#ffa500", "#ffa500", 1, true);

    //body
    drawCircle(ctx, 8 * wUnit, 8 * hUnit, 8 * wUnit, monsterColor, monsterColor, 1);

    //eyes
    drawCircle(ctx, 4 * wUnit, 6 * hUnit, 2 * wUnit, "white", "white", 1);
    drawCircle(ctx, 8 * wUnit, 6 * hUnit, 2 * wUnit, "white", "white", 1);
    drawCircle(ctx, 12 * wUnit, 6 * hUnit, 2 * wUnit, "white", "white", 1);

    //pupils
    drawCircle(ctx, 4 * wUnit, 6 * hUnit, wUnit / 2, "black", "Black", 1);
    drawCircle(ctx, 8 * wUnit, 6 * hUnit, wUnit / 2, "black", "black", 1);
    drawCircle(ctx, 12 * wUnit, 6 * hUnit, wUnit / 2, "black", "black", 1);

    //mouth
    drawSemicircle(ctx, 8 * wUnit, 10 * hUnit, 4 * wUnit, "black", "black", 1);

    //teeth
    drawTriangle(ctx, 6 * wUnit, 12 * hUnit, -2 * wUnit, -2 * hUnit, "white", "white", 1);
    drawTriangle(ctx, 8 * wUnit, 12 * hUnit, 2 * wUnit, 2 * hUnit, "White", "white", 1);
    drawTriangle(ctx, 10 * wUnit, 12 * hUnit, -2 * wUnit, -2 * hUnit, "white", "white", 1);
    ctx.restore();
}

function drawAngryMonster(ctx, cornerX, cornerY, monsterWidth, monsterHeight, monsterColor) {
    "use strict";
    ctx.save();
    ctx.translate(cornerX, cornerY);

    let wUnit = monsterWidth / 16,
        hUnit = monsterHeight / 22;

    //legs
    drawLine(ctx, 4.5 * wUnit, 11 * hUnit, 4.5 * wUnit, 17 * hUnit, "#700301", 1 * wUnit);
    drawLine(ctx, 11.5 * wUnit, 11 * hUnit, 11.5 * wUnit, 17 * hUnit, "#700301", 1 * wUnit);

    //feet
    drawSemicircle(ctx, 4.5 * wUnit, 18 * hUnit, 1.5 * wUnit, "#370005", "#370005", 1, true);
    drawSemicircle(ctx, 11.5 * wUnit, 18 * hUnit, 1.5 * wUnit, "#370005", "#370005", 1, true);

    //body
    drawDiamond(ctx, 8 * wUnit, 2 * hUnit, 16 * wUnit, 16 * wUnit, monsterColor, monsterColor, 1);

    //eye
    drawCircle(ctx, 8 * wUnit, 6 * hUnit, 2 * wUnit, "white", "white", 1);
    drawCircle(ctx, 8 * wUnit, 6 * hUnit, wUnit / 2, "black", "black", 1);

    //mouth
    drawRectangle(ctx, 5 * wUnit, 10 * hUnit, 6 * wUnit, 2 * hUnit, "black", "black", 1);

    //teeth
    drawRectangle(ctx, 6 * wUnit, 10 * hUnit, 1 * wUnit, 1 * hUnit, "white", "white", 1);
    drawRectangle(ctx, 9 * wUnit, 10 * hUnit, 1 * wUnit, 1 * hUnit, "white", "white", 1);
    drawRectangle(ctx, 7.5 * wUnit, 11 * hUnit, 1 * wUnit, 1 * hUnit, "white", "white", 1);
    ctx.restore();
}

function setDrawingValues() {
    'use strict';

    // x coordinate of the top-left corner of the shape
    x = +document.getElementById("x").value;
    // y coordinate of the top-left corner of the shape
    y = +document.getElementById("y").value;
    // the width of the whole shape
    w = +document.getElementById("width").value;
    // the height of the whole shape
    h = +document.getElementById("height").value;

    shapeColor = document.getElementById("shapeColor").value;
    monster = document.getElementById("monsterSelect").value;
    showGrid = document.getElementById("showGrid").checked;
    moveStep = +document.getElementById("moveStep").value;
    ctx = getCanvasContext('drawingBox1');
}

function drawOnCanvas() {
    setDrawingValues();  // we get the user inputs and set the values to x,y,w,h respectively 
    clearCanvas(ctx);     // we define clearCanvas function for only readability and not for saving computer memory or making our program faster
    drawShapes(ctx, x, y, w, h, shapeColor);
    ctx.canvas.focus();
}

function moveShape(ctx, direction, moveStep) {
    "use strict";
    switch (direction) {
        case 'NW':
            x -= moveStep;
            y -= moveStep;
            if (x < 0)
                x = 0;
            if (y < 0)
                y = 0;
            break;
        case 'N':
            y -= moveStep;
            if (y < 0)
                y = 0;
            break;
        case 'NE':
            x += moveStep;
            y -= moveStep;
            if (x > ctx.canvas.width - w)
                x = ctx.canvas.width - w;
            if (y < 0)
                y = 0;
            break;
        case 'W':
            x -= moveStep;
            if (x < 0)
                x = 0;
            break;
        case 'E':
            x += moveStep;
            if (x > ctx.canvas.width - w)
                x = ctx.canvas.width - w;
            break;
        case 'SW':
            x -= moveStep;
            y += moveStep;
            if (x < 0)
                x = 0;
            if (y > ctx.canvas.height - h)
                y = ctx.canvas.height - h;
            break;
        case 'S':
            y += moveStep;
            if (y > ctx.canvas.height - h)
                y = ctx.canvas.height - h;
            break;
        case 'SE':
            x += moveStep;
            y += moveStep;
            if (x > ctx.canvas.width - w)
                x = ctx.canvas.width - w;
            if (y > ctx.canvas.height - h)
                y = ctx.canvas.height - h;
            break;
        case 'C':
            x = (ctx.canvas.width - w) / 2;    // setting the x to the center of the canvas horizontally
            y = (ctx.canvas.height - h) / 2;   // setting the y to the center of the canvas vertically
            break;
        default:
            alert("Undefined direction!");
    }
    clearCanvas(ctx);
    updateValues(x, y);  // if we do not update values in x and y input boxes, later when we change the values in the input box, the monster will not be drawn in the last position. Comment out this line of code and then move the monster around, then change x and y on the page and see what happens.
    drawShapes(ctx, x, y, w, h, shapeColor);
}

function updateValues(x, y) {
    document.getElementById("x").value = x;
    document.getElementById("y").value = y;
}

function moveBtnClick(e) { //e represents the event object that is given by the browser
    moveShape(ctx, e.currentTarget.id, moveStep);
    updateValues(x, y, w, h);
}

function canvasMouseDown(e) {
    if ((e.offsetX + w / 2 <= ctx.canvas.width) && (e.offsetY + h / 2 <= ctx.canvas.height) && (e.offsetX >= w / 2) && (e.offsetY >= h / 2)) {
        updateValues(e.offsetX - w / 2, e.offsetY - h / 2, w, h);
    }

    else if ((e.offsetX > ctx.canvas.width - w / 2)) { //right side: if offsetX is less than ctx.canvas.width - w/2, it automatically sets x as canvas.width - w, making it so that the monster never exceeds the right border
        x = ctx.canvas.width - w;
        document.getElementById("x").value = x;
        document.getElementById("y").value = e.offsetY - h / 2;
    }

    else if ((e.offsetX < w / 2)) { //left side border restriction
        x = 0;
        document.getElementById("x").value = x;
        document.getElementById("y").value = e.offsetY - h / 2;

    }
    else if ((e.offsetY > ctx.canvas.height - h / 2)) { //bottom side border restriction
        y = ctx.canvas.height - h;
        document.getElementById("y").value = y;
        document.getElementById("x").value = e.offsetX - w / 2;
    }
    else if ((e.offsetY < h / 2)) { //top side
        y = 0;
        document.getElementById("y").value = y;
        document.getElementById("x").value = e.offsetX - w / 2;
    }


    drawOnCanvas();
}

function updateValues(x, y, w, h) {
    document.getElementById("x").value = x;
    document.getElementById("y").value = y;
    document.getElementById("width").value = w;
    document.getElementById("height").value = h;
}

function canvasKeyDown(e) { //add in selection statements to limit movement of monster so it doesn't go beyond border
    e.preventDefault();
    switch (e.code) {
        case 'ArrowUp':
            if (e.shiftKey) {
                moveShape(ctx, 'NW', moveStep);
            }
            else if (e.ctrlKey) {
                moveShape(ctx, 'NE', moveStep);
            }
            else {
                moveShape(ctx, 'N', moveStep);
            }
            break;

        case 'ArrowDown':
            if (e.shiftKey) {
                moveShape(ctx, 'SW', moveStep);
            }
            else if (e.ctrlKey) {
                moveShape(ctx, 'SE', moveStep);
            }
            else {
                moveShape(ctx, 'S', moveStep);
            }
            break;

        case 'ArrowLeft':
            if (e.shiftKey) {
                moveShape(ctx, 'NW', moveStep);
            }
            else if (e.ctrlKey) {
                moveShape(ctx, 'SW', moveStep);
            }
            else {
                moveShape(ctx, 'W', moveStep);
            }
            break;

        case 'ArrowRight':
            if (e.shiftKey) {
                moveShape(ctx, 'NE', moveStep);
            }
            else if (e.ctrlKey) {
                moveShape(ctx, 'SE', moveStep);
            }
            else {
                moveShape(ctx, 'E', moveStep);
            }
            break;
        default:
            if (e.shiftKey && e.ctrlKey && e.altKey) {
                moveShape(ctx, 'C', moveStep);
            }
            break;
    }
    updateValues(x, y, w, h);
}

function canvasMouseWheel(e) {
    r = w / h; //r is the aspect ratio of w and h 
    e.preventDefault();
    if (e.ctrlKey) {
        if (e.deltaY < 0) { //if deltaY is negative, the wheel moved forward
            w += 2;//make monster bigger
        }
        else if (e.deltaY >= 0) {
            w -= 2;
        }
        h = w / r;
    }
    updateValues(x, y, w, h);
    drawOnCanvas();
}
