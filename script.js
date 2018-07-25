const canvas = document.querySelector("canvas");
const scoreDisplay = document.querySelector("#score");
const rowsDisplay = document.querySelector("#rows");
const gameOverDisplay = document.querySelector("#gameOver");
const context = canvas.getContext("2d");

const scale = 25;

const boardWidth = canvas.width/scale;
const boardHeight = canvas.height/scale;

// piece colors
var colors = [null, "#0074D9", "#7FDBFF", "#2ECC40", "#FFDC00","#FF4136", "#F012BE", "#FF851B"];

// piece types
var pieces = {
	"I":[[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0]],
	"J":[[0, 2, 0],[0, 2, 0],[2, 2, 0]],
	"L":[[0, 3, 0],[0, 3, 0],[0, 3, 3],],
	"O":[[4, 4],[4, 4]],
	"Z":[[5, 5, 0],[0, 5, 5],[0, 0, 0]],
	"T":[[0, 0, 0],[6, 6, 6],[0, 6, 0]],
	"S":[[0, 0, 0],[0, 7, 7],[7, 7, 0]]
}

var prevTime = 0;
var elapsed = 0;
var score = 0;
var rowsCleared = 0;
var isGameOver = false;

var player = newPlayer();
var board = createBoard(boardHeight, boardWidth);

/* initialize game */
function init(){
	board = createBoard(boardHeight, boardWidth);
	player = newPlayer();
	score = 0;
	rowsCleared = 0;
	isGameOver = false;
	gameOverDisplay.style.display = "none";
	scoreDisplay.style.color = "#0074D9";
	rowsDisplay.style.color = "#0074D9";
	update(0);
}

/* updates game every frame */
function update(time){
	if(!isGameOver){
		elapsed += time - prevTime;
		prevTime = time;

		// drop player piece every second
		if(elapsed > 1000){
			movePlayer(83);
		}

		clearScreen();
		sweepBoard();
	  draw(board, 0, 0); // draw game board
		draw(player.matrix, player.pos.x, player.pos.y); // draw player
		scoreDisplay.innerText = score;
		rowsDisplay.innerText = rowsCleared;
		requestAnimationFrame(update);
	}
}

/* removes filled rows and updates score */
function sweepBoard(){
	let row = [];
	let scoreMult = 4;

	for(let x = 0; x < boardWidth; x++){
		row.push(0);
	}

	for(let y = board.length - 1; y > 0; y--){
		let sweepRow = true;
		for(let x = 0; x < boardWidth; x++){
			if(board[y][x] === 0){
				sweepRow = false;
			}
		}
		if(sweepRow){
			board.splice(y, 1); // delete row
			board.unshift(row.slice()); // add new empty row at top
			score += boardWidth * scoreMult;
			scoreMult *= 4;
			rowsCleared++;
		}
	}
}

/* returns new game board */
function createBoard(rows, cols){
	var board = [], row = [];
	while(cols--) row.push(0);
	while(rows--) board.push(row.slice());
	return board;
}

/* returns new player object with random piece type */
function newPlayer(){
	let pieceType = "IJLOZTS"[(Math.random()*7) | 0];
	let player = {
		matrix: pieces[pieceType],
		pos: {x: boardWidth/2 - 1, y: 0}
	}
	return player;
}

/* clears canvas */
function clearScreen(){
	context.fillStyle = "#111111";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

/* draws provided matrix on canvas */
function draw(matrix, offsetX, offsetY){
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value !== 0){
				context.fillStyle = colors[value];
				context.fillRect(x + offsetX, y + offsetY, 1, 1);
			}
		});
	});
}

/* rotates player piece */
function rotatePlayer(dir){
	// matrix transpose
	for(let y = 0; y < player.matrix.length; y++){
		for(let x = 0; x < y; x++){
			[player.matrix[y][x], player.matrix[x][y]] = [player.matrix[x][y], player.matrix[y][x]];
		}
	}

	// matrix reverse
	if(dir > 0){
		player.matrix.forEach(row => row.reverse());
	} else {
		player.matrix.reverse();
	}
}

/* moves player piece if valid */
function movePlayer(key){
	let newX = player.pos.x;
	let newY = player.pos.y;

	if(key === 65){
		newX -= 1; // move left
	} else if(key === 68){
		newX += 1; // move right
	} else if(key === 83){
		newY += 1; // move down
		elapsed = 0;
		score += 1;
	} else if(key === 81){
		rotatePlayer(-1); // rotate ackwise
	} else if(key === 69){
		rotatePlayer(1); // rotate ckwise
	}

	// prevent collision due to piece rotation
	let offset = 0;
	while(checkCollision(newX+offset, newY) === "left"){
		offset++;
		newY = player.pos.y;
	}
	while(checkCollision(newX+offset, newY) === "right"){
		offset--;
		newY = player.pos.y;
	}

	// prevent collision due to piece movement
	let collision = checkCollision(newX, newY);
	if(collision === "bottom"){
		updateBoard();
		player = newPlayer();
		return;
	} else if(collision === "top"){
		// if piece collides with the top, game over
		gameOverDisplay.style.display = "block";
		scoreDisplay.style.color = "#FF4136";
		rowsDisplay.style.color = "#FF4136";
		isGameOver = true;
		return;
	}
	updatePlayer(newX + offset, newY);
}

/* adds current player piece to game board */
function updateBoard(){
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value !== 0){
				board[y + player.pos.y][x + player.pos.x] = value;
			}
		});
	});
}

/* updates player coordinates */
function updatePlayer(newX, newY){
	player.pos = {x: newX, y: newY};
}

/* returns true if player piece touches another piece */
function touchedPiece(value, x, y){
	return value !== 0 && y < boardHeight && x < boardWidth && 
	y >= 0 && x >=0 && board[y][x] !== 0;
}

/* returns direction of collision, else returns empty string */
function checkCollision(newX, newY){
	let dir = "";
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value !== 0){
				
				// left collision
				if(x + newX < 0){
					dir = "left";
				}
				// right collision
				else if(x + newX > boardWidth - 1){
					dir = "right";
				}
				// bottom collision
				else if(y + newY > boardHeight - 1 || touchedPiece(value, x + newX, y + newY)){
					dir = "bottom";
					// if bottom and top collided
					if(newY <= 1){
						dir = "top";
					}
				}
			}
		});
	});

	return dir;
}

document.addEventListener("keydown", event => {
	movePlayer(event.which);
});

context.scale(scale, scale);
init();
