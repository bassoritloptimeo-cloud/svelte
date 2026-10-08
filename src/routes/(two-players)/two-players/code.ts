import {batch, computed, writable} from "@amadeus-it-group/tansu";
import type {Cell, Trait} from "./types";
import {randomNumber, distance, wait, clamp} from "$lib/game/utils";
import {donnerEvalFns, preCalculs} from "./game.ts";
import type {Coordonnees, Direction, Noeud} from "./game.ts";

const waitMove = 500;

// Debug purposes
export function formatBoard(board: number[][]): string {
	return (
		board.map((row) => row.map((cell) => String(cell).padStart(2, " ")).join(" ")).join("\n") + "\n"
	);
}

export const gameStarted$ = writable(false);
export const player1$ = writable("");
export const player2$ = writable("");
export const level$ = writable(5);
export const settings$ = writable(false);
export const gridSize$ = writable("5");
export const board$ = writable(<number[][]>[]);
const initialBoard$ = writable(<number[][]>[]);

export const traitInit$ = writable(<Trait | undefined>undefined);
export const trait$ = writable(<Trait>1);
const moves$ = writable(<number[][]>[]);
export const lastPlay$ = writable(<Cell>{x: -1, y: -1});
export const evaluationValid$ = writable(false);
export const evaluation$ = writable(<undefined | number>undefined);
export const evalEnnemmiValid$ = writable(<undefined | number>undefined);
export const showBestPlay$ = writable(false);
export const editing$ = writable(false);
export const lastValidMove$ = writable(false);
export const couleurSelect$ = writable(0);
export const editeurTrait$ = writable(0);
export const negInfo$ = writable(false);
export const nbClone$ = writable(0);
export const humanErrors$ = writable(0);

export const player1Name$ = computed(() => player1$() || "Joueur1");
export const player2Name$ = computed(() => player2$() || "Joueur2");

export const maxWorkers = typeof navigator !== "undefined" ? navigator.hardwareConcurrency : 1;
export const workersNumber$ = writable(maxWorkers / 2);

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
	const level = clamp(0, level$(), 10);
	const color = [];
	for (let i = 0; i < 3; i++) {
		color.push(Math.floor(minColor[i] + ((maxColor[i] - minColor[i]) * level) / 10));
	}
	return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
});

const initialBoardString$ = computed(() => {
	let str = "";
	const initialBoard = initialBoard$();
	for (const line of initialBoard) {
		for (const cell of line) {
			str += cell;
		}
	}
	return str;
});

const movesString$ = computed(() => {
	const moves = moves$();
	let str = "";
	for (const line of moves) {
		for (const cell of line) {
			str += cell;
		}
	}
	return str;
});

export const paramString$ = computed(() => {
	if (gameStarted$()) {
		const paramString = `trait=${traitInit$()}&initialBoard=${initialBoardString$()}&moves=${movesString$()}`;
		return paramString;
	} else {
		return "";
	}
});



export function updateUrl(paramString: string) {
	window.location.hash = paramString;
}

export const humanColor$ = computed(() => {
	const level = 10 - clamp(0, humanErrors$(), 10);
	const color = [];
	for (let i = 0; i < 3; i++) {
		color.push(Math.floor(minColor[i] + ((maxColor[i] - minColor[i]) * level) / 10));
	}
	return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
});

export function initState() {
	const urlParams = window.location.hash;
	const params = new URLSearchParams(urlParams.substring(1));
	if (params.size) {
		const trait = params.get("trait");
		traitInit$.set(trait === "1" ? 1 : -1);
		const initialBoard = ajustSign(params.get("initialBoard")!.split(""));
		const tBoard = Math.sqrt(initialBoard.length);
		const board = [];
		for (let i = 0; i < tBoard; i++) {
			const line: number[] = [];
			for (let j = 0; j < tBoard; j++) {
				line.push(initialBoard[i * tBoard + j]);
			}
			board.push(line);
		}
		console.warn("board", board);
		
		// const moves = params.get("moves")?.split("");
	}
}

function ajustSign(array: string[]) {
	const array2 = [];
	let negation = false;
	for (const element of array) {
		if (negation) {
			negation = false;
			array2.push(+element * -1);
		} else if (element !== "-") {
			array2.push(+element);
		} else {
			negation = true;
		}
	}
	return array2;
}

export const computerEnemy$ = writable(false);
	if (initialBoardString$()) {
		return true;
	}
	return false;
});
const distanceMin = 2 * Math.sqrt(2);
export function startGame() {
	batch(() => {
		computerEnemy$.set(false);
		const trait = traitInit$() ?? (Math.random() < 0.5 ? -1 : 1);
		trait$.set(trait);
		traitInit$.set(trait);
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
				randomNumber(0, gridSizeMinusOne),
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
		initialBoard$.set(structuredClone(board));
		board$.set(board);
		gameStarted$.set(true);
		moves$.set([]);
	});
}
export function restartGame() {
	startGame();
}

export const backgroundColor$ = computed(() =>
	gameStarted$() ? (trait$() === 1 ? "player1" : "player2") : "",
);

export async function clickCell(cell: {x: number; y: number}) {
	const {x, y} = cell;
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
		bestPlay$.set({x: -1, y: -1});
		await playMove(cell);
		if (trait$() === robotTrait) {
			void computerMove();
		}
	}
}

async function playMove({x, y}: {x: number; y: number}) {
	if (cursor === moves$.length) {
		moves$.update((moves) => {
			moves.push([y, x]);
			return moves;
		})
		cursor = moves$.length;
	}
	if (lastValidMove$()) {
		lastPlay$.set({x, y});
	}
	const trait = trait$();
	await addPoint([[x, y]], board$(), trait, true);
	trait$.set(trait === 1 ? -1 : 1);
}

const directions = [
	[-1, 0],
	[0, -1],
	[0, 1],
	[1, 0],
] as const;

export async function addPoint(
	cells: number[][],
	board: number[][],
	trait: number,
	isAsync: boolean,
) {
	// debugger;
	const cellsWith4 = new Set<string>();
	const cellsToAddPoints: number[][] = [];
	for (const [x, y] of cells) {
		const cellValue = board[y]?.[x];
		if (cellValue !== undefined) {
			const cell = Math.min(Math.abs(cellValue) + 1, 4) * trait;
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
			const [x, y] = xy.split("_");
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
	if (trait$() === robotTrait) {
		void computerMove();
	}
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

export function findBestPlay() {
	void computerMove();
}

export function commencerOrdi() {
	profondeur = Math.max(1, level$());
	if (player1$() || !player2$()) {
		robotTrait = -1;
		player2$.set("Ordinateur");
	} else {
		robotTrait = 1;
		player1$.set("Ordinateur");
	}
	startGame();
	computerEnemy$.set(true);
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

let timeStart: number;
async function computerMove() {
	if (!tabEval.length || robotPlaying) {
		return;
	}
	robotPlaying = true;
	nbClone$.set(0);
	const trait = trait$();
	const noeud: Noeud = {board: structuredClone(board$()), trait};
	const {donnerEnfants, jouer} = donnerEvalFns(tabEval, directions);
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
		prochainJoueurMax: !mustMaximize,
	}));

	const {poolWorkers, destroy} = createPoolWorker();
	timeStart = new Date().getTime();
	const resultats = await gererCalculParallele(poolWorkers, listeTaches);
	destroy();

	let meilleurCoup: Coordonnees | undefined;
	let meilleureEvaluation = mustMaximize ? -Infinity : Infinity;
	if (!humanErrors$()) {
		for (const res of resultats) {
			const {coup, evaluation} = res;
			if (
				(!mustMaximize && evaluation < meilleureEvaluation) ||
				(mustMaximize && evaluation > meilleureEvaluation)
			) {
				meilleureEvaluation = evaluation;
				meilleurCoup = coup;
			}
		}
	} else {
		const trierCroissant = (evalsOrder: ResultatTache[]) =>
			evalsOrder.sort((a: ResultatTache, b: ResultatTache) => a.evaluation - b.evaluation);
		const trierDecroissant = (evalsOrder: ResultatTache[]) =>
			evalsOrder.sort((a: ResultatTache, b: ResultatTache) => b.evaluation - a.evaluation);
		let orderResults;
		const shuffle: number = 11 - humanErrors$();
		const lengthResults = resultats.length - 1;
		let sumEvaluations = 0;
		const evaluationCumulative = [];
		if (robotTrait === 1) {
			orderResults = trierDecroissant(structuredClone(resultats));
			const minValue = orderResults[orderResults.length - 1].evaluation - 1;
			for (let i = 0; i <= lengthResults; i++) {
				orderResults[i].evaluation -= minValue;
				sumEvaluations += orderResults[i].evaluation;
				evaluationCumulative.push(sumEvaluations);
			}
		} else {
			orderResults = trierCroissant(structuredClone(resultats));
			const minValue = orderResults[orderResults.length - 1].evaluation - 1;
			for (let i = 0; i <= lengthResults; i++) {
				orderResults[i].evaluation -= minValue;
				sumEvaluations += orderResults[i].evaluation;
				evaluationCumulative.push(Math.abs(sumEvaluations));
			}
		}
		let bestPlay: ResultatTache;
		let averageRating = 0;

		for (let i = 0; i < shuffle; i++) {
			averageRating += 2 * (Math.random() - 0.5) * sumEvaluations;
		}
		averageRating = Math.abs(averageRating / shuffle);
		console.warn("averageRating", averageRating);
		console.log("evaluationCumulative", evaluationCumulative);
		for (let i = 0; i <= lengthResults; i++) {
			if (evaluationCumulative[i] > averageRating) {
				bestPlay = orderResults[i];
				break;
			}
		}

		meilleureEvaluation = bestPlay!.evaluation;
		meilleurCoup = bestPlay!.coup;
	}
	bestEvaluation$.set(meilleureEvaluation);
	robotPlaying = false;

	if (meilleurCoup) {
		const [y, x] = meilleurCoup;
		if (!showBestPlay$()) {
			await wait(waitMove);
			await playMove({x, y});
		} else {
			bestPlay$.set({x, y});
			showBestPlay$.set(false);
		}
	}
}
export const bestPlay$ = writable({x: -1, y: -1});
export const bestEvaluation$ = writable<number>(0);

function createPoolWorker() {
	const poolWorkers: Worker[] = [];
	for (let i = 0; i < workersNumber$() - 1; i++) {
		poolWorkers.push(new Worker(new URL("./worker.ts", import.meta.url), {type: "module"}));
	}
	return {
		poolWorkers,
		destroy() {
			poolWorkers.forEach((worker) => worker.terminate());
		},
	};
}

function gererCalculParallele(workers: Worker[], taches: Tache[]): Promise<ResultatTache[]> {
	// startCalcul = new Date();
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
				const {type, evaluation, n} = evenement.data;
				nbClone$.update((value) => value + n);
				if (type === "RESULTAT") {
					resultatsFinaux.push({coup: tacheActuelle.coup, evaluation, n});
					tachesTerminees++;

					if (tachesTerminees === taches.length) {
						resolve(resultatsFinaux);
					} else {
						lancerTacheSurWorker(worker);
					}
				}
			};

			worker.postMessage({type: "CALCULER", donnees: tacheActuelle});
		}

		workers.forEach((worker) => lancerTacheSurWorker(worker));
	});
}

export const computedSpeed$ = computed(() => {
	const nbClone = nbClone$();
	const date = new Date().getTime();
	console.log("timeStart", timeStart);
	if (!timeStart) {
		console.log(`🔴 (DEBUG) [code.ts:450]: timeStart: `, timeStart);
		return {
			speed: "0",
			time: "0",
		};
	} else if (nbClone / (date - timeStart) < 10000) {
		console.log("nbClone, date, timeStart", nbClone, date, timeStart);
		return {
			speed: Math.round((nbClone / (date - timeStart)) * 10) / 10 + "Kn/s",
			time: date - timeStart + "ms",
		};
	} else {
		console.log("nbClone, date, timeStart", nbClone, date, timeStart);
		return {
			speed: Math.round(nbClone / (date - timeStart) / 100) / 10 + "Mn/s",
			time: date - timeStart + "ms",
		};
	}
});

let addEditor: number = 0;
let firstTrait: number = 1;
let cursor: number = 0;
let tabEval: number[][] = [];
let robotTrait: Trait | undefined = undefined;
let profondeur = 1;
let robotPlaying = false;

export function moveCursor(avance: number) {
	// debugger;
	cursor += avance;
	if (cursor < 0) {
		cursor = 0;
	} else if (cursor > moves$.length) {
		cursor = moves$.length;
	} else {
		bestPlay$.set({x: -1, y: -1});
		board$.set(structuredClone(initialBoard$()));
		let trait = firstTrait;
		batch(() => {
			const moves = moves$();
			for (let i = 0; i < cursor; i++) {
				const [y, x] = moves[i];
				addPoint([[x, y]], board$(), trait, false);
				trait = trait === 1 ? -1 : 1;
			}
			lastPlay$.set({y: moves[cursor - 1][0], x: moves[cursor - 1][1]});
		});
		trait$.set(firstTrait === 1 ? (cursor % 2 === 0 ? 1 : -1) : cursor % 2 === 0 ? -1 : 1);
	}
	console.log("cursor", cursor, avance);
}

export const afterFirstPlay$ = computed(() => {
	return moves$.length !== 0;
});

export function setupKeyboard(): () => void {
	const onKeydown = (event: KeyboardEvent) => {
		switch (event.key) {
			case "ArrowUp":
				moveCursor(moves$.length - cursor);
				break;

			case "ArrowDown":
				moveCursor(-cursor);
				break;

			case "ArrowLeft":
				moveCursor(-1);
				break;

			case "ArrowRight":
				moveCursor(1);
				break;
		}
	};

	document.addEventListener("keydown", onKeydown);
	return () => document.removeEventListener("keydown", onKeydown);
}
