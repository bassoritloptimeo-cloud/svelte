import { batch, writable } from "@amadeus-it-group/tansu";
import { places, moves } from "./data";
const placesArray = Object.values(places);

export function position() {
	const players = ["sheriff", "bandit"];
	for (const player of players) {
		const length = placesArray.length;
		const placesRandom = placesArray[Math.floor(Math.random() * length)];
		console.log("placesRandom", placesRandom);
		if (player === "sheriff") {
			sheriff$.set({
				place: placesRandom.id,
				x: placesRandom.x,
				y: placesRandom.y
			});
		} else {
			bandit$.set({
				place: placesRandom.id,
				x: placesRandom.x,
				y: placesRandom.y
			});
		}
	}
}

export const sheriff$ = writable({
	place: "",
	x: 0,
	y: 0,
});

export const bandit$ = writable({
	place: "",
	x: 0,
	y: 0,
});

/*
	Créer deux stores pour les données du shérif et du bandit 
	{
		place: (id_place)
	}
*/


const allowedDirs: Array<keyof typeof moves[keyof typeof moves]> = ['1', '2', '3', '4'];
export function handleGlobalKeyDown(event: KeyboardEvent) {
	const lastKey = event.key as keyof typeof moves[keyof typeof moves];
	if ((allowedDirs as string[]).includes(lastKey)) {
		const sheriff = sheriff$();
		const lastPosition = sheriff.place as keyof typeof moves;
		console.log("lastKey, lastPosition", lastKey, lastPosition);
		sheriff.place = moves[lastPosition][lastKey];
		const target = places[sheriff.place as keyof typeof places];
		sheriff.x = target.x;
		sheriff.y = target.y;
		sheriff$.set(sheriff);
	}

}

