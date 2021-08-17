// Modified code from Daniel Shiffman thecodingtrain.com

const flock = [];
let alignSlider, cohesionSlider, separationSlider, perceptionSlider;
let backgroundColor;
let millisecond;
let timer = 15;

function setup() {
  backgroundColor =[random(255),random(255),random(255)];
  millisecond = millis();

  
  createCanvas(windowWidth, windowHeight);
  
  alignSlider = createSlider(0, 2, 1.1, 0.1);
  alignSlider.position( (windowWidth * 0) / 4, windowHeight + 50);
  
  cohesionSlider = createSlider(0, 2, 0.9, 0.1);
  cohesionSlider.position( (windowWidth * 1) / 4, windowHeight + 50);
  
  separationSlider = createSlider(0, 2, 1.0, 0.1);
  separationSlider.position( (windowWidth * 2) / 4, windowHeight + 50);
  
  perceptionSlider = createSlider(0, 100, 50, 0.1);
  perceptionSlider.position( (windowWidth * 3) / 4, windowHeight + 50);
  
  for(let i = 0; i < 50; i++){
    flock.push(new Boid());
  }
}

function firework(){
  if (frameCount % 60 == 0 && timer > 0) {
      timer --;
      cohesionSlider.value(1);
      separationSlider.value(1);
    }
  else if(frameCount % 60 == 0 && timer <= 0 && timer > -10){
      cohesionSlider.value(2);
      separationSlider.value(0);
      timer--;
    }
    else if(frameCount % 60 == 0 && timer <= 0 && timer > -15){
      cohesionSlider.value(0);
      separationSlider.value(2);
      timer--;
    }
  else if(frameCount % 60 == 0 && timer == -15){
      timer = 15;
    }
}

function draw() {
  //background(backgroundColor);
  background(89, 146, 148);
  fill(255, 30);
  textFont('Georgia');
  textSize(16);
  text('Align Slider', (windowWidth) * 0 / 4, (windowHeight) );
  text('Cohesion Slider', (windowWidth) * 1 / 4, (windowHeight) );
  text('Separation Slider', (windowWidth) * 2 / 4, (windowHeight) );
  text('Perception Slider', (windowWidth) * 3 / 4, (windowHeight) );
  
  for(let boid of flock){
    boid.screenEdges();
    boid.flock(flock);
    boid.update();
    boid.display();
  }
  firework();
}