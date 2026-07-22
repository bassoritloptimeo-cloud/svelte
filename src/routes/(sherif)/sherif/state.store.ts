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
				x: placesRandom.left,
				y: placesRandom.top
			});
		} else {
			bandit$.set({
				place: placesRandom.id,
				x: placesRandom.left,
				y: placesRandom.top
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


const allowedDirs = ['1', '2', '3', '4'];
export function handleGlobalKeyDown(event: KeyboardEvent) {
	const lastKey = event.key;
	if (allowedDirs.includes(lastKey)) {
		const sheriff = sheriff$();
		const lastPosition = sheriff.place;
		console.log("lastKey, lastPosition", lastKey, lastPosition);
		sheriff.place = moves[lastPosition][lastKey];
		sheriff.x = places[sheriff.place].left;
		sheriff.y = places[sheriff.place].top;
		sheriff$.set(sheriff);
	}

}

