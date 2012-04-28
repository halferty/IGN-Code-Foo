// Bonus: Connect 4
//

// Globals

// The game grid
// . = nothing, o = player piece, x = computer piece
var grid;
			
var playerCol = 4;

function restartGame() {
	grid = [
			[".",".",".",".",".",".","."],
			[".",".",".",".",".",".","."],
			[".",".",".",".",".",".","."],
			[".",".",".",".",".",".","."],
			[".",".",".",".",".",".","."],
			[".",".",".",".",".",".","."],
			];
	for (i=0;i<6;i++) {
		for (j=0;j<7;j++) {
			$("#row" + (i+1) + "col" + (j+1)).css("color", "black");
		}
	}
}

function gameLoop() {
	updateDOM();
}

setInterval(gameLoop, 10);
restartGame();


// Drops a game piece
function dropGamePiece(board, col, playerPiece) {
	for(i=5;i>=0;i--) {
		if (board[i][col] == ".") {
			board[i][col] = playerPiece;
			break;
		}
	}
}

function canDrop(board, col) {
	return (board[0][col] == ".");
}

function dropPlayerPiece() {
	if (canDrop(grid, playerCol)) {
		dropGamePiece(grid, playerCol, "o");
	} else {
		$("#error").text("Negative, ghost rider, the pattern is full.");
		setTimeout('$("#error").text("")', 1000);
	}
	// Let the AI have a turn.
	AI();
}

function moveRight() {
	if (playerCol < 6) {
		playerCol++;
	}
}
Math.floor((Math.random()*10)+1);

function moveLeft() {
	if (playerCol > 0) {
		playerCol--;
	}
}

// Render the HTML based on the game state.
// Also colorizes the pieces.
function updateDOM() {
	// Iterate through the rows
	for (i=0;i<6;i++) {
		// Iterate through the columns
		for (j=0;j<7;j++) {
			$("#row" + (i+1) + "col" + (j+1)).text(grid[i][j]);
			if (grid[i][j] == "o") {
				$("#row" + (i+1) + "col" + (j+1)).css("color", "blue");
			}
			if (grid[i][j] == "x") {
				$("#row" + (i+1) + "col" + (j+1)).css("color", "red");
			}
		}
	}
	// Iterate through the arrow spots
	for (i=0;i<7;i++) {
		if (i == playerCol) {
			$("#arw" + (i+1)).text("v");
		} else {
			$("#arw" + (i+1)).text("-");
		}
	}
}

// Computer player function
function AI() {
	col = Math.floor(Math.random()*6);
	while (!canDrop(grid, col)) {
		col = Math.floor(Math.random()*6);
	}
	dropGamePiece(grid, col, "x");
}

function keyDown(keyCode) {
	switch (keyCode) {		
	// H key
	case 72:
		moveLeft();
		break;
						
	// L key
	case 76:
		moveRight();
		break;
	
	// Spacebar
	case 32:
		dropPlayerPiece()
		break;
		
	// R key
	case 82:
		restartGame()
		break;
	}
}


