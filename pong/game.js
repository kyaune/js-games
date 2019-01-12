
                    var canvas = document.getElementById("myCanvas");
                    var ctx = canvas.getContext("2d");
                    var x = canvas.width/2,
                        y = canvas.height-30,
                        dx = Math.random() * (4 - 2) + 2,
                        dy = Math.random() * (4 - 2) + 2,
                        ballRadius = 10,
                        paddleHeight = 10,
                        paddleWidth = 95,
                        paddleX = (canvas.width-paddleWidth)/2,
                        rightPressed = false,
                        leftPressed = false,
                        brickRowCount = 4,
                        brickColumnCount = 5,
                        brickWidth = 75,
                        brickHeight = 20,
                        brickPadding = 10,
                        brickOffsetTop = 60,
                        brickOffsetLeft = 230,
                        bricks = [],
                        timer = 0,
                        score = 0;
                    for(var c=0; c<brickColumnCount; c++) {
                        bricks[c] = [];
                        for(var r=0; r<brickRowCount; r++) {
                            bricks[c][r] = { x: 0, y: 0, status: 1 };
                            if (r == 0 || r == (brickRowCount-1)) {
                                bricks[c][r].status = 2;
                            }
                        }
                    }
                function drawScore() {
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "#0095DD";
                    ctx.fillText("Score: " + score, 8, 20);
                    ctx.fillText("Time spent: " + Math.round(timer), 8, 40);
                }
                function drawBall() {
                        ctx.beginPath();
                        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
                        ctx.fillStyle = "#f44274";
                        ctx.fill();
                        ctx.closePath();
                }
                function drawPaddle() {
                    ctx.beginPath();
                    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
                function drawBricks() {
                    for(var c=0; c<brickColumnCount; c++) {
                        for(var r=0; r<brickRowCount; r++) {
                            if(bricks[c][r].status != 0) {
                                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                                bricks[c][r].x = brickX;
                                bricks[c][r].y = brickY;
                                ctx.beginPath();
                                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                                ctx.fillStyle = "#891820";
                                if(bricks[c][r].status == 2){
                                    ctx.fillStyle = "#c6a313";
                                }
                                ctx.fill();
                                ctx.closePath();
                            }
                        }
                    }
                }
                function collisionDetection() {
                    for(var c=0; c<brickColumnCount; c++) {
                        for(var r=0; r<brickRowCount; r++) {
                            var b = bricks[c][r];
                            if(b.status != 0) {
                                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                                    dy = -dy;
                                    b.status --;
                                    score++;
                                    if (score == (brickRowCount*brickColumnCount + brickColumnCount*2)) {
                                        alert("YOU WIN, CONGRATULATIONS!");
                                        document.location.reload();
                                        clearInterval(interval);
                                }
                            }
                        }
                    }
                }
            }

                function draw() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawBall();
                    drawPaddle();
                    drawBricks();
                    drawScore();
                    collisionDetection();
                    x += dx;
                    y += dy;
                    timer += 0.01;
                    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
                        dx = -dx;
                    }
                    if(y + dy < ballRadius) {
                        dy = -dy;
                    } else if(y + dy > canvas.height-ballRadius) {
                        if(x > paddleX && x < paddleX + paddleWidth) {
                            dy = -dy;
                        }
                        else {
                            // alert("GAME OVER");
                            document.location.reload();
                        }
                    }
                    if (rightPressed && paddleX < canvas.width-paddleWidth) {
                        paddleX += 7;
                    }
                    else if (leftPressed && paddleX > 0) {
                        paddleX -= 7;
                    }
                }

                document.addEventListener("keydown", keyDownHandler, false);
                document.addEventListener("keyup", keyUpHandler, false);
                function keyDownHandler(e) {
                    if (e.key == "Right" || e.key == "ArrowRight") {
                        rightPressed = true;
                    }
                    else if (e.key == "Left" || e.key == "ArrowLeft") {
                        leftPressed = true;
                    }
                }

                function keyUpHandler(e) {
                    if (e.key == "Right" || e.key == "ArrowRight") {
                        rightPressed = false;
                    }
                    else if (e.key == "Left" || e.key == "ArrowLeft") {
                        leftPressed = false;
                    }
                }
                
                var interval = setInterval(draw, 10);