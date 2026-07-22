import { writable } from "@amadeus-it-group/tansu";
import type { CellPos, Cell } from './types.ts';
import { places, grid } from "./data";

const placesArray = Object.values(places);

function getRandomPlace() {
	const {x, y} = placesArray[Math.floor(Math.random() * placesArray.length)];
	return {x, y};
}
export function position() {
	sheriff$.set(getRandomPlace());
	bandit$.set(getRandomPlace());
}

export const sheriff$ = writable<CellPos>({ x: 0, y: 0 });

export const bandit$ = writable<CellPos>({ x: 0, y: 0 });

const allowedDirs: Array<keyof Cell> = ['1', '2', '3', '4'];
export function handleGlobalKeyDown(event: KeyboardEvent) {
	const lastKey = event.key;
	if ((allowedDirs as string[]).includes(lastKey)) {
		const sheriff = sheriff$();
		const next = grid[sheriff.y][sheriff.x][lastKey as keyof Cell];
		sheriff$.set(next);
	}

}
