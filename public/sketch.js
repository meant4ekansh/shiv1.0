var canvas, txt;
var socket, rslider;
var capture;
var data = {
  x : 0,
  y : 0,
  r : 0,
  g : 0,
  b : 0,
  v : 1
}
function paintRed(){
    data.r = 255;
    data.g = 0;
    data.b = 0;
}
function paintGreen(){
    data.r = 0;
    data.g = 255;
    data.b = 0;
}
function paintBlue(){
    data.r = 0;
    data.g = 0;
    data.b = 255;
}


//create instance setup function
var tools = function(sketch){
   sketch.setup = function() {
    sketch.createCanvas(1135, 4000);
    console.log(sketch.windowWidth);
    console.log(sketch.windowHeight);

    socket = io.connect('http://localhost:3000');

    socket.on('mouse', drawNow);

    rslider = sketch.createSlider(0, 255, 0);
    // rslider.position(1000, 10);
    rslider.parent('slides');
  };
   sketch.mouseDragged = function() {
    console.log(data);
    data.x = sketch.mouseX;
    data.y = sketch.mouseY;
    socket.emit('mouse', data);

    sketch.noStroke();
    sketch.fill(data.r, data.g, data.b);

    data.v = rslider.value();

    sketch.ellipse(sketch.mouseX, sketch.mouseY, data.v, data.v);
  };

}
//video faceCanvas
var face = function(sketch){
  sketch.setup = function(){
    sketch.createCanvas(390, 240);
    sketch.capture = sketch.createCapture(sketch.VIDEO);
    sketch.capture.size(160, 120);
    sketch.capture.parent('faceCanvas');
    
    //capture.hide();
  };
}

var myDraw = new p5(tools, document.getElementById('toolCanvas'));
var myFace = new p5(face, document.getElementById('faceCanvas'));



//drawnow callback

function drawNow(data){
  noStroke();
  fill(data.g, data.b, data.r);
  ellipse(data.x, data.y, data.v, data.v);
}

//mouseDragged function



function triggerWhite(myDraw){
  // var c = document.getElementById("toolCanvas");
  // var ctx = c.getContext("2d");
  // ctx.fillRect(0, 0, 300, 150);
  // ctx.clearRect(0, 0, 1135, 4000);
  myDraw.redraw();
}
