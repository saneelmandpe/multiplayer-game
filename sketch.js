var ball;

var database;

var ballPosition;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();
}

function draw(){

var ballPositionFromDatabase=database.ref("ball/position");
ballPositionFromDatabase.on("value",readPosition);

    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    console.log("x,y="+x+","+y);
    ball.x = ball.x + x;
    ball.y = ball.y + y;
    writePosition(x,y);
}
function readPosition(data) 
{ ballPosition = data.val();
     ball.x = ballPosition.x;
      ball.y = ballPosition.y;
       console.log('reading values ' + JSON.stringify(data));
        //it reads the value we have set on db 
}
function writePosition(xValue, yValue) {
     database.ref('ball/position').set(
         { 'x': ballPosition.x + xValue, 'y': ballPosition.y + yValue 
        }); 
        console.log('writing value ' + ballPosition.x + xValue + ", " + ballPosition.y+yValue);
     }