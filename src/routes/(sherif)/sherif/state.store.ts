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
	star: 0,
	procuration: 0,
	deliveryNote: 0,
	axe: 0,
	notebook: 0,
	telegram: 0,
	poster: 0,
	hammer: 0,
	file: 0,
	handcuffs: 0,
	trunkKey: 0,
	goldSack: 0,
	money: 0,
	revolver: 0,
	barber: 0,
	shaved: 0,
	starKnown: 0,
	convoyeur: 0,
	sonFriendKnown: 0,
	sonUnderBridgeKnown: 0,
	goldDeposited: 0
});

export const banditInventory$ = writable<BanditInventory>({
	razor: 0,
	pencil: 0,
	canvasBag: 0,
	woodenBox: 0,
	knife: 0,
	crowbar: 0,
	oldRifle: 0,
	canteen: 0,
	pastorRobe: 0,
	key: 0,
	suitcase: 0,
	goldSack: 0,
	matches: 0,
	money: 0,
	dynamite: 0,
	combination: 0
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
			console.log("Text sherif", placesByPos[`${next.x}_${next.y}`].numeroNoir + "");
			console.log("Text bandit", placesByPos[`${nextBandit.x}_${nextBandit.y}`].numeroRouge + "");
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

function addInventory(Avatar: string, object: string, quantity = 1) {
	if (Avatar === "sherif") {
		sherifInventory$.update((inventory) => ({
			...inventory,
			[object]: inventory[object as keyof SherifInventory] + quantity
		}));
	} else {
		banditInventory$.update((inventory) => ({
			...inventory,
			[object]: inventory[object as keyof BanditInventory] + quantity
		}));
	}
}

function runNote(noteNb: string) {
	const actionFn = events[`note${noteNb}`];

	actionFn(readText, sherifInventory$, banditInventory$, runNote, addInventory);
	
}
