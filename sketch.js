// DEFINE COLOR NAMES UP HERE
let bg1, accentDark, accentLight;

// OTHER DESIGN VARIABLES
let borderRadius;

//  IMPORTANT TRACKERS
//  todo: implement so these are uesd
let allQs = [
  ["Fight one horse-sized duck", "Fight 20 duck-sized horses"],
  ["Talking pets", "Talking babies"]
];
let activeQ = 1;
let participants = [];
//inputs defined by software keyboard press and the verbage
let p1, p2, pZero;
let allInputs = [
  ["f","flick the stick"],
  ["b", "push the button"],
  ["s", "spin the dial"]
];
let activeInputs = [];

//timer
let timerStart;
let discussionTime = 20000; //90s
let skipDelay = 10000; //60s

//to keep track of the results:
results = [[0,0],[0,0]];

//activeScreen to manage overall state
// The screens are: "person", "timer" "vote1" "vote2" "results"
//
// very important
//
let activeScreen = "results";

// we may have to preload photos (and people)
function preload() {
  let p = {
    "name": "Max1",
    "photo" : loadImage('/assets/MSpaintMax.png')
  };
  participants.push(p);
  
  p = {
    "name": "Max2",
    "photo" : loadImage('/assets/MSpaintMax.png')
  };
  participants.push(p);
  
  p = {
    "name": "Max3",
    "photo" : loadImage('/assets/MSpaintMax.png')
  };
  participants.push(p);
  
  p = {
    "name": "Max4",
    "photo" : loadImage('/assets/MSpaintMax.png')
  };
  participants.push(p);
  
  
  //we'll push all of our participants into the participants list
  //then randomize
  
  particpants = shuffleList(participants);
  
  pZero = {
    "name": "Starting Max",
    "photo" : loadImage('/assets/MSpaintMax.png')
  };
  
}

function setup() {
  //set up the canvas as the whole window
  createCanvas(windowWidth, windowHeight);
  
  // SET COLORS HERE
  bg1 = color("#FAFDFF");
  accentDark = color("#1a659e");
  accentLight = color("#f7c59f");
  
  // SET OTHER VARIABLES HERE
  borderRadius = 30;
  activeInputs.push(random(allInputs));
  timerStart = millis();
  p1 = pZero;
  p2 = pZero;
  
  // DEFAULT MODES and STYLES
  angleMode(DEGREES);
  textAlign(CENTER);
  rectMode (CENTER);  // the (x, y) coordinate for a rectangle's position will be the center
  
  strokeWeight(0);
  
  //................
  // START DRAWING STUFF
  //................
  
  background(bg1);
  
}

function draw() {
  
  //when changing the style somewhere to do something specific 
  //   you can use push() and pop() to save the way
  //     the style was set up before and revert back to it.
  //  Example:
  //  push();
  //  textWeight(5);
  //  write some bolded text...
  //  pop();
  //
  // https://p5js.org/reference/p5/push/
  
  
  // ..................
  // the plan:
  // ...............

  // 1. always be going down the randomized list of people
  // SCREEN 1: showing current person's name and photo: go find them
  // INPUT: found them
  // SCREEN 2: display prompt wtih timer
  // SCREEN 2.5 : enable voting
  // INPUT: person votes on the prompt
      // is it important that both people vote?
      // what if the prompt actually is "pitch this"
      //  encouraging people to argue on behalf of the
      //    speech bubble option on their side?
      //      then after 1:30, one person gets to decide?
      //         each user gets to decide for one of their 2 talks?
  
  //SCREEN 1: show the next person's name and photo...
  
  
  //..........................................
  // NEXT PERSON SCREEN :
  //..........................................

  
  if (activeScreen === "person"){
    // do next person
    clear();
    fill(0);
    textSize(40);
    text("Go find " + p2.name + ".", 3*windowWidth/5, 2*windowHeight/5);
    text("Have them " + activeInputs[0][1] + ".", 3*windowWidth/5, 3*windowHeight/5)

    image(p2.photo, 0, windowHeight/3, windowWidth/5,windowWidth/5);
  
    if (millis() - timerStart < skipDelay){
      
      text("Try to find them for at least " + floor((skipDelay - (millis()-timerStart))/1000) + " seconds.", windowWidth/2, 6*windowHeight / 7);
      
    } else{
      
      text("Can't find them? To skip, " + activeInputs[1][1] + ".", windowWidth/2, 6*windowHeight / 7);
    }
  }
  
  
  //..............................
  // SHOW QUESTION w TIMER SCREEN :
  
  if (activeScreen === "timer") {
    // Say we have a collection of two-part prompts to draw from.
    // we could just have two and alternate them.
    clear();
    drawTopText(allQs[activeQ][0]);
    drawBotText(allQs[activeQ][1]);

    // idea: show the timer on this page
    // when it runs out, allow users to vote
    
    text("Discuss for " + floor((discussionTime - (millis()-timerStart))/1000) + " seconds.", windowWidth/2, windowHeight/2);
    
    //if timer is up, swtich to voting!
    if (millis()-timerStart > discussionTime){
      //TODO
      // move this code to when the timer runs out and we switch
      // to vote 1 screen
      clear()
      activeScreen = "vote1";
      setTwoRandInputs(); //set activeInput tracker with 2 new
      
      drawTopText(allQs[activeQ][0]);
      drawBotText(allQs[activeQ][1]);
      drawTopButtonPrompt();
      drawBotButtonPrompt();
      drawVoterName(p1);
      
    }
  }
  
  // ................................................
  //VOTING SCREENS
  // ................................................

  if (activeScreen === "vote1"){
    
  }
  if (activeScreen === "vote2"){
    
  }
  
  // ............................
  // SHOW RESULTS SCREEN
  // ................................................
  if (activeScreen === "results"){
    //todo: make a results visualization
    text("Visualization here", windowWidth/2, windowHeight/2);
    text(activeInputs[0][1] + " to continue.", windowWidth/2, 3*windowHeight/4); 
  }

}


function keyPressed(event){
  //on key press, we'll check which screen is active and handle
  //   screen changes with physical inputs
  
  // for each active screen:
  //  1. check if the correct input has been pressed
  //  2. clear the current drawing
  //  3. set up the next active screen
  //     - change any necessary trackers (activeQ, next participant)
  //     - get new random inputs
  //     - change activeScreen variable
  
  //TODO: add a short delay before activating the next inputs, to 
  //       avoid someone clicking through 2 screens accidentally
  //         with the same flick thing.
  //             (could do on Arduino side?)
  
  // key (physical input)
  if (activeScreen == "person"){
    //we're on the "next person" screen
    if (key == activeInputs[0][0]){
      //they've done the input to say "found them"
      
      //clear this screen
      clear();
      //switch to the timer screen next
      timerStart = millis();
      activeScreen = "timer";
      //for the timer screen, there will be no active inputs eventually
      //todo
      activeInputs = []; //empty the active inputs list
      


    } else if (key === activeInputs[1][0]){
      //SKIP button, they couldn't find the person
      //if delay has passed, do the skip
      if (millis() - timerStart > skipDelay){
        getNextP();
        timerStart = millis();
      }
      
    }
    
  }
  
  //VOTING SCREENS
  
  else if (activeScreen == "vote1"){
    if (key === activeInputs[0][0]) {
      push();
      text("Option 1", windowWidth/2, 2*windowHeight/4);
      pop();
      
      results[activeQ][0] += 1; //add a point to this option
      clear();
      setTwoRandInputs();
      activeScreen = "vote2"; //go to next screen
      //TODO would be nice to have an animation here
      
      drawTopText(allQs[activeQ][0]);
      drawBotText(allQs[activeQ][1]);
      drawTopButtonPrompt();
      drawBotButtonPrompt();
      drawVoterName(p2);
    }
    else if (key === activeInputs[1][0]) {
      push();
      text("Option 2", windowWidth/2, 2*windowHeight/4);
      pop();
      
      results[activeQ][1] += 1; //add a point to this option
      clear();
      setTwoRandInputs();
      activeScreen = "vote2"; //go to next screen
      //TODO: would be nice to have an animation here
      
      drawTopText(allQs[activeQ][0]);
      drawBotText(allQs[activeQ][1]);
      drawTopButtonPrompt();
      drawBotButtonPrompt();
      drawVoterName(p2);
    }
  }
  
  else if (activeScreen=="vote2"){
    //vote2 screen is same as vote1, but should prompt the other person
    
    if (key === activeInputs[0][0]) {
      push();
      text("Option 1", windowWidth/2, 2*windowHeight/4);
      pop();
      
      results[activeQ][0] += 1; //add a point to this option
      clear();
      setTwoRandInputs(); //set a new active input
      activeScreen = 'results';
      showResults();
    }
    else if (key === activeInputs[1][0]) {
      push();
      text("Option 2", windowWidth/2, 2*windowHeight/4);
      pop();
      
      results[activeQ][1] += 1; //add a point to this option
      clear();
      setOneRandInput(); //set a new active input
      activeScreen = 'results';
      showResults();
    }
  }
  else if (activeScreen == "results"){
    if (key === activeInputs[0][0]) {
      clear();
      switchQ();
      activeScreen = "person";
      timerStart = millis();
      setTwoRandInputs();
      p1 = p2; //move the "next person" into the "current person" spot
      //   if we still have a next person...
      getNextP();
    }
  }
}

// todo if there's time, add all screen change logic here so it's not duplicated
function changeScreenTo(nextScreen){
  clear();
}

function getNextP(){
  if (participants.length > 0){
        p2 = participants.pop(); //different pop(), pops someone out of the list
  } else {
    //if we don't have a next person in the list...
    p2 = pZero;
  }
}

//switches active question
function switchQ(){
  if (activeQ == 1) {
    activeQ = 0;
  } else {
    activeQ = 1;
  }
}

function showResults(){
  let option1 = results[activeQ][0];
  let option2 = results[activeQ][1];
  drawPieChart(option1, option2);
  push();
  fill("#F00");
  text(allQs[activeQ][0], windowWidth/2, 40);
  fill("#00F");
  text(allQs[activeQ][1], windowWidth/2, windowHeight-10);
  pop();
}

function drawVoterName(person){
  text(person.name + ": It's time to vote!", windowWidth/2, windowHeight/2);
}

//I used chatGPT for this one
function drawPieChart(value1, value2) {
  push();
  angleMode(RADIANS);
  let total = value1 + value2;
  let angle1 = (value1 / total) * TWO_PI;
  let angle2 = (value2 / total) * TWO_PI;
  
  
  background(255);
  fill(255, 0, 0);
  arc(width / 2, height / 2, 200, 200, 0, angle1, PIE);
  
  fill(0, 0, 255);
  arc(width / 2, height / 2, 200, 200, angle1, angle1 + angle2, PIE);
  angleMode(DEGREES);
  pop();
}

//sets activeInput tracker with one random input
function setOneRandInput(){
  activeInputs = [];
  nextInputs = shuffle(allInputs); //get a randomized list of all inputs
  activeInputs.push(nextInputs.pop()); //set one input in active
}

//sets activeInput tracker with two random inputs
function setTwoRandInputs(){
  activeInputs = [];
  nextInputs = shuffle(allInputs); //get a randomized list of all inputs
      //get two new inputs
  activeInputs.push(nextInputs.pop());
  activeInputs.push(nextInputs.pop());
}

function drawTopText(wordString){
  /*
      function to draw the top option of the two options
  */
  push();
  textSize(60);
  fill(accentLight);
  rectMode(CORNER);
  rect(0,0, windowWidth, windowHeight/3, borderRadius);
  triangle(5*windowWidth/6, windowHeight/4, 4*windowWidth/6, windowHeight/4, 5*windowWidth / 6,  windowHeight/2);
  fill(0);
  text(wordString, windowWidth/2, windowHeight/6);
  pop();
}

function drawTopButtonPrompt(){
  push();
  fill(0);
  textSize(32);
  text(activeInputs[0][1] + "", windowWidth/2, 1.5*windowHeight/6);
  pop();
}

function drawBotText(wordString){
  /*
      function to draw the bottom option of the two options
  */
  push();
  fill(accentDark);
  rectMode(CORNER);
  rect(0,2*windowHeight/3, windowWidth, windowHeight/3, borderRadius);
  triangle(windowWidth/6, 3*windowHeight/4, 2*windowWidth/6, 3*windowHeight/4, windowWidth / 6,  windowHeight/2);
  fill(255);
  textSize(60);
  rotate(180);
  text(wordString, -windowWidth/2, -(5*windowHeight)/6);
  pop();
}

function drawBotButtonPrompt(){
  push();
  fill(255);
  rotate(180);
  textSize(32);
  text(activeInputs[1][1] + "", -windowWidth/2, -4.5*windowHeight/6);
  pop();
}

//I didn't write this one. shuffle function to shuffle list order
function shuffleList(array){ 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
} 