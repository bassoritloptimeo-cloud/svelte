import { batch, writable } from "@amadeus-it-group/tansu";
import { mazeFactory } from './code.ts';
import type { Cell } from "./types.ts";

/**
 * Spécifie si le jeu a commencé
 */
export const started$ = writable(false);
export const height$ = writable(1);
export const width$ = writable(1);
export const floors$ = writable(1);



export const maze$ = writable(<Cell[][][] | undefined>undefined);
export const player$ = writable(<[number, number, number] | undefined>undefined);


export function createMaze() {

	// document.querySelector(".WIN_general").style.display = "none";
	// const height = TState.height;
	// const width = TState.width;
	// const length = TState.length;
	// console.error("TState", TState);
	// maze = createMaze(height, length, width);
	// document.querySelector(".highButton").innerHTML = '<button class="demarrage" onclick="solvelabyrinth()">Trouver la sortie</button>';
	// document.querySelector(".settings").style.display = "none";
	// afficherTable();

 
    const {player, t} = mazeFactory(floors$(), height$(), width$());
    batch(() => {
        maze$.set(t);
        player$.set(player);
        started$.set(true);
    });
    console.log("(DEBUG)   [state.store.ts:65]: maze$: ", maze$());
}

