const canvas = document.querySelector("canvas");
const scoreDisplay = document.querySelector("#score");
const rowsDisplay = document.querySelector("#rows");
const gameOverDisplay = document.querySelector("#gameOver");
const context = canvas.getContext("2d");

const scale = 25;

const boardWidth = canvas.width/scale;
const boardHeight = canvas.height/scale;

// piece colors
let colors = ["#0074D9", "#7FDBFF", "#2ECC40", "#FFDC00","#FF4136", "#F012BE", "#FF851B"];

// piece types
let pieces = {
	"I":[[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0]],
	"J":[[0, 2, 0],[0, 2, 0],[2, 2, 0]],
	"L":[[0, 3, 0],[0, 3, 0],[0, 3, 3]],
	"O":[[4, 4],[4, 4]],
	"Z":[[5, 5, 0],[0, 5, 5],[0, 0, 0]],
	"T":[[0, 0, 0],[6, 6, 6],[0, 6, 0]],
	"S":[[0, 0, 0],[0, 7, 7],[7, 7, 0]]
}

let prevTime = 0;
let elapsed = 0;

let score;
let rowsCleared;
let isGameOver;

let player;
let board;

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
	} else {
		gameOverDisplay.style.display = "block";
		scoreDisplay.style.color = "#FF4136";
		rowsDisplay.style.color = "#FF4136";
	}
}

/* removes filled rows and updates score */
function sweepBoard(){
	let scoreMult = 4;

	for(let y = board.length - 1; y > 0; y--){
		let sweepRow = true;
		for(let x = 0; x < boardWidth; x++){
			if(board[y][x] === 0){
				sweepRow = false;
			}
		}

		if(sweepRow){
			board.splice(y, 1); // delete row
			board.unshift(Array(boardWidth).fill(0)); // add new empty row at top
			score += boardWidth * scoreMult;
			scoreMult *= 4;
			rowsCleared++;
		}
	}
}

/* returns new game board */
function createBoard(rows, cols){
	let board = [], row = [];
	while(cols--) row.push(0);
	while(rows--) board.push(row.slice());
	return board;
}

/* returns new player object with random piece type */
function newPlayer(){
	let pieceType = "IJLOZTS"[(Math.random()*7) | 0];
	return {matrix: pieces[pieceType], pos: {x: boardWidth/2 - 1, y: 0}};
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
				context.fillStyle = colors[value-1];
				context.fillRect(x + offsetX, y + offsetY, 1, 1);
			}
		});
	});
}

/* rotates player piece */
function rotatePlayer(){
	// matrix transpose
	for(let y = 0; y < player.matrix.length; y++)
		for(let x = 0; x < y; x++)
			[player.matrix[y][x], player.matrix[x][y]] = [player.matrix[x][y], player.matrix[y][x]];

	// matrix reverse
	player.matrix.forEach(row => row.reverse());
}

/* moves player piece if valid */
function movePlayer(key){
	let newX = player.pos.x;
	let newY = player.pos.y;
	
	switch(key){
		// move left
		case 65: newX--; break;
		// move right
		case 68: newX++; break;
		// move down
		case 83:
			newY++;
			score++;
			elapsed = 0;
			break;
		// rotate
		case 69: rotatePlayer();
	}

	// prevent collision due to piece rotation
	while(checkCollision(newX, newY) === "left") newX++;
	while(checkCollision(newX, newY) === "right") newX--;

	// prevent collision due to piece movement
	switch(checkCollision(newX, newY)){
		case "top": 
			isGameOver = true; 
			break;
		case "bottom":
			updateBoard();
			player = newPlayer();
			break;
		default:
			player.pos.x = newX;
			player.pos.y = newY;
	}
}

/* adds current player piece to game board */
function updateBoard(){
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value !== 0) board[y + player.pos.y][x + player.pos.x] = value;
		});
	});
}

/* returns true if player piece touches another piece */
function touchedPiece(x, y){
	return y < boardHeight && x < boardWidth && 
	y >= 0 && x >=0 && board[y][x] !== 0;
}

/* returns direction of collision, else returns empty string */
function checkCollision(newX, newY){
	for(let y = 0; y < player.matrix.length; y++){
		for(let x = 0; x < player.matrix.length; x++){
			if(player.matrix[y][x] !== 0){

				if(newY <= 1 && touchedPiece(x + newX, y + newY)) return "top";
				else if(x + newX < 0) return "left";
				else if(x + newX > boardWidth - 1) return "right";
				else if(y + newY > boardHeight - 1 || 
					touchedPiece(x + newX, y + newY)) return "bottom";
			}
		}
	}
}

document.addEventListener("keydown", event => {
	movePlayer(event.which);
});

document.querySelector("button").addEventListener("click", init);

context.scale(scale, scale);
init();
