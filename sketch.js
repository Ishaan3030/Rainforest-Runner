 var bg, bgImg, river, riverimg, coati, coatiimg, invisibleWall, coati_running, coati_collided;
 var obstacleA, obstacleB, obstacleC, obstaclesGroup;
 var ground, gimage, invisibleGround;
 var START = 2;
 var PLAY= 1;
 var END = 0;
 var gameState = START;

 var score = 0

 function preload(){
  coati_running = loadAnimation("coati1.png", "coati2.png", "coati3.png")
  coati_collided = loadAnimation("coati.png");
  bgImg = loadImage("bg.jpg");
  riverimg = loadImage("river.png")
  coatiimg = loadImage("boat.png")
  gimage = loadImage("ground.png")
  obstacleA = loadImage("obstacleA.png");
  obstacleB = loadImage("obstacleB.png");
  obstacleC = loadImage("obstacleC.png");
 }

 function setup(){
  createCanvas(1200, 600)

  ground = createSprite(1200,650,600,10);
  ground.addImage(gimage)
  ground.scale = 4

  invisibleGround = createSprite(600,580,1200,30);
  invisibleGround.visible = false;

  coati = createSprite(200, 450, 200, 100);

  coati.addAnimation("running", coati_running)
  coati.addAnimation("collided", coati_collided)
  coati.scale = 0.4 

  obstaclesGroup = new Group();

 }

 function draw(){
  background(bgImg)

  textSize(30)
  fill("black")
  text("Score: "+ score, 10, 30)
if(gameState === START){
  coati.addAnimation("running", coati_running)
  
  textSize(50)
  fill("red")
  text("Rainforest Runner", 410, 50)
  textSize(40)
  text("Press P to Play", 480, 300)

  

  if(keyDown("p")){
    gameState = PLAY
  }
} else if(gameState === PLAY){
  
  score += 1;

  coati.addAnimation("collided", coati_collided)

  ground.velocityX = -6;
  
 if(keyDown("space") && coati.y >= 550){
    coati.velocityY = -20;
  }

 coati.velocityY = coati.velocityY + 0.8
 
  if(ground.x<0){
    ground.x=1200
  }

  spawnObstacles();


  if(obstaclesGroup.isTouching(coati)){
    gameState = END;
  }
}else if(gameState === END){

  textSize(40)
  fill("red")
  text("Game Over", 510, 250)
  text("Score: "+ score, 525, 300)
  text("Press R to Restart", 450, 350)

  coati.velocityY= 0;
  ground.velocityX = 0;

  coati.addAnimation("running", coati_running)

    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    if(keyDown("r")){
      reset();
   }
}
coati.collide(invisibleGround)
  drawSprites();

 }

 function reset(){

  coati.addAnimation("running", coati_running)

  score = 0;

  gameState = PLAY;
  obstaclesGroup.destroyEach();

  coati.x = 200
  coati.y = 500
}

 function spawnObstacles(){
  if(frameCount % 70 === 0){
  var obstacle = createSprite(1200, 530,50,20);
  obstacle.velocityX = -10;
  
  var rand = Math.round(random(1,3));
  switch(rand){
    case 1: obstacle.addImage(obstacleA);
    break;
    case 2: obstacle.addImage(obstacleB);
    break;
    case 3: obstacle.addImage(obstacleC);
    break;
    default: break;
  }
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}
