
var s;
var f;
var scl = 20;

function setup() {
  createCanvas (720, 720);
  frameRate(10);
  s = new Snake();
  f = new Food();
  f.pick();
}

function draw() {
  fill(20);
  ellipse(mouseX, mouseY, 100, 100);
  background(200);
  s.checkIfDead();
  s.update();
  s.show();
  f.show();
}

function keyPressed(){
  if (keyCode == UP_ARROW){
    s.xspeed = 0;
    s.yspeed = -1;
  }else if (keyCode == DOWN_ARROW){
    s.xspeed = 0;
    s.yspeed = 1;
  }else if (keyCode == LEFT_ARROW){
    s.xspeed = -1;
    s.yspeed = 0;
  }else if (keyCode == RIGHT_ARROW){
    s.xspeed = 1;
    s.yspeed = 0;
  }
}

function Food(){

  this.pick = function(){
    this.x = floor(random(height/scl)) * scl;
    this.y = floor(random(width/scl))  * scl;
  }

  this.show = function (){
    fill(255,0,0);
    rect(this.x, this.y, scl, scl);
  }

}


function Snake(){

  this.size = 0;
  this.tail = [];
  this.x = 0;
  this.y = 0;

  this.xspeed = 1;
  this.yspeed = 0;

  this.eaten = function(food){
    d = dist(this.x, this.y, food.x, food.y);
    if (d < 1){
      this.size++;
      f.pick();
    }
  }

  this.checkIfDead = function(){
    for (var i = 0; i < this.tail.length; i++){
      d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
      if (d < 1){
        this.size = 0;
        this.tail = [];      
        this.x = 0;
        this.y = 0;

        this.xspeed = 0;
        this.yspeed = 0;
      }
    }

    if(this.x >= width || this.x < 0 || this.y > height || this.y < 0){
      this.x = 0;
      this.y = 0;

      this.xspeed = 0;
      this.yspeed = 0;
    }

  }

  this.update = function() {    
    if (this.size === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.size - 1] = createVector(this.x, this.y);
    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;


    this.eaten(f);
  }

  this.show = function(){
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
  
}