import { writable } from "@amadeus-it-group/tansu";

interface Cell {
	x: number
	y: number
}

type Board = number[][];
type Trait = 1 | -1;
type Direction = [number, number];
type Move = [number, number];

// ------------------------------------------
// helpers
// ------------------------------------------

function createBoard({white, black}: {white: Cell[], black: Cell[]}) {
	const board: Board = [
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

export const directions: Direction[] = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
]

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

export function returnedPawns(board: Board, trait: Trait, initialCell: Move, direction: Direction) {
	const returnedCells: Move[] = [];
	const opponent = trait * -1;
	const [dy, dx] = direction;
	
	let x = initialCell[1] + dx;
	let y = initialCell[0] + dy;
	while (board[y]?.[x] === opponent) {
		returnedCells.push([y, x]);
		x += dx;
		y += dy;
	}

	return board[y]?.[x] === trait ? returnedCells : [];
	
}

export function canMove(board: Board, trait: Trait, move: Move): boolean {
	for (const direction of directions) {
		if (returnedPawns(board, trait, move, direction).length) {
			return true;
		}
	}
	return false;
}

export function playableCells() {

}

export function reversedPanws() {

}