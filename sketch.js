var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  monkey = createSprite(80, 390, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 395, 900, 10);
  ground.x = ground.width / 2
  console.log(ground.x);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(600, 200);
  if (keyDown("space") && monkey.y >= 300) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 1;
  }
  
   if (monkey.isTouching(obstacleGroup)) {
    obstacleGroup.destroyEach(); 
  }
  
  spawnObstacles();
  spawnBananas();
  fill("black");
  text("score: " + score, 300, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("survival time: "+ survivalTime, 100, 50);
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 60 === 0) { 
    var obstacle = createSprite(300, 370, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage("obstacle", obstacleImage)
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(300, 250, 10, 40);
    banana.velocityX = -6;
    banana.addImage("banana", bananaImage)
    banana.scale = 0.1;
    banana.lifetime = 300;
    bananaGroup.add(banana);
  }
}