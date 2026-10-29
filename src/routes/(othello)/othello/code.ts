import { batch, computed, writable } from "@amadeus-it-group/tansu";

interface Cell {
	x: number
	y: number
}


export type Board = number[][];
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
];



// ------------------------------------------
// writable
// ------------------------------------------

export const board$ = writable(createBoard({
	white: [{x: 3, y: 3}, {x: 4, y: 4}],
	black: [{x: 3, y: 4}, {x: 4, y: 3}],
}));

export const trait$ = writable(-1);

// ------------------------------------------
// computed
// ------------------------------------------

export const state$ = computed(() => {
	const board = board$();
	const trait = trait$();
	let nbWhite = 0;
	let nbBlack = 0;
	for (const line of board) {
		for (const cell of line) {
			if (cell) {
				if (cell === 1) {
					nbWhite++;
				} else {
					nbBlack++;
				}
			}
		}
	}
	return {trait, nbWhite, nbBlack};
});

export const playableCells$ = computed(() => {
	const board = board$();
	const trait = trait$();
	return playableCells(board, trait);
});
	
export const playableCellsStr$ = computed(() => {
	const cellsStr = []
	for (const playableCell of playableCells$()) {
		cellsStr.push(playableCell.join(""));
	}
	return cellsStr.join(",");
});


// ------------------------------------------
// API
// ------------------------------------------

export function returnedPawns(board: Board, trait: number, initialCell: Move, direction: Direction) {
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

export function canMove(board: Board, trait: number, move: Move): boolean {
	if (!board[move[0]][move[1]]) {
		for (const direction of directions) {
			if (returnedPawns(board, trait, move, direction).length) {
				return true;
			}
		}
	}
	return false;
}

export function playableCells(board: Board, trait: number) {
	const returnedCells = [];
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			const cell: Move = [i, j];
			if (canMove(board, trait, cell)) {
				returnedCells.push(cell);
			}
		}
	}
	return returnedCells;
}

export function reversedPanws(board: Board, trait: number, initialCell: Move): Board {
	const reverseBoard: Board = structuredClone(board);
	for (const direction of directions) {
		const toReturn = returnedPawns(board, trait, initialCell, direction);
		for (const cell of toReturn) {
			reverseBoard[cell[0]][cell[1]] = trait;
		}
	}

	return reverseBoard;
}

export function playMove(board: Board, trait: number, move: Move) {
	const newBoard = structuredClone(board);
	newBoard[move[0]][move[1]] = trait;
	for (const direction of directions) {
		const toReturns = returnedPawns(newBoard, trait, move, direction);
		for (const toReturn of toReturns) {
			newBoard[toReturn[0]][toReturn[1]] = trait;
		}
	}
	console.log("trait", trait);
	return newBoard;
}

// ------------------------------------------
// Actions
// ------------------------------------------

export function onCellClick(y: number, x: number) {
	batch(() => {
		board$.set(playMove(board$(), trait$(), [y, x]));
		trait$.update((trait) => trait * -1);
	});
	if (!playableCells$().length) {
		trait$.update((trait) => trait * -1);
	}
	console.log("state", state$().trait, state$().nbWhite, state$().nbBlack);
}