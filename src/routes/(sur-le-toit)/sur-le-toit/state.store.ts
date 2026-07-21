import { batch, writable } from "@amadeus-it-group/tansu";
import { mazeFactory } from './code.ts';
import type { Cell, Direction } from "./types.ts";

/**
 * Spécifie si le jeu a commencé
 */
export const started$ = writable(false);
export const height$ = writable(1);
export const width$ = writable(1);
export const floors$ = writable(1);



export const maze$ = writable(<Cell[][][]>[]);
export const player$ = writable(<[number, number, number]>[-1, -1, -1]);
export const win$ = writable(false);


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

type EventDir = [Direction, number, number, number];
const eventDirs: Record<string, EventDir> = {
    "ArrowLeft": ["left", 0, 0, -1] as EventDir,
    "ArrowRight": ["right", 0, 0, 1] as EventDir,
    "ArrowUp": ["top", 0, -1, 0] as EventDir,
    "ArrowDown": ["bottom", 0, 1, 0] as EventDir,
    "PageUp": ["up", 1, 0, 0] as EventDir,
    "PageDown": ["down", -1, 0, 0] as EventDir,
};

export function newGame() {
	batch(() => {
		win$.set(false);
		started$.set(false);
	});
}

export function onkeydown(event: KeyboardEvent) {
	const move = eventDirs[event.code];
    if (move) {
        event.preventDefault();
        moveFunction(move);
    }
}

function moveFunction(move: EventDir) {
    const [dir, dz, dy, dx] = move;
    const [z, y, x] = player$();
    
    // Ici, grâce au @returns {Maze} de createMaze, 
    // l'éditeur sait que cell est de type Cell.
	const maze = maze$();
    const cell = maze[z][y][x];
	const nbFloors = maze.length - 1;
    if (cell[dir]) {
		if (z + dz > nbFloors) {
			win$.set(true);
			// displayWin();
		} else {
			player$.set([z + dz, y + dy, x + dx]);
		}
    }
}