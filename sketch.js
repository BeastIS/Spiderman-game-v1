/*
 * Assignment 2: SPIDER-MAN Far From Home
 
 * The sketch draws a prototype for the proposed game,
 * advertising the latest Spider-man movie. It immerses the user
 * into the game, letting them become Spider-man. Using the left
 * and right arrows to move the hand, and the SHIFT button to
 * shoot, the user must reach 100 points to kill the Elemental
 * and save Earth. In this level, Level 1, the Elemental is
 * Hydro-Man. Users can navigate through the game preface
 * screens by clicking.
 * Credits:
 * 
 * Sound song.mp4 taken from: Michael Giacchino
 * (https://www.youtube.com/watch?v=eqplMTgvehU)
 * Sound shoot.mp3 taken from: Film Learnin
 * (https://www.youtube.com/watch?v=ib79vUE2x9Y)
 * Sound ding.mp3 taken from: GamingSoundEffectsFTW
 * (https://www.youtube.com/watch?v=NovyGK3L9hY)
 */

const HOME = 0;
const MISSION = 1;
const INSTRUCTIONS = 2;
const GAME = 3;
const COMPLETE = 4;

let state = HOME;

let bg;
let loc;
let vel;
let player;
let drops;
let myDrops = [];
let web;
let myWeb = [];
let score = 0;
let song;

let timeStarted = 0;
let i = 0;

function preload() {
  Home = loadImage("images/HomeBG.jpg");
  Mission = loadImage("images/MissionBG.jpg");
  Instructions = loadImage("images/InstructionBG.png");
  Game = loadImage("images/GameBG.jpg");
  Complete = loadImage("images/CompleteBG.png");
  Mission_S1 = loadImage("images/speech1.png");
  Mission_S2 = loadImage("images/speech2.png");
  Mission_S3 = loadImage("images/speech3.png");
  Next_Page = loadImage("images/click_next_page.png");
  Complete_S1 = loadImage("images/Complete_1.png");
  Complete_S2 = loadImage("images/Complete_2.png");
  player = loadImage("images/hand.png");
  drop = loadImage("images/drop.png");
  webImg = loadImage("images/web.png");

  // song = loadSound("sounds/song.mp4");
  shoot = loadSound("sounds/shoot.mp3");
  ding = loadSound("sounds/ding.mp3");

  fontRegular = loadFont("fonts/Spiderman-Homecoming.otf");
}

function setup() {
  createCanvas(600, 400);
  // song.loop();
  loc = createVector(200, 60);
  vel = createVector(0, 0);
  gravity = createVector(0, 0.01);
  playerPosition = createVector(260, 310);
}

function draw() {
  background(0);
  // If on Home state, draw Home screen
  if (state === HOME) {
    drawHome();
  }
  // If on Mission state, draw Mission screen
  else if (state === MISSION) {
    drawMission();
  }
  // If on Instructions state, draw Instructions screen
  else if (state === INSTRUCTIONS) {
    drawInstructions();
  }
  // If on Game state, draw Game screen
  else if (state === GAME) {
    drawGame();
  }
  // If on Complete state, draw Complete screen
  else if (state === COMPLETE) {
    drawComplete();
  }
}

// Draw Home screen on canvas
function drawHome() {
  image(Home, 0, 0);
}

// Draw Mission screen on canvas
function drawMission() {
  image(Mission, 0, 0);
  image(Mission_S1, 305, 55);

  // Show second speech bubble after 7 seconds
  if (millis() > 7000) {
    image(Mission_S2, 288, 48);
  }

  // Show third speech bubble after 14 seconds
  if (millis() > 14000) {
    image(Mission_S3, 288, 48);
  }

  // Show bext page blurb after 18 seconds
  if (millis() > 18000) {
    image(Next_Page, 400, 200);
  }
}

// Draw Instructions screen on canvas
function drawInstructions() {
  image(Instructions, 0, 0);

  // Show bext page blurb after 25 seconds
  if (millis() > 25000) {
    image(Next_Page, 475, 53, 71, 30);
  }
}

// Draw Game screen on canvas
function drawGame() {
  background(Game, 0, 0);

  // Draw current level on canvas
  fill(255);
  noStroke();
  rect(0, 17, 150, 30);

  fill(0);
  textSize(20);
  textFont(fontRegular);
  text("LEVEL 1", 20, 40);

  // Draw current score on canvas
  fill(0);
  text("SCORE:", 20, 70);
  text(score, 120, 70);

  // When score hits 100 or higher, move to Complete screen
  if (score >= 100) {
    state = COMPLETE;
    return false;
  }

  //let dropsToKeep = [];
  //let dropsHit = [];

  // Draw drops + web on canvas and activate collision detection
  for (let d of myDrops) {
    console.log(d);

    // Update drops to fall from a point
    d.update();
    // Shooting the web

    for (let w of myWeb) {
      w.show();
      // If a web hits a drop, increase score by 1 and play              sound effect
      if (d.isHit(w)) {
        //dropsHit.push(d);
        if (w.hasNotHit) {
          score += 1;
          ding.play();
          d.wasHit = true;
        }
        // If a web does not hit a drop, do nothing
        w.hasNotHit = false;
      } else {
        // Keep a record of all the drops that were NOT hit.
        console.log("not hit");
        //dropsToKeep.push(d);
      }
      // Update web to move upward at 2 speed
      w.update();
    }
    // Show the drops on the canvas
    d.show();
  }

  // console.log(myDrops.length, dropsToKeep.length, dropsHit.length, myDrops.length - dropsToKeep.length);
  // myDrops = dropsToKeep;

  for (let i = myDrops.length - 1; i >= 0; i--) {
    console.log(i);
    if (myDrops[i].wasHit) {
      myDrops.splice(i, 1);
    }
  }

  // Randomly add a new drop every now and again
  if (random(100) < 1) {
    myDrops.push(new Drops(random(width, 20, 480), 100, drop));
  }

  // Move the hand across x axis
  image(player, playerPosition.x, playerPosition.y);

  // If left arrow is pressed and the hand's position is more than 0, move player back 5 points
  if (keyIsDown(LEFT_ARROW)) {
    if (playerPosition.x - 5 >= 0) playerPosition.x -= 5;
    // Otherwise, stop at 0
    else playerPosition.x = 0;
  }

  // If right arrow is pressed and the hand's position is less than 527, move player forward 5 points
  if (keyIsDown(RIGHT_ARROW)) {
    if (playerPosition.x + 5 <= 527) playerPosition.x += 5;
    // Otherwise, stop at 527
    else playerPosition.x = 527;
  }
}

// Draw Complete screen on canvas
function drawComplete() {
  image(Complete, 0, 0);
  image(Complete_S1, 288, 48);

  // Show second speech bubble after 34 seconds
  if (millis() > 34000) {
    image(Complete_S2, 288, 48);
  }
}

function mousePressed() {
  // If mouse pressed, and state is Home, move to Mission state
  if (state === HOME) {
    timeStarted = millis();
    state = MISSION;
    return false;
  }
  // If mouse pressed, and state is Mission, move to Instructions state
  if (state === MISSION) {
    state = INSTRUCTIONS;
    return false;
  }
  // If mouse pressed, and state is Instructions, move to Game state
  if (state === INSTRUCTIONS) {
    state = GAME;
    return false;
  }
  // If mouse pressed, and state is Complete, restarted game by moving to Home state
  if (state === COMPLETE) {
    score = 0;
    myDrops = [];
    state = GAME;
    return false;
  }
}

function keyPressed() {
  // If SHIFT is pressed, shoot the web and play sound effect
  if (keyCode === SHIFT) {
    myWeb.push(new Web(playerPosition.x, playerPosition.y, Web));
    shoot.play();
  }
}
