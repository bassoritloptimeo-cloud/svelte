import { computed, writable } from "@amadeus-it-group/tansu";
import type { Cell, Trait } from "./types";

export const gameStarted$ = writable(false);
export const player1$ = writable('');
export const player2$ = writable('');
export const level$ = writable(5);

export const petSelect$ = writable("5");
export const board$ = writable([]);
export const trait$ = writable(<Trait>undefined);
export const traitInit$ = writable(<Trait>undefined);
export const dernierCoup$ = writable(<Cell>{x: -1, y: -1});
export const casesControle$ = writable({joueur1: 1, joueur2: 1});
export const evaluationValid$ = writable(false);
export const evaluation$ = writable(<undefined | number>undefined);
export const evalEnnemmiValid$ = writable(<undefined | number>undefined);
export const coupValid$ = writable(false);
export const editeurValide$ = writable(false);
export const dernierCoupValid$ = writable(false);
export const couleurSelect$ = writable(0);
export const boardEdition$ = writable(undefined);
export const editeurTrait$ = writable(0);
export const negInfo$ = writable(false);
export const nbClone$ = writable(0);

export const traitInitText$ = computed(() => {
	const traitInit = traitInit$();
	if (traitInit === -1) {
		return "Rouge";
	} else if (traitInit === 1) {
		return "Vert";
	} else {
		return "Aléatoire";
	}
});

const minColor = [0, 238, 255];
const maxColor = [255, 0, 0];
export const levelColor$ = computed(() => {
	const level = level$();
	const color = [];
	for (let i = 0; i < 3; i++) {
		if (minColor < maxColor) {
			color.push(Math.floor(minColor[i] + (maxColor[i] - minColor[i]) * level / 10));
		} else {
			color.push(Math.floor(minColor[i] - (maxColor[i] - minColor[i]) * level / 10));
		}
	}
	return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
});


export function vsAmi() {
	
}

export function vsOrdi() {

}

export function recommencerJeu() {

}

export function validEdition() {

}

export function ajout(color?: number) {

}

export function traitEdition() {

}

export function paramJeu(pageParametre: boolean) {

}

export function moveCurseur(color?: number) {
	
}

export function openMenu() {

}

export function commencerOrdi() {

}
export function validModif(isValid: boolean) {

}

