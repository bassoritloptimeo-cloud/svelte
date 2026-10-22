import { writable } from "@amadeus-it-group/tansu";

interface Cell {
	x: number
	y: number
}

// ------------------------------------------
// helpers
// ------------------------------------------

function createBoard({white, black}: {white: Cell[], black: Cell[]}) {
	const board = [
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
	];

	for (const {x, y} of white) {
		board[y][x] = 1;
	}
	for (const {x, y} of black) {
		board[y][x] = -1;
	}
	
	return board;
}

// ------------------------------------------
// writable
// ------------------------------------------

export const board$ = writable(createBoard({
	white: [{x: 3, y: 3}, {x: 4, y: 4}],
	black: [{x: 3, y: 4}, {x: 4, y: 3}],
}));

// ------------------------------------------
// computed
// ------------------------------------------


// ------------------------------------------
// API
// ------------------------------------------

export function canMove() {

}

export function playableCells() {

}

export function reversedPanws() {

}