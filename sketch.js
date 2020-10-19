//Create variables here
var dog,happydog;
var database;
var foods,foodstock;
var fedtime,lastfed;
var foodobj;
var changeState,readState;
var bedroom,garden,washroom,sadDog;
var currentTime;

function preload()
{
  //load images here
  img = loadImage("Dog.png");
  img2 = loadImage("happydog.png");
  bedroom = loadImage("virtual pet images/Bed Room.png");
  garden = loadImage("virtual pet images/Garden.png");
  washroom = loadImage("virtual pet images/Wash Room.png");
  sadDog = loadImage("virtual pet images/Lazy.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,250,30,40);
  dog.addImage(img);
  dog.scale = 0.15;

  foodobj = new Foods();

  foodstock = database.ref('Food');
  foodstock.on("value",readstock);

  feed = createButton("Feed The Dog");
  feed.position(550,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(650,95);
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })
}


function draw() {  
  

  //add styles here

  currentTime = hour();
  if(currentTime==(lastfed+1)){
    update("Playing");
    foodobj.garden();
  }else if(currentTime==(lastfed+2)){
    update("Sleeping");
    foodobj.bedroom();
  }else if(currentTime>(lastfed+2) && currentTime<=(lastfed+4)){
    update("Bathing");
    foodobj.washroom();
  }else{
    update("Hungry");
    foodobj.display();
  }

  if(gameState !== "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  fedtime = database.ref('FeedTime');
  fedtime.on("value",function(data){
    lastfed = data.val();
  })

  drawSprites();
}

function readstock(data){
  foods = data.val();
  foodobj.updateFoodStock(foods);
}

function feedDog(){
  dog.addImage(img2);

  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodobj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

function addFoods(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}


