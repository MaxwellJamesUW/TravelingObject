function setup() {
  createCanvas(windowWidth, windowHeight);
  //set white background
  background(220);
  angleMode(DEGREES);
  textAlign(CENTER);
}

function draw() {
  drawTopText("Fight one horse-sized duck");
  drawBotText("Fight 20 duck-sized horses");
}

function keyPressed(){
  if (key === 'B') {
    push();
    text("Pushed It", windowWidth/2, 3.3*windowHeight/4);
    pop();
  }
  if (key === "F") {
    push();
    text("Flicked It", windowWidth/2, 1.3*windowHeight/4);
    pop();
  }
}


function drawTopText(wordString){
  push();
  fill(0);
  stroke(0);
  textSize(40);
  text(wordString, windowWidth/2, windowHeight/4);
  textSize(20);
  text("Flick It", windowWidth/2, 1.2*windowHeight/4);
  pop();
}

function drawBotText(wordString){
  push();
  fill(0);
  stroke(0);
  textSize(40);
  //rotate(180);
  text(wordString, windowWidth/2, (3*windowHeight)/4);
  textSize(20);
  text("Push It", windowWidth/2, 3.2*windowHeight/4);
  pop();
}