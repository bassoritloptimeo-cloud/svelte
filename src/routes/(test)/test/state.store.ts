import { batch, writable } from "@amadeus-it-group/tansu";

export const number$ = writable(0);
export function add () {
	number$.set(number$() + 1);
}

