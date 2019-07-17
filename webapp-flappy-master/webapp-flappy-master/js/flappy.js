// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

game.load.image("playerImg", "../assets/dragon_png2.jpg");
game.load.image("playerImg2", "../assets/flappy_superman.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipeBlock", "../assets/pipe_purple.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene

    game.stage.setBackgroundColor("#008080");
    game.add.text(10, 10, "Help", {font: "60px Bauhaus", fill: "e4a642"});
    game.add.sprite(100, 250, "playerImg2");
    game.input.onDown.add(clickHandler);
    //game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    labelScore = game.add.text(0, 0, score.toString());
    player = game.add.sprite(50, 50, "playerImg");
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
 .onDown.add(moveRight);
 game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
.onDown.add(moveDown);
game.input.keyboard.addKey(Phaser.Keyboard.UP)
.onDown.add(moveUp);
game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
.onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);


player.width = 40
player.height = 40

game.physics.startSystem(Phaser.Physics.ARCADE);
game.physics.arcade.enable(player);
player.body.gravity.y = 300;

var pipeInterval = 1.75 * Phaser.Timer.SECOND;
game.time.events.loop(
pipeInterval,
generatePipe
);

}

/*
 * This function updates the scene. It is called for every new frame.
 */



function clickHandler(event) {
  game.add.sprite(event.x, event.y, "playerImg2")
game.sound.play("score");
}


function spaceHandler(event) {
  score = score + 1
    labelScore.setText(score.toString());

    changeScore();
  }

function changeScore() {

    labelScore.setText(score.toString());

}


function moveRight() {
player.x = player.x + 10;


}
function moveDown() {
player.y = player.y + 10;

}

function moveUp() {
player.y = player.y - 10;

}

function moveLeft() {
player.x = player.x - 10;

}

function generatePipe() {
  var gapStart = game.rnd.integerInRange(1, 5);
  for(var count=0; count<8; count+=1){
    if(count != gapStart && count != gapStart + 1) {
   addPipeBlock(800, count * 50);
  }
 }
changeScore();

}

function addPipeBlock(x, y){
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);

  game.physics.arcade.enable(block)
  block.body.velocity.x =-200;



}
function playerJump(){
player.body.velocity.y = -190;


}
function gameOver() {

location.reload();

}
function update() {
  game.physics.arcade.overlap(player, pipes, gameOver);

}
