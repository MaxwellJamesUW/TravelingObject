// DEFINE COLOR NAMES UP HERE
let bg1, text1;

// OTHER DESIGN VARIABLES
let borderRadius;
//   these are for the image on the 'person' screen
let imgSize = 162;
let dynamicText = "It's their turn to"; // This can change dynamically
let spacing = 8; // Space between the two text segments

//  IMPORTANT TRACKERS
//each question is a list containing "option1", "option2"
let allQs = [
  ["work for Microsoft", "work for Google"],
  ["10 hours of user testing", "10 hours of prototyping"]
];

let activeQ = 1; //active Question toggles between 0 and 1
let participants = []; //this list will contain all participants

//this will track who has the object (p1), who's next(p2), and who was first (pZero)
let p1, p2, pZero; 

//all inputs defined by software keyboard press and the verbage
let allInputs = [];
let activeInputs = [];

//timer
let timerStart;

let discussionTime = 60000; //90s?
let skipDelay = 30000; //60s?
let voteFeedbackTime = 2000 //5s

//to keep track of the results:
results = [[0,0],[0,0]];

//activeScreen to manage overall state
// The screens are: "person", "timer" "vote1" "vote2" "results"
// "vote1feedback", "vote2feedback", "pass"
//
// very important
//
let activeScreen = "";

// we may have to preload photos (and people)
function preload() {
  
  
  // Load the font files
  robotoMedium = loadFont('Roboto-Medium.ttf');
  robotoBold = loadFont('Roboto-Bold.ttf');
  
  
  //----------------------------------------------------------------------------------------
  // load all people here
  
  
  
  //we'll push all of our participants into the participants list
  //then randomize
  
  /*
  // example person to add
  p = {
    "name": "Jey",
    "photo" : loadImage('jey.png')
  };
  participants.push(p);
  */
  
  /*
  //-----------------------------------------------------------------------------------------
  //   GROUP ONE   
  //-----------------------------------------------------------------------------------------

  pZero = {
    "name": "Max",
    "photo" : loadImage('max.jpg')
  };
  
  p = {
    "name": "Lucy",
    "photo" : loadImage('lucy.JPG')
  };
  participants.push(p);
  
  
  p = {
    "name": "Sana",
    "photo" : loadImage('sana.jpeg')
  };
  participants.push(p);
  
  p = {
    "name": "Bella",
    "photo" : loadImage('bella.JPG')
  };
  participants.push(p);
  
  p = {
    "name": "Xinyi",
    "photo" : loadImage('xinyi.JPG')
  };
  participants.push(p);
  
  p = {
    "name": "Marysabel",
    "photo" : loadImage('marysabel.PNG')
  };
  participants.push(p);
  
  
  //-----------------------------------------------------------------------------------------
  //   GROUP TWO  
  //-----------------------------------------------------------------------------------------

  pZero = {
    "name": "Jey",
    "photo" : loadImage('jey.JPG')
  };
  
  p = {
    "name": "Ricardo",
    "photo" : loadImage('ricardo.jpeg')
  };
  participants.push(p);
  
  p = {
    "name": "Caeley",
    "photo" : loadImage('caeley.JPG')
  };
  participants.push(p);
  
  p = {
    "name": "Matt",
    "photo" : loadImage('matt.jpeg')
  };
  participants.push(p);
  
  p = {
    "name": "Sophia",
    "photo" : loadImage('sophia.jpeg')
  };
  participants.push(p);
  
  p = {
    "name": "Julia",
    "photo" : loadImage('julia.JPG')
  };
  participants.push(p);
  */
  
  //-----------------------------------------------------------------------------------------
  //   GROUP THREE
  //-----------------------------------------------------------------------------------------
  
  
  pZero = {
    "name": "Tess",
    "photo" : loadImage('tess.jpg')
  };
  
  p = {
    "name": "Christian",
    "photo" : loadImage('christian.JPG')
  };
  participants.push(p);
  
  p = {
    "name": "Kellie",
    "photo" : loadImage('kellie.PNG')
  };
  participants.push(p);
  
  p = {
    "name": "Sakura",
    "photo" : loadImage('sakura.PNG')
  };
  participants.push(p);
  
  p = {
    "name": "Sarah",
    "photo" : loadImage('sarah.PNG')
  };
  participants.push(p);
  /*
  //-----------------------------------------------------------------------------------------
  //   GROUP FOUR
  //-----------------------------------------------------------------------------------------
  
  pZero = {
    "name": "Amanda",
    "photo" : loadImage('amanda.png')
  };
  
  p = {
    "name": "Rebecca",
    "photo" : loadImage('rebecca.PNG')
  };
  participants.push(p);
  
  p = {
    "name": "Vanessa",
    "photo" : loadImage('vanessa.PNG')
  };
  participants.push(p);
  
  p = {
    "name": "Tia",
    "photo" : loadImage('tia.PNG')
  };
  participants.push(p);
  
  p = {
    "name": "Mou",
    "photo" : loadImage('mou.PNG')
  };
  participants.push(p);
  
  */
  // ----------------------------------------------------------------------------------
  //  END OF GROUPS
  // ----------------------------------------------------------------------------------
  
  particpants = shuffleList(participants);
   
}


function setup() {
  //Runs once at start.
  //Variables are initialized here.
  
  //set up the canvas as the whole window - TODO FIX LATER
  createCanvas(852, 393);
  
  //SET INPUTS HERE
  allInputs.push(["f","flick the stick!", "#B97F24"]);
  allInputs.push(["p", "push the button?", "#FF2C2C"]);
  allInputs.push(["s", "spin the dial...", "#9267FF"]);
  
  // SET STYLE HERE
  bg1 = color("#FFF");
  text1 = color("#000");
  
  // Set the font for the text
  textFont(robotoMedium);
  
  // SET OTHER VARIABLES HERE
  borderRadius = 30;
  activeInputs.push(random(allInputs));
  timerStart = millis();
  p1 = pZero;
  p2 = pZero;
  
  // DEFAULT MODES and STYLES
  angleMode(DEGREES);
  textAlign(CENTER, TOP);
  
  strokeWeight(0);
  
  //................
  // START DRAWING STUFF
  //................
  
  background(bg1);
  fill(text1);
  noStroke();
  
  
  //BEGIN.
  setThreeRandInputs();
  activeScreen = "results";
  
}


//Screens are drawn here if they need to update (they have a timer counting down).
//Otherwise they're drawn once in the keyPressed() function
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
  // NEXT PERSON SCREEN : (draw)
  //..........................................
  
  if (activeScreen === "person"){
    drawPerson();
  }
  
  
  //..............................
  // SHOW QUESTION w TIMER SCREEN :
  
  else if (activeScreen === "timer") {
    // Say we have a collection of two-part prompts to draw from.
    // we could just have two and alternate them.
    clear();
    drawTimer();
    
    //if timer is up, swtich to voting!
    if (millis()-timerStart > discussionTime){
      //TODO
      // move this code to when the timer runs out and we switch
      // to vote 1 screen
      clear()
      setThreeRandInputs(); //set activeInput tracker with 2 new
      drawOptions(p1.name);
      
      activeScreen = "vote1";
      
    }
  }
  
  // ................................................
  //VOTING SCREENS
  // ................................................

  else if (activeScreen === "vote1"){
    
  }
  
  else if (activeScreen === "vote1feedback"){
    
    //code to display the vote1 result here
    
    if (millis() - timerStart > voteFeedbackTime){
      
      //code to switch to vote2screen here
      drawOptions(p2.name);
      activeScreen = "vote2";
      
    }
  }
  else if (activeScreen === "vote2"){
    
  }
  else if (activeScreen === "vote2feedback"){
    
    // draw vote2feedback
    
    if (millis() - timerStart > voteFeedbackTime){
      
      //code to switch to results here
      drawResults();
      activeScreen = 'results';
      
    }
  }
  
  // ............................
  // SHOW RESULTS SCREEN
  // ................................................
  else if (activeScreen === "results"){
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
        participants.push(p2);
        participants = shuffleList(participants);
        getNextP();
        timerStart = millis();
      }
      
    }
    
  }
  
  //VOTING SCREENS
  
  else if (activeScreen == "vote1"){
    if (key === activeInputs[0][0]) {
      
      results[activeQ][0] += 1; //add a point to this option
      clear();
      
      drawOptionWon(0);
      timerStart = millis();
      activeScreen = "vote1feedback"; //go to next screen

      
    }
    else if (key === activeInputs[1][0]) {
      
      results[activeQ][1] += 1; //add a point to this option
      clear();
      
      drawOptionWon(1);
      timerStart = millis();
      activeScreen = "vote1feedback"; //go to next screen
    }
  }
  
  else if (activeScreen=="vote2"){
    //vote2 screen is same as vote1, but should prompt the other person
    
    if (key === activeInputs[0][0]) {
      
      results[activeQ][0] += 1; //add a point to this option
      clear();
      
      drawOptionWon(0);
      timerStart = millis();
      activeScreen = "vote2feedback"; //go to next screen
      
    }
    else if (key === activeInputs[1][0]) {
      
      results[activeQ][1] += 1; //add a point to this option
      clear();
      
      drawOptionWon(1);
      timerStart = millis();
      activeScreen = "vote2feedback"; //go to next screen
      
    }
  }
  else if (activeScreen == "results"){
    if (key === activeInputs[2][0]) {
      clear();
      drawPass()
      activeScreen = "pass";
    }
  }
  else if (activeScreen == "pass"){
    if (key === activeInputs[0][0]) {
      clear();
      switchQ();
      timerStart = millis();
      setTwoRandInputs();
      p1 = p2; //move the "next person" into the "current person" spot
      //   if we still have a next person...
      getNextP();
      
      activeScreen = "person";
    }
  }
}

//-------------------------------------------
//  HELPERS
//--------------------------------------------
//these functions are called to help the main ones

//get the next participant from the list
function getNextP(){
  if (participants.length > 0){
        p2 = participants.pop(); //different pop(), pops someone out of the list
  } else {
    //if we don't have a next person in the list, return to the first person
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



function drawPerson(){
  push();
  background(bg1);
  textAlign(LEFT, TOP);
  fill(text1);
  noStroke();
  
  img = p2.photo;
  // Create a circular mask directly on the image
  let maskedImg = createGraphics(imgSize, imgSize);
  maskedImg.ellipse(imgSize / 2, imgSize / 2, imgSize, imgSize);
  img.resize(imgSize, imgSize);
  img.mask(maskedImg);

  // Draw the masked image
  image(img, 240 - imgSize / 2, height / 2 - imgSize / 2);

  // Draw the circular frame
  stroke(255);
  strokeWeight(2);
  noFill();
  circle(240, height / 2, imgSize);

  // Reset stroke for text
  noStroke();
  fill(text1);

  // TEXT CONTENT
  textFont(robotoBold);
  textSize(16);
  text(p1.name.toUpperCase() + "'S MISSION", 345, 118);
  
  textSize(34);
  text("Find " + p2.name, 345, 153);
  
  textFont(robotoMedium);
  textSize(20);
  
  // Measure the width of the dynamic text
  let textWidthValue = textWidth(dynamicText);
  
  // Draw the dynamic text
  text(dynamicText, 345, 210);
  
  // Draw "spin the dial" right after it
  fill(activeInputs[0][2]);
  text(activeInputs[0][1], 345 + textWidthValue + spacing, 210);
  
  //timer
  fill(0);
  textSize(16);
  if (millis() - timerStart < skipDelay){
      
      text("Search for at least " + floor((skipDelay - (millis()-timerStart))/1000) + " seconds.",  345, 252);
      
    } else{
      
      text("Can't find them? To skip, ", 345, 252);
      fill(activeInputs[1][2]);
      text(activeInputs[1][1], 345 + textWidth("Can't find them? To skip, ") + 5, 252);
       
    }
  pop();
}



//show the results of the question, including pie chart
function drawResults(){
  let option1 = results[activeQ][0];
  let option2 = results[activeQ][1];
  /*
  //old code
  drawPieChart(option1, option2);
  push();
  fill("#F00");
  text(allQs[activeQ][0], windowWidth/2, 40);
  fill("#00F");
  text(allQs[activeQ][1], windowWidth/2, windowHeight-10);
  pop();
  */
  
  background(bg1); // Background color

  // Draw the text at the top of the screen with size 24
  fill(text1); // Set black text color for the top text
  noStroke(); // Make it so there's no stroke on anything
  textSize(24); // Set text size to 24 for the top text
  textAlign(CENTER, TOP); // Center-align the top text\
  
  //change to current standing? TODO decide
  text("Results", width / 2, 72); // Center the text horizontally
  //text("Current Standing", width / 2, 72); // Center the text horizontally
  
  
  // Draw the text at the bottom of the screen with size 16 - note - not sure how we plan to progress the flow forward from here in terms of having them use an input or just having a timer, but this is here for now
  textSize(16); // Set text size to 16 for the bottom text
  textAlign(LEFT, TOP); // left allign bottom text
  fill(activeInputs[2][2]); //make 'spin the dial purple'
  text(activeInputs[2][1], 340, 305); 
  fill(0); //make 'to continue' black. note - i manually positioned this bottom text so its in the middle of the screen and also half purple half black. 
  text("to continue", 464, 305);

  // Draw the red card with rounded corners
  fill(activeInputs[0][2]);
  rect(388, 121, 483, 70, 20);
  
  // Draw the purple card with rounded corners
  fill(activeInputs[1][2]);
  rect(388, 202, 483, 70, 20);
  
  // Draw the text on the red card with size 16
  fill(255); // Set white text color for the card text
  noStroke(); // Make it so there's no stroke on the text
  textAlign(LEFT, TOP);
  text(allQs[activeQ][0], 412, 138); // First line
  //text("coworker's minds", 412, 158); // Second line with a manual line break
  
  // Draw the text on the purple card with size 16
  text(allQs[activeQ][1], 412, 218); // First line
  //text("agree with all your ideas", 412, 238); // Second line with a manual line break
  
  drawPieChart(option1, option2);
}

//Draw a pie chart  (I used chatGPT for this one)
function drawPieChart(value1, value2) {
  push();
  angleMode(RADIANS);
  let total = value1 + value2;
  let angle1 = (value1 / total) * TWO_PI;
  let angle2 = (value2 / total) * TWO_PI;
  
  fill(activeInputs[0][2]);
  arc(256, 196, 206, 206, 0, angle1, PIE);
  
  fill(activeInputs[1][2]);
  arc(256, 196, 206, 206, angle1, (angle1 + angle2), PIE);
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

function setThreeRandInputs(){
  activeInputs = [];
  nextInputs = shuffle(allInputs); //get a randomized list of all inputs
      //get two new inputs
  activeInputs.push(nextInputs.pop());
  activeInputs.push(nextInputs.pop());
  activeInputs.push(nextInputs.pop());
}




//function to draw 'timer' screen
function drawTimer(){
  textAlign(CENTER, TOP); // Center-align the top text
  // Draw the "DISCUSS" text
  textFont(robotoBold);
  textSize(16); // Set text size to 24 for the top text
  text("DISCUSS", width / 2, 118); // Center the text horizontally
  
  //Timer
  text(floor((discussionTime - (millis()-timerStart))/1000), width / 2, 290); 
  
  // Draw the discussion prompt
  textFont(robotoMedium);
  textSize(24); // Set text size to 24 for the top text
  text("Would you rather", width / 2, 153); // Center the text horizontally
  text(allQs[activeQ][0], width / 2, 183); // Second line of text with a manual line break
  text("or", width / 2, 213); // Third line of text with a manual line break
  text(allQs[activeQ][1] + "?", width / 2, 243); // 4 line of text with a manual line break
}




//function to draw Option cards for the 'would you rather' screen.
function drawOptions(pName){
  background(bg1);
  fill(text1);
  textSize(24); // Set text size to 24 for the top text
  textAlign(CENTER, TOP); // Center-align the top text
  text(pName, width / 2, 78); // Center the text horizontally
  text("would you rather...", width / 2, 105); // Second line with a manual line break

  // Draw the red card with rounded corners
  fill(activeInputs[0][2]);
  noStroke(); // Make it so there's no stroke on any objects
  rect(156, 157, 264, 300, 20); // Red card position and size
  
  // Draw the text on the red card with size 16
  fill(255); // Set white text color for the card text
  textSize(16); // Set text size to 16 for the card text
  textAlign(LEFT, TOP);
  text(allQs[activeQ][0], 188, 182); // First line
  //text("coworker’s minds", 188, 202); // Second line with a manual line break
  
  // Draw text on the bottom of the red card for inputs size 20
  textSize(20); // Set text size to 16 for the card text
  text(activeInputs[0][1], 188, 275); // First line
  
  // Draw the purple card with rounded corners
  fill(activeInputs[1][2]); // Purple color for the purple card
  rect(431, 157, 264, 300, 20); // Purple card position and size

  fill(255); // Set white text color for the card text
  // Draw the text on the purple card with size 16
  textSize(16); // Set text size to 16 for the card text
  text(allQs[activeQ][1], 463, 182); // First line
  //text("your boss agree with all", 463, 202); // Second line with a manual line     break
  //text("your ideas", 463, 222); // Third line with a manual line break

  // Draw text on the bottom of the purple card for inputs size 20
  textSize(20); // Set text size to 16 for the card text
  text(activeInputs[1][1], 463, 275); // First line
}


//draw the feedback screen that a particular option (0 or 1) won
function drawOptionWon(optionIndex){
  
  background(activeInputs[optionIndex][2]); // Background color

  // Draw the text on the red card with size 16
  fill(255); // Set white text color
  textSize(16); // Set text size to 16
  textAlign(LEFT, TOP);
  
  if (optionIndex == 0){
    text(allQs[activeQ][optionIndex], 188, 182); // First line
  }
  else if (optionIndex == 1){
    text(allQs[activeQ][optionIndex], 463, 182); // First line
  }
}

function drawPass(){
  background(bg1); // Background color
  fill(text1); // Set white text color
  noStroke(); // Make it so there's no stroke on the text
  textAlign(CENTER, TOP); // Center-align the top text


  // Draw the "Rad!" text
  textFont(robotoBold);
  textSize(16); // Set text size to 24 for the top text
  text("RAD!", width / 2, 118); // Center the text horizontally
  
  // Draw the "XXX, it's time to pass the yap" text - note, idk if 'pass the yap' should be title case or not lol
  textSize(34); // Set text size to 24 for the top text
  text(p2.name, width / 2, 157); // Center the text horizontally
  text("it's time to Pass the Yap...", width / 2, 197); // Second line of text with a manual line break
  
  // Draw bottom text for inputs
  textFont(robotoMedium);
  textSize(16); // Set text size to 16 for the bottom text
  textAlign(LEFT, TOP); // left allign bottom text
  fill(activeInputs[0][2]); //make 'spin the dial purple'
  text(activeInputs[0][1], 340, 260); 
  fill(text1); //make 'to continue' black. note - i manually positioned this bottom text so its in the middle of the screen and also half purple half black. 
  text("to continue", 464, 260);
  
}


//I didn't write this one. shuffle function to shuffle list order
function shuffleList(array){ 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
} 