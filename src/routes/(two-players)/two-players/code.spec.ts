import { describe, test, expect } from 'vitest';
import { addPoint, board$, formatBoard, level$, levelColor$ } from './code.ts';

describe('addPoint', () => {
	test('increments an empty cell to 1 for the current trait', async () => {
		const board = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
		await addPoint([[0, 1]], board, 1, false);

		expect(formatBoard(board$())).toStrictEqual(formatBoard([
			[0, 0, 0],
			[1, 0, 0],
			[0, 0, 0],
		]));
	});

	test('uses the negative trait sign for the other player', async () => {
		const board = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
		await addPoint([[2, 0]], board, -1, false);

		expect(formatBoard(board$())).toStrictEqual(formatBoard([
			[0, 0, -1],
			[0, 0, 0],
			[0, 0, 0],
		]));
	});

	test('explodes a cell of 4 and spreads to its neighbors', async () => {
		const board = [
			[0, 0, 0],
			[0, 3, 0],
			[0, 0, 0],
		];
		await addPoint([[1, 1]], board, 1, false);

		expect(formatBoard(board$())).toStrictEqual(formatBoard([
			[0, 1, 0],
			[1, 0, 1],
			[0, 1, 0],
		]));
	});

	test('explosion at a corner only affects in-bounds neighbors', async () => {
		const board = [
			[3, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
		await addPoint([[0, 0]], board, 1, false);

		expect(formatBoard(board$())).toStrictEqual(formatBoard([
			[0, 1, 0],
			[1, 0, 0],
			[0, 0, 0],
		]));
	});

	test('skips out-of-bounds cells without crashing', async () => {
		const board = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
		await addPoint(
			[
				[1, 1],
				[-1, 0],
				[3, 3]
			],
			board,
			1,
			false
		);

		expect(formatBoard(board$())).toStrictEqual(formatBoard([
			[0, 0, 0],
			[0, 1, 0],
			[0, 0, 0],
		]));
	});


	test('multiple explosions at the same time', async () => {
		const board = [
			[0, 3, 0, 3],
			[0, 0, 3, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
		
		await addPoint(
			[
				[1, 0],
				[3, 0],
				[2, 1]
			],
			board,
			1,
			false
		);

		expect(formatBoard(board$())).toStrictEqual(formatBoard([
			[1, 0, 3, 0],
			[0, 2, 0, 2],
			[0, 0, 1, 0],
			[0, 0, 0, 0],
		]));
	});

	test('complex case with chained explosions', async () => {
		const board = [
			[0,  0,  0,  0, 0],
			[0, -3, -3, -3, 0],
			[0, -3,  2, -3, 0],
			[0, -3, -3, -3, 0],
			[0,  0,  0,  0, 0],
		];
		
		await addPoint(
			[
				[1, 2],
			],
			board,
			-1,
			false
		);

		expect(formatBoard(board$())).toStrictEqual(formatBoard([
			[ 0, -1, -1, -1, 0 ],
			[ -1, -1, -2, -1, -1 ],
			[ -1, -3, -1, 0, -1 ],
			[ -1, -1, -2, -1, -1 ],
			[ 0, -1, -1, -1, 0 ],
		]));
	});

});

test('levelColor$', () => {

	const minValue = 'rgb(0, 238, 255)';
	const maxValue = 'rgb(255, 0, 0)';

	level$.set(-1);
	expect(levelColor$(), 'manage level under min').toBe(minValue);

	level$.set(0);
	expect(levelColor$(), "returns the minimum color (cyan) at level 0").toBe(minValue);

	level$.set(5);
	expect(levelColor$(), 'interpolates at mid level').toBe('rgb(127, 119, 127)');

	level$.set(10);
	expect(levelColor$(), 'returns the maximum color (red) at level 10').toBe(maxValue);

	level$.set(11);
	expect(levelColor$(), 'manage level above max').toBe(maxValue);

});
