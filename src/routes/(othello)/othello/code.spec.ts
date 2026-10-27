import { describe, expect, test } from "vitest";
import { board$, canMove, directions, playableCells, returnedPawns, reversedPanws } from "./code.ts";


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
	]
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
	]
}


describe("Board @othello", () => {
	test("initial board", () => {
		expect(board$()).toStrictEqual(initialBoard());
	});
});

describe("Can move @othello", () => {
	test("canMove", () => {
		const board = initialBoard();
	
		expect(canMove(board, -1, [3, 2]), "test a valid cell").toBe(true);
		expect(canMove(board, -1, [3, 5]), "test a non valid cell").toBe(false);
	});
});

describe("Returned pawns @othello", () => {
	test("returnedPawns", () => {
		const board = edgeBoard()

		expect(returnedPawns(board, -1, [2, 1], directions[0]), "direction 0").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[1]), "direction 1").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[2]), "direction 2").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[3]), "direction 3").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[4]), "direction 4").toStrictEqual([[2, 2], [2, 3]]);
		expect(returnedPawns(board, -1, [2, 1], directions[5]), "direction 5").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[6]), "direction 6").toStrictEqual([]);
		expect(returnedPawns(board, -1, [2, 1], directions[7]), "direction 7").toStrictEqual([]);
		
		
		
		
		
		expect(returnedPawns(board, -1, [0, 2], [-1, 0])).toStrictEqual([]);
	});
	
});

describe("All playable cells @othello", () => {
	test("playableCells", () => {
		const board = initialBoard();
	
		expect(playableCells(board, -1).length, "test a valid cell").toBe(4);
	});
});
