import { batch, computed, writable } from "@amadeus-it-group/tansu";
import type { CellPos, Cell, Place } from './types.ts';
import { places, grid } from "./data";

const placesByPos: Record<string, Place> = {};
for (const place of Object.values(places)) {
	const {x, y} = place;
	placesByPos[`${x}_${y}`] = place;
}


const placesArray = Object.values(places);
export const beginGame$ = writable(false);

function getRandomPlace() {
	const {x, y} = placesArray[Math.floor(Math.random() * placesArray.length)];
	return {x, y};
}
export function position() {
	beginGame$.set(true);
	sherif$.set(getRandomPlace());
	bandit$.set(getRandomPlace());
}

export const sherif$ = writable<CellPos>({ x: 0, y: 0 });

export const bandit$ = writable<CellPos>({ x: 0, y: 0 });

export const sheriffMoves$ = computed(() => {


	const {x, y} = sherif$();
	const cell = grid[y][x];

	const moves = ['1', '2', '3', '4'];
	const result: {path: string, place: Place}[] = [];
	for(const moveNb of moves) {
		const newCell = cell[moveNb];
		result.push({path: moveNb, place: placesByPos[`${newCell.x}_${newCell.y}`]})

	}

	return result;
});

const diceMoves = [
	["2", "3", "4", "1"],
	["3", "4", "1", "2"],
	["4", "1", "2", "3"],
	["2", "4", "1", "3"],
	["2", "3", "4", "1"],
	["4", "1", "2", "3"],
];

export const dice$ = writable(0);

export const banditMoves$ = computed(() => {
	const dice = dice$();

	const {x, y} = bandit$();
	const cell = grid[y][x];

	const moves = diceMoves[dice];
	console.log("(DEBUG)   [state.store.ts:64]: moves: ", moves);
	const result: {path: string, place: Place}[] = [];
	for(const moveNb of moves) {
		const newCell = cell[moveNb];
		result.push({path: moveNb, place: placesByPos[`${newCell.x}_${newCell.y}`]})

	}

	return result;
});


function rollDice() {
	dice$.set(Math.floor(Math.random() * 6));
}

const allowedDirs: string[] = ['1', '2', '3', '4'];
export function handleGlobalKeyDown(event: KeyboardEvent) {
	const lastKey = event.key;
	if (allowedDirs.includes(lastKey)) {

		batch(() => {
			const sheriff = sherif$();
			const next = grid[sheriff.y][sheriff.x][lastKey];
			sherif$.set(next);
			
			const bandit = bandit$();
			const banditMoves = banditMoves$();
			const pathNb = banditMoves[+lastKey - 1].path;
			const nextBandit = grid[bandit.y][bandit.x][pathNb];
			bandit$.set(nextBandit);
	
			rollDice();
		});
	}
}

	

