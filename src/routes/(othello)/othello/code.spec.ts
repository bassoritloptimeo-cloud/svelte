import {describe, expect, test} from "vitest";
import {
	board$,
	canMove,
	directions,
	playableCells,
	playableCells$,
	playableCellsStr$,
	returnedPawns,
	type Board,
} from "./code.ts";

function initialBoard() {
	return [
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, -1, 0, 0, 0],
		[0, 0, 0, -1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
	];
}

function edgeBoard() {
	return [
		[1, 1, 0, 1, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0, 0, 0],
		[1, 0, 1, 1, -1, 0, 0, 0],
		[1, 0, 0, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
	];
}

function toAscii(board: Board) {
	const lines = [];
	for (const line of board) {
		lines.push(line.map((cell) => (cell === -1 ? 2 : cell)).join(""));
	}
	return lines.join("\n");
}

function fromAscii(strBoard: string) {
	const board: Board = [];
	const lines = strBoard
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length);
	for (const strLine of lines) {
		const line: number[] = [];
		board.push(line);
		for (const nb of strLine.trim()) {
			line.push(nb === "2" ? -1 : +nb);
		}
	}
	return board;
}

describe("Board @othello", () => {
	test("initial board", () => {
		expect(toAscii(board$())).toMatchInlineSnapshot(`
			"00000000
			00000000
			00000000
			00012000
			00021000
			00000000
			00000000
			00000000"
		`);
	});
});

describe("Can move @othello", () => {
	test("canMove", () => {
		const board = initialBoard();
		expect(canMove(board, -1, [3, 2]), "test a valid cell").toBe(true);
		expect(canMove(board, -1, [3, 5]), "test a non valid cell").toBe(false);
	});

	test("corners", () => {
		const board = fromAscii(`
			00000000
			02000020
			00200200
			00011000
			00011000
			00200200
			02000020
			00000000
		`);
		expect(canMove(board, 1, [7, 7])).toBe(true);
	});
});

describe("Returned pawns @othello", () => {
	test("returnedPawns", () => {
		const board = edgeBoard();

		expect(returnedPawns(board, -1, [2, 1], directions[0]), "direction 0").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[1]), "direction 1").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[2]), "direction 2").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[3]), "direction 3").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[4]), "direction 4").toStrictEqual([
			[2, 2],
			[2, 3],
		]);
		expect(returnedPawns(board, -1, [2, 1], directions[5]), "direction 5").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[6]), "direction 6").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[7]), "direction 7").toStrictEqual([]);

		expect(returnedPawns(board, -1, [0, 2], [-1, 0])).toStrictEqual([]);
	});
});

describe("All playable cells @othello", () => {
	test("playableCells", () => {
		const board = initialBoard();
		expect(playableCells(board, -1), "test a valid cell").toStrictEqual([
			[2, 3],
			[3, 2],
			[4, 5],
			[5, 4],
		]);
	});

	test("playableCells$", () => {
		expect(playableCells$()).toStrictEqual([
			[2, 3],
			[3, 2],
			[4, 5],
			[5, 4],
		]);
		expect(playableCellsStr$()).toBe("23,32,45,54");
	});

	test("corners", () => {
		const board = fromAscii(`
			00000000
			02000020
			00200200
			00011000
			00011000
			00200200
			02000020
			00000000
		`);
		expect(JSON.stringify(playableCells(board, 1)), "test a valid cell").toMatchInlineSnapshot(
			`"[[0,0],[0,7],[7,0],[7,7]]"`,
		);
	});
});
