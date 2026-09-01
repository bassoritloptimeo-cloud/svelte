import { batch, computed, writable } from '@amadeus-it-group/tansu';
import type { Cell, Trait } from './types';
import { randomNumber, distance, wait } from '$lib/game/utils';
import { donnerEvalFns, preCalculs } from './game.ts';
import type { Coordonnees, Direction, Noeud } from './game.ts';

const waitMove = 500;

// Debug purposes
export function formatBoard(board: number[][]): string {
	return board
		.map((row) => row.map((cell) => String(cell).padStart(2, ' ')).join(' '))
		.join('\n') + '\n';
}

export const gameStarted$ = writable(false);
export const player1$ = writable('');
export const player2$ = writable('');
export const level$ = writable(5);

export const gridSize$ = writable('5');
export const board$ = writable(<number[][]>[]);
export const trait$ = writable(<Trait>1);
export const traitInit$ = writable(<Trait | undefined>undefined);
export const dernierCoup$ = writable(<Cell>{ x: -1, y: -1 });
export const evaluationValid$ = writable(false);
export const evaluation$ = writable(<undefined | number>undefined);
export const evalEnnemmiValid$ = writable(<undefined | number>undefined);
export const coupValid$ = writable(false);
export const editing$ = writable(false);
export const dernierCoupValid$ = writable(false);
export const couleurSelect$ = writable(0);
export const editeurTrait$ = writable(0);
export const negInfo$ = writable(false);
export const nbClone$ = writable(0);

export const player1Name$ = computed(() => player1$() || 'Joueur1');
export const player2Name$ = computed(() => player2$() || 'Joueur2');

export const traitInitText$ = computed(() => {
	const traitInit = traitInit$();
	if (traitInit === -1) {
		return 'Rouge';
	} else if (traitInit === 1) {
		return 'Vert';
	} else {
		return 'Aléatoire';
	}
});

const minColor = [0, 238, 255];
const maxColor = [255, 0, 0];
export const levelColor$ = computed(() => {
	const level = level$();
	const color = [];
	for (let i = 0; i < 3; i++) {
		color.push(Math.floor(minColor[i] + ((maxColor[i] - minColor[i]) * level) / 10));
	}
	return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
});

const distanceMin = 2 * Math.sqrt(2);
export function startGame() {
	trait$.set(traitInit$() ?? (Math.random() < 0.5 ? -1 : 1));
	firstTrait = trait$();
	const board: number[][] = [];
	const gridSize = +gridSize$();
	tabEval = preCalculs(gridSize);
	for (let i = 0; i < gridSize; i++) {
		const line: number[] = [];
		board.push(line);
		for (let j = 0; j < gridSize; j++) {
			line.push(0);
		}
	}

	if (!editing$()) {
		const gridSizeMinusOne = gridSize - 1;
		const cell1: [number, number] = [
			randomNumber(0, gridSizeMinusOne),
			randomNumber(0, gridSizeMinusOne)
		];
		// const cell1 = [2, 2];
		let cell2: [number, number] = [...cell1];
		while (distance(cell1, cell2) < distanceMin) {
			cell2 = [randomNumber(0, gridSizeMinusOne), randomNumber(0, gridSizeMinusOne)];
		}
		const factor = randomNumber(0, 1) ? 1 : -1;
		board[cell1[0]][cell1[1]] = 3 * factor;
		board[cell2[0]][cell2[1]] = -3 * factor;
	}
	beginningBoard = structuredClone(board);
	console.log('beginningBoard', beginningBoard);
	batch(() => {
		board$.set(board);
		gameStarted$.set(true);
	});
}
export function restartGame() {
	startGame();
}

export const backgroundColor$ = computed(() => gameStarted$() ? (trait$() === 1 ? 'player1' : 'player2') : "");

export async function clickCell(cell: { x: number; y: number }) {
	const { x, y } = cell;
	if (editing$()) {
		addPointEdition([x, y], board$());
		return;
	}
	if (robotPlaying) {
		return;
	}
	const trait = trait$();
	const board = board$();
	if (Math.sign(board[y][x]) === trait) {
		await playMove(cell)
		if (trait$() === robotTrait) {
			void computerMove();
		}
	}
}

async function playMove({ x, y }: { x: number; y: number }) {
	if (cursor === pointPlays.length) {
		pointPlays.push([y, x]);
		cursor = pointPlays.length;
	}
	const trait = trait$();
	await addPoint([[x, y]], board$(), trait, true);
	trait$.set(trait === 1 ? -1 : 1);
}

const directions = [
	[-1, 0],
	[0, -1],
	[0, 1],
	[1, 0]
] as const;

export async function addPoint(
	cells: number[][],
	board: number[][],
	trait: number,
	isAsync: boolean
) {
	// debugger;
	const cellsWith4 = new Set<string>();
	const cellsToAddPoints: number[][] = [];
	for (const [x, y] of cells) {
		const cellValue = board[y]?.[x];
		if (cellValue !== undefined) {
			const cell = (Math.min(Math.abs(cellValue) + 1, 4)) * trait;
			board[y][x] = cell;
			const key = `${x}_${y}`;
			if (Math.abs(cell) > 3 && !cellsWith4.has(key)) {
				cellsWith4.add(key);
				for (const [YA, XA] of directions) {
					cellsToAddPoints.push([x + XA, y + YA]);
				}
			}
		}
	}
	if (cellsToAddPoints.length) {
		if (isAsync) {
			board$.set(board);
			await wait(waitMove);
		}
		for (const xy of cellsWith4) {
			const [x, y] = xy.split('_');
			board[+y][+x] = 0;
		}
		if (isAsync) {
			await addPoint(cellsToAddPoints, board, trait, true);
		} else {
			addPoint(cellsToAddPoints, board, trait, false);
		}
	}
	board$.set(board);
}

export function addPointEdition(contact: number[], board: number[][]) {
	// debugger;
	const [x, y] = contact;
	const cellValue = board[y][x];
	let cell;
	if (Math.sign(cellValue) === addEditor) {
		cell = (Math.abs(cellValue) + 1) * addEditor;
	} else {
		cell = 1 * addEditor;
	}
	board[y][x] = cell;
	if (Math.abs(cell) > 3) {
		board[y][x] = 0;
	}
	board$.set(board);
}

export async function ajout(add: number) {
	addEditor = add;
}

export function validEdition() {
	editing$.set(false);
}
export function vsOrdi() {}

export function traitEdition() {
	trait$.set(trait$() === 1 ? -1 : 1);
}
/*
export function paramJeu(pageParametre: boolean) {

}

export function movecursor(color?: number) {
	
}
*/
export function openMenu() {}

export function commencerOrdi() {
	robotTrait = -1;
	profondeur = Math.max(1, Math.ceil(level$() / 3));
	if (!player2$()) {
		player2$.set('Ordinateur');
	}
	startGame();
	if (trait$() === robotTrait) {
		void computerMove();
	}
}

interface Tache {
	coup: Coordonnees;
	noeudEnfant: Noeud;
	tabEval: number[][];
	directions: readonly Direction[];
	profondeur: number;
	alpha: number;
	beta: number;
	prochainJoueurMax: boolean;
}

interface ResultatTache {
	coup: Coordonnees;
	evaluation: number;
	n: number;
}

async function computerMove() {
	if (!tabEval.length || robotPlaying) {
		return;
	}
	robotPlaying = true;
	const trait = trait$();
	const noeud: Noeud = { board: structuredClone(board$()), trait };
	const { donnerEnfants, jouer } = donnerEvalFns(tabEval, directions);
	const coups = donnerEnfants(noeud);
	if (coups.length === 0) {
		robotPlaying = false;
		return;
	}

	const mustMaximize = trait === 1;
	const listeTaches: Tache[] = coups.map((coup) => ({
		coup,
		noeudEnfant: jouer(noeud, coup),
		tabEval,
		directions,
		profondeur: profondeur - 1,
		alpha: -Infinity,
		beta: Infinity,
		prochainJoueurMax: !mustMaximize
	}));

	const { poolWorkers, destroy } = createPoolWorker();
	const resultats = await gererCalculParallele(poolWorkers, listeTaches);
	destroy();

	let meilleurCoup: Coordonnees | undefined;
	let meilleureEvaluation = mustMaximize ? -Infinity : Infinity;
	for (const res of resultats) {
		const { coup, evaluation } = res;
		if (
			(!mustMaximize && evaluation < meilleureEvaluation) ||
			(mustMaximize && evaluation > meilleureEvaluation)
		) {
			meilleureEvaluation = evaluation;
			meilleurCoup = coup;
		}
	}
	robotPlaying = false;

	if (meilleurCoup) {
		const [y, x] = meilleurCoup;
		await wait(waitMove);
		await playMove({x, y});
	}
}

function createPoolWorker() {
	const maxWorkers = Math.max(1, navigator.hardwareConcurrency - 1);
	const poolWorkers: Worker[] = [];
	for (let i = 0; i < maxWorkers; i++) {
		poolWorkers.push(new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }));
	}
	return {
		poolWorkers,
		destroy() {
			poolWorkers.forEach((worker) => worker.terminate());
		}
	};
}

function gererCalculParallele(workers: Worker[], taches: Tache[]): Promise<ResultatTache[]> {
	return new Promise((resolve) => {
		const resultatsFinaux: ResultatTache[] = [];
		let indexTache = 0;
		let tachesTerminees = 0;

		if (taches.length === 0) {
			resolve([]);
			return;
		}

		function lancerTacheSurWorker(worker: Worker) {
			if (indexTache >= taches.length) {
				return;
			}

			const idActuel = indexTache++;
			const tacheActuelle = taches[idActuel];

			worker.onmessage = (evenement) => {
				const { type, evaluation, n } = evenement.data;
				nbClone$.update((value) => value + n);
				if (type === 'RESULTAT') {
					resultatsFinaux.push({ coup: tacheActuelle.coup, evaluation, n });
					tachesTerminees++;

					if (tachesTerminees === taches.length) {
						resolve(resultatsFinaux);
					} else {
						lancerTacheSurWorker(worker);
					}
				}
			};

			worker.postMessage({ type: 'CALCULER', donnees: tacheActuelle });
		}

		workers.forEach((worker) => lancerTacheSurWorker(worker));
	});
}

export function validModif(isValid: boolean) {}

let addEditor: number = 0;
let firstTrait: number = 1;
let beginningBoard: number[][];
let cursor: number = 0;
let tabEval: number[][] = [];
let robotTrait: Trait | undefined = undefined;
let profondeur = 1;
let robotPlaying = false;
const pointPlays: number[][] = [];

export function moveCursor(avance: number) {
	// debugger;
	cursor += avance;
	if (cursor < 0) {
		cursor = 0;
	} else if (cursor > pointPlays.length) {
		cursor = pointPlays.length;
	} else {
		board$.set(structuredClone(beginningBoard));
		console.log('board', board$(), beginningBoard);
		let trait = firstTrait;
		batch(() => {
			for (let i = 0; i < cursor; i++) {
				const [y, x] = pointPlays[i];
				addPoint([[x, y]], board$(), trait, false);
				trait = trait === 1 ? -1 : 1;
			}
		});
		trait$.set(firstTrait === 1 ? (cursor % 2 === 0 ? 1 : -1) : cursor % 2 === 0 ? -1 : 1);
	}
	console.log('cursor', cursor, avance);
}
