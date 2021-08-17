class Boid{
  
    constructor(){
      
      let randomColorArrays =random(
        [ [30, 8, 69], 
          [135, 18, 9], 
          [11, 107, 41], 
          [74, 16, 142], 
          [150, 143, 80], 
          [117, 99, 133], 
          [87, 146, 148] ]
        );
      
      this.randomColorArray = [random(255),random(255),random(255)];
      this.trailLen = 60
      this.position = createVector( random(width), random(height) );
      this.velocity = p5.Vector.random2D();
      this.velocity.setMag( random(2, 4) );
      this.acceleration = createVector();
      this.maxForce = 0.2;
      this.maxSpeed = 5;
      this.trail = [];
      this.color = color(randomColorArrays);       
      //this.color = color(this.randomColorArray[0], this.randomColorArray[1], this.randomColorArray[2]);
    }
    
    screenEdges(){
      if(this.position.x > width){
        this.position.x = 0;
        //this.velocity = this.velocity.mult(-1);
      }
      else if (this.position.x < 0){
        this.position.x = width;
        //this.velocity = this.velocity.mult(-1);
      }
      if(this.position.y > height){
        this.position.y = 0;
        //this.velocity = this.velocity.mult(-1);
      }
      else if (this.position.y < 0){
        this.position.y = height;
        //this.velocity = this.velocity.mult(-1);
      }
    }
    
    align(boids){
      let perceptionRadius = perceptionSlider.value();
      let steeringForce = createVector();
      let totalLocalBoids = 0;
      
      for(let otherBoid of boids) {
        let boidDist = dist(this.position.x, this.position.y, otherBoid.position.x, otherBoid.position.y);
        
        if(otherBoid != this && boidDist < perceptionRadius){
          steeringForce.add(otherBoid.velocity);
          totalLocalBoids++;
        } 
      }
      
      if(totalLocalBoids > 0){
        steeringForce.div(totalLocalBoids);
        steeringForce.setMag(this.maxSpeed);
        //steering force = desired(average velocity) - current velocity;
        steeringForce.sub(this.velocity);
        steeringForce.limit(this.maxForce);
        //console.log("limitted steering force is" + steeringForce);
        
      }
      return steeringForce;
    }
    
      cohesion(boids){
      let perceptionRadius = perceptionSlider.value();
      let steeringForce = createVector();
      let totalLocalBoids = 0;
      
      
      for(let otherBoid of boids) {
        let boidDist = dist(this.position.x, this.position.y, otherBoid.position.x, otherBoid.position.y);
        
        if(otherBoid != this && boidDist < perceptionRadius){
          steeringForce.add(otherBoid.position);
          totalLocalBoids++;
        } 
      }
      
      if(totalLocalBoids > 0){
        steeringForce.div(totalLocalBoids);
        steeringForce.sub(this.position);
        steeringForce.setMag(this.maxSpeed);
        steeringForce.sub(this.velocity);
        steeringForce.limit(this.maxForce);
      }
      return steeringForce;
    }
    
  
    separation(boids) {
      let perceptionRadius = perceptionSlider.value();
      let steeringForce = createVector();
      let totalLocalBoids = 0;
      
      for (let otherBoid of boids) {
        let boidDist = dist(this.position.x, this.position.y, otherBoid.position.x, otherBoid.position.y);
        if (otherBoid != this && boidDist < perceptionRadius) {
          let diff = p5.Vector.sub(this.position, otherBoid.position);
          diff.div(boidDist * boidDist);
          steeringForce.add(diff);
          totalLocalBoids++;
        }
      }
      if (totalLocalBoids > 0) {
        steeringForce.div(totalLocalBoids);
        steeringForce.setMag(this.maxSpeed);
        steeringForce.sub(this.velocity);
        steeringForce.limit(this.maxForce);
      }
      return steeringForce;
    }
    
    flock(boids){
      let alignment = this.align(boids);
      let cohesion =  this.cohesion(boids);
      let separation =  this.separation(boids);
      
      alignment.mult(alignSlider.value());
      cohesion.mult(cohesionSlider.value());
      separation.mult(separationSlider.value());
  
      this.acceleration.add(alignment);
      this.acceleration.add(cohesion);
      this.acceleration.add(separation);
    }
    
    update(){
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.acceleration.mult(0);
      
      this.trail.push( [this.position.x, this.position.y] )
      if(this.trail.length >= this.trailLen){
        this.trail.shift();
      }
    }
    
    trailOn(){
      for (let trailEllipseCoord = 0; trailEllipseCoord < this.trail.length; trailEllipseCoord++) {
        strokeWeight(0);
        fill(this.randomColorArray[0], this.randomColorArray[1], this.randomColorArray[2], (trailEllipseCoord*5));
        ellipse(this.trail[trailEllipseCoord][0], this.trail[trailEllipseCoord][1], 20);
      }
    }
    
    trailOff(){
        strokeWeight(0);
        fill(this.randomColorArray)
        ellipse(this.position.x, this.position.y, 20);
  
    }
    display(){
      this.trailOn();
      //this.trailOff();
    }
  }