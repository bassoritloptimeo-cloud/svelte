import { batch, computed, writable } from '@amadeus-it-group/tansu';
import type { CellPos, Place, SherifInventory, BanditInventory } from './types.ts';
import { places, grid } from './data';
import { events } from './events.ts';

const placesByPos: Record<string, Place> = {};
for (const place of Object.values(places)) {
	const { x, y } = place;
	placesByPos[`${x}_${y}`] = place;
}

const placesArray = Object.values(places);
export const beginGame$ = writable(false);

function getRandomPlace() {
	const { x, y } = placesArray[Math.floor(Math.random() * placesArray.length)];
	return { x, y };
}
export function position() {
	beginGame$.set(true);
	sherif$.set(getRandomPlace());
	bandit$.set(getRandomPlace());
}

export const sherif$ = writable<CellPos>({ x: 0, y: 0 });

export const bandit$ = writable<CellPos>({ x: 0, y: 0 });

// export const sheriffMoves$ = computed(() => {

// 	const {x, y} = sherif$();
// 	const cell = grid[y][x];

// 	const moves = ['1', '2', '3', '4'];
// 	const result: {path: string, place: Place}[] = [];
// 	for(const moveNb of moves) {
// 		const newCell = cell[moveNb];
// 		result.push({path: moveNb, place: placesByPos[`${newCell.x}_${newCell.y}`]})

// 	}

// 	return result;
// });

const diceMoves = [
	['2', '3', '4', '1'],
	['3', '4', '1', '2'],
	['4', '1', '2', '3'],
	['2', '4', '1', '3'],
	['2', '3', '4', '1'],
	['4', '1', '2', '3']
];

export const sheriffMoves$ = computed(() => {
	const { x, y } = sherif$();
	const cellS = grid[y][x];
	const { x: xB, y: yB } = bandit$();
	const cellB = grid[yB][xB];

	const moves = ['1', '2', '3', '4'];
	const result: { path: string; placeS: Place; placeB: Place }[] = [];
	const dice = dice$();
	for (const moveNb of moves) {
		const newCellSherif = cellS[moveNb];
		const newCellBandit = cellB[diceMoves[dice][+moveNb - 1]];
		result.push({
			path: moveNb,
			placeS: placesByPos[`${newCellSherif.x}_${newCellSherif.y}`],
			placeB: placesByPos[`${newCellBandit.x}_${newCellBandit.y}`]
		});
	}

	return result;
});

export const dice$ = writable(0);

export const banditMoves$ = computed(() => {
	const dice = dice$();

	const { x, y } = bandit$();
	const cell = grid[y][x];

	const moves = diceMoves[dice];
	console.log('(DEBUG)   [state.store.ts:64]: moves: ', moves);
	const result: { path: string; place: Place }[] = [];
	for (const moveNb of moves) {
		const newCell = cell[moveNb];
		result.push({ path: moveNb, place: placesByPos[`${newCell.x}_${newCell.y}`] });
	}

	return result;
});

export const sherifInventory$ = writable<SherifInventory>({
	star: 10,
	procuration: 10,
	deliveryNote: 10,
	axe: 10,
	notebook: 10,
	telegram: 10,
	poster: 10,
	hammer: 10,
	file: 10,
	handcuffs: 10,
	trunkKey: 10,
	goldSack: 10,
	money: 10,
	revolver: 10,
	barber: 10,
	shaved: 10,
	starKnown: 10,
	convoyeur: 10,
	sonFriendKnown: 10,
	sonUnderBridgeKnown: 10,
	goldDeposited: 10
});

export const banditInventory$ = writable<BanditInventory>({
	razor: 10,
	pencil: 10,
	canvasBag: 10,
	woodenBox: 10,
	knife: 10,
	crowbar: 10,
	oldRifle: 10,
	canteen: 10,
	pastorRobe: 10,
	key: 10,
	suitcase: 10,
	goldSack: 10,
	matches: 10,
	money: 10,
	dynamite: 10,
	combination: 10
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


			clearText();
			runNote(placesByPos[`${next.x}_${next.y}`].numeroNoir + "");
			runNote(placesByPos[`${nextBandit.x}_${nextBandit.y}`].numeroRouge + "");
			console.log("text$", text$());
			rollDice();
		});
	}
}

export const text$ = writable<string[]>([]);

export const clearText = () => text$.set([]);

export function readText(text: string) {
	text$.update((textList) => {
		textList.push(text);
		return textList;
	});
}

function runNote(noteNb: string) {
	const actionFn = events[`note${noteNb}`];

	actionFn(readText, sherifInventory$, banditInventory$, runNote);
	
}
