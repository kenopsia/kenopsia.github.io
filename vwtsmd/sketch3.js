var p5_0 = new p5(function(sketch) {
 
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
 
  sketch.setup = function() {
      canvas1 = sketch.createCanvas(sketch.windowWidth, 1400);
      text1 = sketch.createP('Various Ways the Sun Might Die');
      text1.position(50, 850);
      text1.style("font-size", "30pt");
      text2 = sketch.createP('A Collection of Ruminations<br>By: Aidan Noel');
      text2.position(50, 940);
      text2.style("font-size", "15pt");
  };
 
  sketch.draw = function() {
    sketch.background(51);

    //drawStars();

    sketch.fill(40,90,210);
    // We are going to draw a polygon out of the wave points
    sketch.beginShape(); 
    
    var xoff = 0;       // Option #1: 2D Noise
    //var xoff = yoff; // Option #2: 1D Noise
    
    // Iterate over horizontal pixels
    for (var x = 0; x <= sketch.width; x += 10) {
      // Calculate a y value according to noise, map to 
      
      // Option #1: 2D Noise
      var y = sketch.map(sketch.noise(xoff, yoff), 0, 1, 600,700);

      // Option #2: 1D Noise
      //var y = map(noise(xoff), 0, 1, 200,300);
      
      // Set the vertex
      sketch.vertex(x, y); 
      // Increment x dimension for noise
      xoff += 0.05;
    }
    // increment y dimension for noise
    yoff += 0.01;
    sketch.vertex(sketch.width, sketch.height);
    sketch.vertex(0, sketch.height);
    sketch.endShape(sketch.CLOSE);

    //drawSun();
    sketch.translate(sketch.displayWidth/2 - 50, 400);
    sketch.noStroke();
    if(alive){
      sketch.fill(200,40,20);
    }
    else {
      sketch.fill(0);
    }
    nInt = sketch.map(sketch.mouseX, 0, sketch.width, -3.0, 3.0); // map mouseX to noise intensity
    nAmp = sketch.map(sketch.mouseY, 0, sketch.height, 0.0, 0.5); // map mouseY to noise amplitude

    sketch.beginShape();
    for (var a=0.0; a<=sketch.TWO_PI; a+=sketch.TWO_PI/resolution) {

      nVal = sketch.map(sketch.noise( sketch.cos(a)*nInt+1, sketch.sin(a)*nInt+1, t ), 0.0, 1.0, nAmp, 1.0); // map noise value to match the amplitude

      xS = sketch.cos(a)*rad *nVal;
      yS = sketch.sin(a)*rad *nVal;

      sketch.vertex(xS, yS);
    }
    sketch.endShape(sketch.CLOSE);
    t += tChange;
  };
});
 

var p5_1 = new p5(function(sketch) {
 
  var x = 100, y = 100;
 
  sketch.setup = function() {
    var cnv = sketch.createCanvas(600, 400);
    cnv.class('grape');
  };
 
  sketch.draw = function() {
    sketch.background(255, 0, 0);
    sketch.fill(255);
    sketch.rect(x, y, 250, 250);
  };
});
 

var p5_2 = new p5(function(sketch) {
 
  var x = 100, y = 100;
 
  sketch.setup = function() {
    var cnv = sketch.createCanvas(600, 400);
    cnv.class('apple');
  };
 
  sketch.draw = function() {
    sketch.rect(x, y, 250, 250);
  };
});