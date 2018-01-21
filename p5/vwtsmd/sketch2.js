var yoff = 0.0;        // 2nd dimension of perlin noise

//For the sun
var alive = true;
var resolution = 260.0; // how many points in the circle
var rad = 150.0;
var xS = 1.0;
var yS = 1.0;

var t = 0.0; // time passed
var tChange = .015; // how quick time flies

var nVal = 0.0; // noise value
var nInt = 1.0; // noise intensity
var nAmp = 1.0; // noise amplitude

function setup() {
  canvas1 = createCanvas(windowWidth-50, 1400);
  text1 = createP('Various Ways the Sun Might Die');
  text1.position(50, 850);
  text1.style("font-size", "30pt");
  text2 = createP('A Collection of Ruminations<br>By: Aidan Noel');
  text2.position(50, 940);
  text2.style("font-size", "15pt");
}

function draw() {
  background(51);

  //drawStars();

  fill(40,90,210);
  // We are going to draw a polygon out of the wave points
  beginShape(); 
  
  var xoff = 0;       // Option #1: 2D Noise
  //var xoff = yoff; // Option #2: 1D Noise
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to 
    
    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 1, 600,700);

    // Option #2: 1D Noise
    //var y = map(noise(xoff), 0, 1, 200,300);
    
    // Set the vertex
    vertex(x, y); 
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  drawSun();
}

function mousePressed(){
  alive = false;
}

function drawSun() {
  translate(displayWidth/2 - 50, 400);
  noStroke();
  if(alive){
    fill(200,40,20);
  }
  else {
    fill(0);
  }
  nInt = map(mouseX, 0, width, -3.0, 3.0); // map mouseX to noise intensity
  nAmp = map(mouseY, 0, height, 0.0, 0.5); // map mouseY to noise amplitude

  beginShape();
  for (var a=0.0; a<=TWO_PI; a+=TWO_PI/resolution) {

    nVal = map(noise( cos(a)*nInt+1, sin(a)*nInt+1, t ), 0.0, 1.0, nAmp, 1.0); // map noise value to match the amplitude

    xS = cos(a)*rad *nVal;
    yS = sin(a)*rad *nVal;

    vertex(xS, yS);
  }
  endShape(CLOSE);
  t += tChange;
}

function drawStars(){
    fill(255);
    for(var x=0; x<10; x++){
      ellipse(random(1,windowWidth),random(1,windowHeight),random(0,10));
    }
}
