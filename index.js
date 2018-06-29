 /*
	apple bad coordonates respawn respawn
	Apple outside the canvas - DONE
 */
// Global vars
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var gameOver=false;


// var userSelectedValue=document.getElementById("start").value;  //ON TEST
var dir; //stocking curent snake direction
var textSize=1.3;
var width=1500; //width of the page default 1500
var heigth=700; //heigth of the page default 700
var gameSpeed=100; 
var snakeSize=30; //controls all the sizes from game
var checkArea=snakeSize/1.5; //check near apple
var snake=[];
var haveMoved=false; //check if snaked moved 
 
var points=6; // points=snake length

var snakeX=Math.floor(Math.random()*width); //initializing snake coordonates
var snakeY=Math.floor(Math.random()*heigth); //initializing snake coordonates
var appleX,appleY; //stocking apple coordonates
var dieSound,eatSound; //sounds

sounds.load([ //load local sounds
	"explosion.wav", 
	"bounce.mp3"
  ]);
sounds.whenLoaded = setup; //check if sound loaded and the store it.

function setup(){ //setup of sound framework
	 dieSound=sounds["explosion.wav"];
	 eatSound=sounds["bounce.mp3"]; 
	 
  }
function main(){ //first frame of page
	 drawBackground();
	 drawSnakeBody(snakeX,snakeY);
	 appleValues();
} main()

setInterval(function(){ // FPS Logic ,game low fps
	drawBackground(); //draw background
	drawApple(); //draw apple on screen
	direction(); //check direction
	passFrames(); //render snake after every frame
	checkOutsideCanvas(); //check if snake is outside the canvas
	checkSelfCollision();  //check if snaked hited himself
	if(checkApple()){ //check if snake have eaten the apple
		eatSound.play(); //play eat sound
		points++; //if snake eated apple ,grow it
		appleValues(); //respawn apple
		drawApple(); //draw resapwned apple
	}
	if(gameOver){
		respawnSnake()
		dieSound.play();
	};
},gameSpeed);

setInterval(function(){ //fast game procesing needs
	if(snake.length >= points+1){ // make sure there are not more than "points" elemets in array
		snake.pop();
	}
	checkAppleCollision(); //check apple on 1ms time if it is outside the canvas
	text();  //render points text
	// gameSpeed=Number(userSelectedValue) || 70;  //on test!
},1);

function passFrames(){  // draw the snake from array
	for(var i=snake.length-1;i>=1;i--){
		ctx.fillStyle="red";
		ctx.fillRect(snake[i].x,snake[i].y,snakeSize,snakeSize);

		// snake head
		ctx.fillStyle="blue";
		ctx.fillRect(snake[0].x,snake[0].y,snakeSize,snakeSize); // make the head first from array
	}
	haveMoved=true;//first movement of snake
}

function checkSelfCollision(){ //check if snake hited himself
	if(snake.length >  9){
		for(var i=3;i<snake.length-1;i++){
			if(snake[0].x == snake[i].x && snake[0].y == snake[i].y ){
				gameOver=true;
			}
		}
	}
}	

function checkOutsideCanvas(){ //check if snake is outside the canvas
	if(snake[0].x >= width 
	|| snake[0].y >= heigth
	|| snake[0].x <= 0
	|| snake[0].y <= 0)
		gameOver=true;
}
function respawnSnake(){ //respawn snake 
		gameOver=false;
		points=6;
		snakeX=Math.floor(Math.random()*width);
		snakeY=Math.floor(Math.random()*heigth);
		drawSnakeBody(snakeX,snakeY);
		appleValues();
		drawApple();
		dir="0";
		haveMoved=false;
		return;
}

function checkApple(){ // check all the neighbors of Apple,becouse math.random makes values !% to snake coordonates.
	for(var i=0;i<=checkArea;i++){
		if(snake[0].x == appleX+i && snake[0].y == appleY){
			return true;
		}
		if(snake[0].x == appleX && snake[0].y == appleY+i){
			return true;
		}
	}
	for(var j=checkArea;j>=0;j--){
		if(snake[0].x == appleX-i && snake[0].y == appleY){
			return true;
		}
		if(snake[0].x == appleX && snake[0].y == appleY-i){
			return true;
		}
	}
	
}	
function checkAppleCollision(){ //make sure the snake is on canvas zone
	//check if coordonates of snake are quals to snake or outside the canvas
	//if the values are bigger or smaller than canvas
	if(appleX >= width ){
		appleX-=snakeX;
		drawApple();
		return;
	}
	if (appleY >= heigth ){
		appleY-=snakeY;
		drawApple();
		return;
	}
	if( appleX <  0 ){
		appleX+=snakeX;
		drawApple();
		return;
	}
	if(appleY <  0){
		appleY+=snakeY;
		drawApple();
		return;
	}

}

function direction(){	// change direction by global variable
	if(dir == 'rigth'){
		pushToSnake(snake[snake.length-1].x+snakeSize,snake[snake.length-1].y)
		drawSnakeBody(snake[0].x+=snakeSize,snake[0].y);
	}
	if(dir == 'left'){
		pushToSnake(snake[snake.length-1].x-snakeSize,snake[snake.length-1].y);
		drawSnakeBody(snake[0].x-=snakeSize,snake[0].y);

	}
	if(dir == 'up'){
		pushToSnake(snake[snake.length-1].x,snake[snake.length-1].y-snakeSize);
		drawSnakeBody(snake[0].x,snake[0].y-=snakeSize);
	}
	if(dir == 'down'){
		pushToSnake(snake[snake.length-1].x,snake[snake.length-1].y+snakeSize);
		drawSnakeBody(snake[0].x,snake[0].y+=snakeSize);
	}
}

function drawBackground(){ //draw background of the page
	canvas.width = width; // canvas size
	canvas.height = heigth; // canvas size
	ctx.fillStyle="black"; //canvas initialization
	ctx.fillRect(0, 0, canvas.width, canvas.height); //canvas initialization
}

window.addEventListener("keydown",function(e){ //user input
 		 if (event.defaultPrevented) {
   		 return; // Do nothing if the event was already processed
}
// prevent for changing direction (if rigth then not left)
	if(e.keyCode == 87 || e.keyCode ==38){
		if(dir != 'down')	dir="up";
 	}
  	if(e.keyCode == 83 || e.keyCode ==40){
		if(dir != 'up') dir='down';
	}
  	if(e.keyCode == 65 || e.keyCode ==37){
		if(dir != 'rigth') dir='left';
	}
 	 if(e.keyCode == 68 || e.keyCode ==39){
		if(dir != 'left') dir='rigth';
	}
});

function pushToSnake(a,b){ //push coordonates to snake array
	snake.push({"x":a,"y":b}); //push to array elements
}

function drawSnakeBody(a,b){ // draw snake body
		pushToSnake(a,b);
	 	snake.unshift({"x":a,"y":b}); // Add elements to start of array
		ctx.fillStyle="red";
		ctx.fillRect(snake[snake.length-1].x,snake[snake.length-1].y,snakeSize,snakeSize);
}
// 
function drawApple(){ //draw apple
	base_image = new Image();
	base_image.src = 'http://www.minecraftguides.org/wp-content/uploads/2012/07/appleG.gif';
	base_image.onload = function(){
	ctx.drawImage(base_image, appleX, appleY,snakeSize,snakeSize);
	// resolve the bad imagine posotioning
	}
	// ctx.fillStyle="green";
	// ctx.fillRect(appleX,appleY,snakeSize,snakeSize);
}
function appleValues(){ //draw apple by snake random preinitialized(on top of file) head coordonates
	appleX=snakeX+Math.floor(Math.random()*10)*snakeSize;
	appleY=snakeY+Math.floor(Math.random()*10)*snakeSize;
}

function text(){ //text of the page
	ctx.font = snakeSize/textSize+"px"+" Ubnutu";
	ctx.fillText("Points: "+points ,width/60,heigth/20);

}
