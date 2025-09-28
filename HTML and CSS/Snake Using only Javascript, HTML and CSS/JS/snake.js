const isPaused = false;
function game(){
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let snake = [{x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}, {x: 120, y: 150}, {x: 110, y: 150}];
    var score = 0;
   

    function drawSnakePart(snakePart) {  
        ctx.fillStyle = 'lightgreen';  
        ctx.strokeStyle = 'darkgreen';
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    };

    function drawSnake(){
        snake.forEach(drawSnakePart);   
    };

    let dx = 10;
    let dy = 0;

    function advanceSnake(){
        const head = {x: snake[0].x + dx , y: snake[0].y + dy};
        snake.unshift(head);
        const didEatFood = snake[0].x === foodX && snake[0].y === foodY;  
        if (didEatFood){    
            createFood();
            score += 10;
            document.getElementById('score').innerHTML = score;  
        } else {    
            snake.pop();  
        }
    };

    function rightadvanceSnake(){
        dx = 10;
        dy = 0;
        advnceSnake();
    };

    function upadvanceSnake(){
        dx = 0;
        dy = -10;
        advnceSnake();
    };

    function canvasdrawSnake(){
        drawSnake();
    };

    function clearCanvas() {
        ctx.fillStyle = 'burlywood';
        ctx.strokeStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };

    canvasdrawSnake();

    function stepOne(){
        setTimeout(() => {  clearCanvas();  advanceSnake();  drawSnake();}, 200);
    };

    function main(){
        if(isgameEnd()){
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const gradient = ctx.createLinearGradient(0, canvas.height/2 - 50, 0, canvas.height/2 + 20);
            gradient.addColorStop(0, '#FF4E50'); 
            gradient.addColorStop(1, '#F9D423'); 

            ctx.font = 'bold 50px Verdana';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.shadowColor = '#FF4E50';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            ctx.fillStyle = gradient;
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);

            ctx.lineWidth = 3;
            ctx.strokeStyle = '#fff';
            ctx.strokeText('GAME OVER', canvas.width / 2, canvas.height / 2);

            ctx.shadowColor = 'transparent'; 
            ctx.font = '20px Verdana';
            ctx.fillStyle = 'white';
            ctx.fillText('Press Start to Play Again', canvas.width / 2, canvas.height / 2 + 50);

            return;
        }
        setTimeout(() => {  clearCanvas(); drawFood(); advanceSnake();  drawSnake(); main();}, 200);
        
    }

    function changeDirection(event){
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;
        const keypressed = event.keyCode;

        if (keypressed === LEFT_KEY && !goingRight) {    dx = -10;    dy = 0;  }
        if (keypressed === UP_KEY && !goingDown) {    dx = 0;    dy = -10;  }
        if (keypressed === RIGHT_KEY && !goingLeft) {    dx = 10;    dy = 0;  }
        if (keypressed === DOWN_KEY && !goingUp) {    dx = 0;    dy = 10;  }
    }

    function randomTen(min, max){  
        return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }

    function createFood(){  
        foodX = randomTen(0, gameCanvas.width - 10);  
        foodY = randomTen(0, gameCanvas.height - 10);

        snake.forEach(function isFoodOnSnake(part) { const foodIsOnSnake = part.x == foodX && part.y == foodY;  if (foodIsOnSnake)createFood();  });

    }

    function drawFood(){  
        ctx.fillStyle = 'red';  
        ctx.strokeStyle = 'darkred';  
        ctx.fillRect(foodX, foodY, 10, 10);  
        ctx.strokeRect(foodX, foodY, 10, 10);
    }

    function didGameEnd(){
        for (let i = 4; i < snake.length; i++) {    
            const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;    
            if (didCollide) return true;  
        }
    }

    function wallCollision(){
        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x > gameCanvas.width - 10;
        const hitTopWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > gameCanvas.height - 10;
        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
    };

    function isgameEnd(){
        return didGameEnd() || wallCollision()
    };

    createFood();
    main();
    document.addEventListener("keydown", changeDirection)
}









