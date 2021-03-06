var dog;
var dogimage,happyDog,sadDog;
var foodS,foodStock,database; 
var foodStock,lastFed,feed,add;
var foodObject,fedTime;
var gameState,readState;
var bedroom,washroom,garden;
var deadDog,dogvac,foodStock,injection,running,running_left,vaccination;

function preload()
{
  dogimage = loadImage("../images/dog.png");
  happyDog = loadImage("images/happydog.png");
  sadDog = loadImage("images/lazy.png");
  bedroom = loadImage("images/bedroom.png");
  washroom = loadImage("images/washroom.png");
  garden = loadImage("images/garden.png");
  deadDog = loadImage("images/deaddog.png");
  dogvac = loadImage("images/dogvac.png");
  foodStock = loadImage("images/foodStock.png");
  injection = loadImage("images/injection.png");
  running = loadImage("images/running.png");
  running_left = loadImage("images/runningLeft.png");
  vaccination = loadImage("images/Vaccination.jpg");
    
}

function setup() 
{
  database = firebase.database();
  
  createCanvas(500,500);

  dog = createSprite(225,225,10,10);
  dog.addImage(dogimage);
  dog.scale=0.2;
  
  foodObject =new Food();

  feed = createButton("Feed the dog");
  feed.position(450,100);
  feed.mousePressed(feedDog);

  add = createButton("Add food");
  add.position(650,100);
  add.mousePressed(addFood);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('feedTime')
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });;

  
}

function draw() 
{  
  background(46, 139, 87);
  
  foodObject.display();

  currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObject.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObject.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObject.washroom();
   }else{
    update("Hungry")
    foodObject.display();
   }

  textSize(15);
  fill(255,255,255);
 
 
  if(gameState != "Hungry"){
    feed.hide();
    add.hide();
    dog.remove();
  }else{
    feed.show();
    add.show();
    dog.addImage(sadDog);
  }


  drawSprites();
  textSize(15);
  fill("black");
  text("NOTE : Press UP_ARROW to feed the dog milk!",150,20);
  text("Food Count: "+foodS,170,40);
  
}

function readStock(data)
{
  foodS=data.val();
  foodObject.updateFoodStock(foodS);
 // foodobject.updateFoodStock(position);
}

function writeStock(x)
{if(x<=0)
  {
    x=0
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    fedTime:hour(),
    gameState:"Hungry"
  })
  dog.addImage(happyDog);
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}