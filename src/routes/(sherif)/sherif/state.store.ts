import { computed, writable } from "@amadeus-it-group/tansu";
import type { CellPos, Cell, Place } from './types.ts';
import { places, grid } from "./data";

const placesByPos: Record<string, Place> = {};
for (const place of Object.values(places)) {
	const {x, y} = place;
	placesByPos[`${x}_${y}`] = place;
}


const placesArray = Object.values(places);
export let beginGame$ = writable(false);

function getRandomPlace() {
	const {x, y} = placesArray[Math.floor(Math.random() * placesArray.length)];
	return {x, y};
}
export function position() {
	beginGame$.set(true);
	sheriff$.set(getRandomPlace());
	bandit$.set(getRandomPlace());
}

export const sheriff$ = writable<CellPos>({ x: 0, y: 0 });

export const bandit$ = writable<CellPos>({ x: 0, y: 0 });

export const sheriffMoves$ = computed(() => {


	const {x, y} = sheriff$();
	const cell = grid[y][x];

	const moves = ['1', '2', '3', '4'];
	const result: Record<string, Place> = {};
	for(const moveNb of moves) {
		const newCell = cell[moveNb as keyof Cell];
		result[moveNb] = placesByPos[`${newCell.x}_${newCell.y}`];

	}

	return result;
});

const banditMoves = {
	1: {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
	},
	2: {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
	},
	3: {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
	},
	4: {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
	}
}
for (let n = 1; n <= 4; n++) {
	const array = ["1", "2", "3", "4"];
	for (let i = 3; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	for (let i = 1; i <= 4; i++) {
		banditMoves[n][i] = array[i - 1];
	}
}
console.log("banditMoves", banditMoves);

let diceValue = Math.floor(Math.random() * 4) + 1;
export const banditMovesActu$ = writable(banditMoves[diceValue]);

const allowedDirs: Array<keyof Cell> = ['1', '2', '3', '4'];
export function handleGlobalKeyDown(event: KeyboardEvent) {
	const lastKey = event.key;
	if ((allowedDirs as string[]).includes(lastKey)) {
		const sheriff = sheriff$();
		const next = grid[sheriff.y][sheriff.x][lastKey as keyof Cell];
		sheriff$.set(next);

		const bandit = bandit$();
		const banditDir = banditMoves[diceValue][lastKey as keyof Cell];
		const nextBandit = grid[bandit.y][bandit.x][banditDir as keyof Cell];
		bandit$.set(nextBandit);
		
		diceValue = Math.floor(Math.random() * 4) + 1;
		banditMovesActu$.set(banditMoves[diceValue]);
	}
}

	

