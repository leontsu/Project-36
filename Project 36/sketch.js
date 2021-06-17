var dog,sadDog,happyDog, database, databaseObj;
var foodS,foodStock;
var addFood;
var foodObj;
var database;
var timeh

//create feed and lastFed variable here
var feed, lastFed;
var feedButton;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedButton = createButton("Feed the Dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  lastFed = database.ref('FeedTime');
  lastFed.on("value", function(data){
    FeedTime = data.val()
  })

  console.log(hour(timeh))
 
  //write code to display text lastFed time here
  push();
  fill(0);
  textSize(15)
  text("Last Fed: " + hour(timeh), 400,30);
  pop();
  if (lastFed >= 12)
  {
    
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if (food_stock_val <= 0)
  {
    foodObj.updateFoodStock(food_stock_val*0);
  }else{
    foodObj.updateFoodStock(food_stock_val-1);
  }
  database.ref('/').update({
    Food: food_stock_val
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
