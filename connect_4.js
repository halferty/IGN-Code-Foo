// Bonus: Connect 4
//




// The game grid
// . = nothing, o = player piece, x = computer piece
var grid = [
			[".",".",".",".",".",".","."],
			[".",".",".",".",".",".","."],
			[".",".",".",".",".",".","."],
			[".",".",".",".",".",".","."],
			[".",".",".",".",".",".","."],
			[".",".",".",".",".",".","."],
			];
			
var playerCol = 4;


function gameLoop() {
	// Show the updates
	updateDOM();
}			

setInterval(gameLoop, 1);


// Drops a game piece

function dropGamePiece(col, playerPiece) {
	
	for(i=5;i>=0;i--) {
		if (grid[i][col] == ".") {
			grid[i][col] = playerPiece;
			break;
		}
	}
}

function dropPlayerPiece() {
	dropGamePiece(playerCol, "o");
}

function moveRight() {
	if (playerCol < 6) {
		playerCol++;
	}
}

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
	// If the player has 2 in a row anywhere try to block.
	
	// If the player has 2 in a row anywhere 
}
