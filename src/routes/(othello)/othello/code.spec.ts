import { describe, expect, test } from "vitest";
import { board$ } from "./code.ts";


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

describe("Board @othello", () => {
	test("initial board", async () => {
		expect(board$()).toStrictEqual(initialBoard());
	});
});
