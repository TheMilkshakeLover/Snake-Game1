var apple, snake, score, border1, border2, border3, border4, Lose, obstacle, title, trophie1, trophie2, trophie3, win
score = 99

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;


function preload(){
//Load Images
  Appleimage = loadImage("apple.png")
  Backgroundimage = loadImage("background.jpg")	
  Loseimage = loadImage("YouLose.png")
  SnakeLeft = loadImage("SnakeLeft.gif")
  SnakeUp = loadImage("SnakeUp.gif")
  SnakeDown = loadImage("SnakeDown.gif")
  SnakeRight = loadImage("Snake.gif")
  Title = loadImage("Title.png")
  BronzeTrophie = loadImage("BronzeMedal.png")
  SilverTrophie = loadImage("SilverMedal.png")
  GoldTrophie = loadImage("GoldMedal.png")
  YouWin = loadImage("Trophie.png")
}

function setup() {

  createCanvas(displayWidth, displayHeight)
	rectMode(CENTER);
  
//Create sprites and change their visibility
  snake = createSprite(700,350, 20, 20)
  snake.addImage(SnakeRight)
  snake.scale = 0.04
  border1 = createSprite(700,130,400,10)
  border1.visible = false
  border2 = createSprite(700,530,400,10)
  border2.visible = false;
  border3 = createSprite(500,330,10,400)
  border3.visible = false
  border4 = createSprite(900,330,10,400)
  border4.visible = false
  Lose = createSprite(700,300)
  Lose.addImage("Lose",Loseimage)
  Lose.visible = false
  Lose.scale = 0.5
  title = createSprite(700, 80)
  ObstaclesGroup = new Group()
  trophie1 = createSprite(510, 110, 30, 40)
  trophie1.scale = 0.2
  trophie1.addImage(BronzeTrophie)
  trophie1.visible = false
  trophie2 = createSprite(550, 110, 30, 40)
  trophie2.scale = 0.2
  trophie2.addImage(SilverTrophie)
  trophie2.visible = false
  trophie3 = createSprite(590, 110, 30, 40)
  trophie3.scale = 0.2
  trophie3.addImage(GoldTrophie)
  trophie3.visible = false
  win = createSprite(700,300)
  win.addImage("trophie",YouWin)
  win.visible = false

  
}


function draw() {

//Add the background
    background(255);
      image(Backgroundimage, 500,130,400,400)  


//Make the borders
  fill("black")
    rect(700,130,400,10)

  fill("black")
    rect(700,530,400,10)

  fill("black")
    rect(500,330,10,400)

  fill("black")
    rect(900,330,10,400)
  

//Give the snake the ability to move and change the snake positions.
  if(keyDown("w")){
    snake.velocityY = -4
    snake.velocityX = 0
    snake.rotation = -90
  }
  if(keyDown("s")){
    snake.velocityY = +4
    snake.velocityX = 0
    snake.rotation = 90
  }
  if(keyDown("a")){
    snake.velocityX = -4
    snake.velocityY = 0
    snake.rotation = -180
  }
  if(keyDown("d")){
    snake.velocityX = +4
    snake.velocityY = 0
    snake.rotation = 0
  }


//Title and instructions.
  title.addImage(Title)
  title.scale = 0.3


spawnObstacles()
drawSprites();


//Lose the game when touching the boarders
    if(snake.collide(border1)){
      Lose.visible = true
    }
    if(snake.collide(border2)){
      Lose.visible = true
    }
    if(snake.collide(border3)){
      Lose.visible = true
    }
    if(snake.collide(border4)){
      Lose.visible = true
    }


//Display the score
  textFont("Gloucester MT Extra Condensed")
  textSize(24)
    text("Score " + score, 830, 120)

//Make the trophies
  if(score === 15){
    trophie1.visible = true
  }
  if(score === 50){
    trophie2.visible = true
  }
  if(score === 100){
    trophie3.visible = true
  }
  if(score === 101){
    win.visible = true
  }
      

//Make the snake eat the apples
  if(snake.collide(ObstaclesGroup)){
      obstacle.destroy()
      score = score+1
  }
}
   

function spawnObstacles() {
//Spawn the apples in randomly
  if(frameCount % 160 === 0) {
    obstacle = createSprite(random(600, 850),random(140,500), 10,10)
    obstacle.addImage(Appleimage);
    
//Assign scale and lifetime to the obstacle           
  obstacle.scale = 0.06;   

  ObstaclesGroup.add(obstacle)
  }
}