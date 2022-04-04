var PLAY = 1
var ENDGAME = 2
var gamestate =PLAY
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var Cloudimg
var objetosolitario,objetocomamigo,objetocom3amigo,objetocomalgumsamigos,objetocom5amigos,nomecriativo;
var grupocolide
var gruponaocolide
var SomFlamengo
var FazoHurro
var Receba 

var score=0
//trex score top

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
objetosolitario = loadImage ("obstacle1.png")
  groundImage = loadImage("ground2.png");
  Cloudimg=loadImage("cloud.png")
 objetocomamigo= loadImage ("obstacle2.png")
  objetocom3amigo= loadImage ("obstacle3.png")
objetocomalgumsamigos = loadImage ("obstacle4.png")
objetocom5amigos = loadImage ("obstacle5.png")
nomecriativo = loadImage ("obstacle6.png")
SomFlamengo = loadSound ("checkpoint.mp3")
FazoHurro = loadSound ("die.mp3")
receba = loadSound ("jump.mp3")
RTIMG = loadImage ("restart.png")
GVIMG = loadImage ("gameOver.png")

}

function setup() {
grupocolide=new Group ()
gruponaocolide=new Group ()
  createCanvas(windowWidth,windowHeight)
 gameOver = createSprite (width/2,height/2)
 gameOver.addImage(GVIMG)
 gameOver.scale = 2
 //espaço
 restart = createSprite (width/2,height/2+50)
 restart.addImage (RTIMG)
 
  //crie um sprite de trex
  trex = createSprite(50,height-20,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colidiu",trex_collided)
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(width/2,height-20,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //crie um solo invisível
  invisibleGround = createSprite(width/2,height-20,width,10);
  invisibleGround.visible = false;
  
  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  console.log(rand)
  trex.setCollider("circle",0,0,40)
  trex.debug=false
}

function draw() {
  //definir cor do plano de fundo
  background(180);
  text ("pontuação top"+score,width/2,50)
  console.log(trex.y)
  if (gamestate==PLAY){
    gameOver.visible = false
    restart.visible = false
score=score+Math.round (frameRate()/60)
if(score>0 && score%100 === 0){
   SomFlamengo.play() }
    if(
      (touches.length>0 && trex.y>=height-50)||
      (keyDown("space")&& trex.y >= height-50 )) {
      trex.velocityY = -10;
      receba.play ()
    }
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;

    }
    spawnClouds()
    spawnObstacle()
    if (grupocolide.isTouching(trex)){
gamestate=ENDGAME
FazoHurro.play ()

    }
  }else if (gamestate==ENDGAME){
ground.velocityX=0
grupocolide.setVelocityXEach(0)
gruponaocolide.setVelocityXEach(0)
trex.changeAnimation ("colidiu",trex_collided)
trex.velocityY=0
grupocolide.setLifetimeEach(-1)
gruponaocolide.setLifetimeEach(-1)
gameOver.visible= true
restart.visible= true
  }
  
  


  
  
  //impedir que o trex caia
  trex.collide(invisibleGround);
  if (touches.length>0||mousePressedOver(restart)){
reset ()


  }

  //Gerar Nuvens
 
  drawSprites();
}
function reset (){

  gamestate = PLAY
  gameOver.visible = false
  restart.visible = false
  grupocolide.destroyEach ()
  gruponaocolide.destroyEach ()
  trex.changeAnimation ("running",trex_running)
  score = 0
  //:>
} 
//função para gerar as nuvens
function spawnClouds(){
 //escreva seu código aqui
 if (frameCount%60==0){
  var cloud = createSprite (width+20,height/2,40,10)
  cloud.velocityX = -3
cloud.addImage (Cloudimg)
cloud.y=Math.round(random(10,100))
cloud.lifetime = 220
cloud.depth=trex.depth
trex.depth=trex.depth+1
gruponaocolide.add (cloud)
 }

}
function spawnObstacle(){
if (frameCount%60==0){
var obstacle =createSprite (width,height-35,10,40)
obstacle.velocityX = -8
var rand= Math.round(random(1,6))
switch (rand){
  case 1:obstacle.addImage(objetosolitario);
  break;
  case 2:obstacle.addImage(objetocomamigo);
  break;
  case 3:obstacle.addImage(objetocom3amigo);
  break;
  case 4:obstacle.addImage(objetocomalgumsamigos);
  break;
  case 5:obstacle.addImage(objetocom5amigos);
  break;
  case 6:obstacle.addImage(nomecriativo);
  break;
  default:break;
}
obstacle.scale = 0.5
obstacle.lifetime = 300
grupocolide.add (obstacle)
}

 
}


























































































































































































































































































































































































































































































































































































































































































































































































































































































