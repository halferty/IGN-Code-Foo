// Bonus: Connect 4
//

// Globals

// The game grid
// . = nothing, o = player piece, x = computer piece
var grid;
var playerCol = 4;
var game_over = false;


// Code starts here
setInterval(gameLoop, 10);
restartGame();




/*************************************
 * Game loop
 *************************************/
function gameLoop() {
	updateDOM();
}


/*************************************
 * Restarts the game to the original state
 *************************************/
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
			$("#row" + (i+1) + "col" + (j+1)).css("font-weight", "normal");
		}
	}
	
	$("#status").text("");
}


/*************************************
 * Handles dropping a game piece
 *************************************/
function dropGamePiece(board, col, playerPiece) {
	for(i=5;i>=0;i--) {
		if (board[i][col] == ".") {
			board[i][col] = playerPiece;
			break;
		}
	}
}


/*************************************
 * Checks to see if the column is full
 *************************************/
function canDrop(board, col) {
	return (board[0][col] == ".");
}


/*************************************
 * Drop a player piece
 *************************************/
function dropPlayerPiece() {
	if (canDrop(grid, playerCol)) {
		dropGamePiece(grid, playerCol, "o");
		checkForWinCondition();
		if (!game_over) {
			// Let the AI have a turn.
			AI();
			checkForWinCondition();
		}
	} else {
		$("#status").text("You can't drop a piece there!");
		setTimeout('$("#status").text("")', 1000);
	}
}


/*************************************
 * Player arrow movement functions
 *************************************/
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


/*************************************
 * Render the HTML based on the game state.
 * Also colorizes the pieces.
 *************************************/
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


/*************************************
 * AI
 *
 * Currently just makes random moves.
 *************************************/
function AI() {
	col = Math.floor(Math.random()*6);
	while (!canDrop(grid, col)) {
		col = Math.floor(Math.random()*6);
	}
	dropGamePiece(grid, col, "x");
}


/*************************************
 * Handle keypresses
 *************************************/
function keyDown(keyCode) {
	switch (keyCode) {		
	// H key
	case 72:
		if (!game_over) {
			moveLeft();
		}
		break;
						
	// L key
	case 76:
		if (!game_over) {
			moveRight();
		}
		break;
	
	// D key
	case 68:
		if (!game_over) {
			dropPlayerPiece();
		}
		break;
		
	// R key
	case 82:
		restartGame();
		game_over = false;
		break;
	}
}


/*************************************
 * Check for win condition
 *************************************/
function checkForWinCondition() {

	// Copy the game grid into a larger empty grid.
	// CPU cycles are so cheap these days.
	
	grd2 = [
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			[".",".",".",".",".",".",".",".",".",".",".",".","."],
			];
			
	start_offset = 3;
	
	// Iterate through the rows
	for (i=0;i<6;i++) {
		// Iterate through the columns
		for (j=0;j<7;j++) {
			grd2[i + start_offset][j + start_offset] = grid[i][j];
		}
	}
	
	// Check each grid position. If it contains a player piece, check in all 8
	// directions to see if there's a win.
	// Did I mention cpu cycles are cheap?
	
	win = false;
	winning_pieces = [];
	winning_piece = "";
	loop1:
	// Iterate through the rows
	for (i=3;i<9;i++) {
		// Iterate through the columns
		for (j=3;j<10;j++) {
			if (grd2[i][j] != ".") {
				base = grd2[i][j];
	
				if (	grd2[i+1][j] == base &&
						grd2[i+2][j] == base &&
						grd2[i+3][j] == base
				) {
					win = true;
					winning_piece = grd2[i][j];
					winning_pieces.push([i,j]);
					winning_pieces.push([i+1,j]);
					winning_pieces.push([i+2,j]);
					winning_pieces.push([i+3,j]);
					break loop1;
				}
				if (	grd2[i-1][j] == base &&
						grd2[i-2][j] == base &&
						grd2[i-3][j] == base
				) {
					win = true;
					winning_piece = grd2[i][j];
					winning_pieces.push([i,j]);
					winning_pieces.push([i-1,j]);
					winning_pieces.push([i-2,j]);
					winning_pieces.push([i-3,j]);
					break loop1;
				}
				if (	grd2[i][j+1] == base &&
						grd2[i][j+2] == base &&
						grd2[i][j+3] == base
				) {
					win = true;
					winning_piece = grd2[i][j];
					winning_pieces.push([i,j]);
					winning_pieces.push([i,j+1]);
					winning_pieces.push([i,j+2]);
					winning_pieces.push([i,j+3]);
					break loop1;
				}
				if (	grd2[i][j-1] == base &&
						grd2[i][j-2] == base &&
						grd2[i][j-3] == base
				) {
					win = true;
					winning_piece = grd2[i][j];
					winning_pieces.push([i,j]);
					winning_pieces.push([i,j-1]);
					winning_pieces.push([i,j-2]);
					winning_pieces.push([i,j-3]);
					break loop1;
				}
				if (	grd2[i+1][j+1] == base &&
						grd2[i+2][j+2] == base &&
						grd2[i+3][j+3] == base
				) {
					win = true;
					winning_piece = grd2[i][j];
					winning_pieces.push([i,j]);
					winning_pieces.push([i+1,j+1]);
					winning_pieces.push([i+1,j+2]);
					winning_pieces.push([i+1,j+3]);
					break loop1;
				}
				if (	grd2[i+1][j-1] == base &&
						grd2[i+2][j-2] == base &&
						grd2[i+3][j-3] == base
				) {
					win = true;
					winning_piece = grd2[i][j];
					winning_pieces.push([i,j]);
					winning_pieces.push([i+1,j-1]);
					winning_pieces.push([i+1,j-2]);
					winning_pieces.push([i+1,j-3]);
					break loop1;
				}
				if (	grd2[i-1][j+1] == base &&
						grd2[i-2][j+2] == base &&
						grd2[i-3][j+3] == base
				) {
					win = true;
					winning_piece = grd2[i][j];
					winning_pieces.push([i,j]);
					winning_pieces.push([i-1,j+1]);
					winning_pieces.push([i-1,j+2]);
					winning_pieces.push([i-1,j+3]);
					break loop1;
				}
				if (	grd2[i-1][j-1] == base &&
						grd2[i-2][j-2] == base &&
						grd2[i-3][j-3] == base
				) {
					win = true;
					winning_piece = grd2[i][j];
					winning_pieces.push([i,j]);
					winning_pieces.push([i-1,j-1]);
					winning_pieces.push([i-1,j-2]);
					winning_pieces.push([i-1,j-3]);
					break loop1;
				}
			}
		}
	}
	
	// If there's a win condition, end the game and set the winning pieces to bold.
	if (win) {
		game_over = true;
		if (winning_piece == "o") {
			$("#status").text("You won!");
		} else {
			$("#status").text("The computer won!");
		}
		for (k = 0; k < 4; k++) {
			$(	"#row" + (winning_pieces[k][0]-start_offset+1) +
				"col" + (winning_pieces[k][1]-start_offset+1)
				).css("font-weight", "bold");
		}
	}
}


