import type { MinMaxNode } from '$lib/game/alphaBetaWorker';

export const MAX_EVAL = 1_000_000;

export type Coordonnees = [number, number];
export type Direction = readonly [number, number];

export interface Noeud extends MinMaxNode {
	board: number[][];
	trait: number;
}

export interface EvalFns {
	evaluer: (node: Noeud) => number;
	estFeuille: (node: Noeud) => boolean;
	donnerEnfants: (node: Noeud) => Coordonnees[];
	jouer: (node: Noeud, coordonnees: Coordonnees) => Noeud;
	ajoutPointMinmax: (opts: { state: Noeud; coordonnees: Coordonnees }) => void;
	resoudreExplosions: (state: Noeud, cell: Coordonnees) => Coordonnees[];
	donnerN: () => number;
}

export function donnerEvalFns(tabEval: number[][], directions: readonly Direction[]): EvalFns {
	let n = 0;

	function donnerN() {
		return n;
	}

	function resoudreExplosions(state: Noeud, cell: Coordonnees): Coordonnees[] {
		const [y, x] = cell;
		const newCells: Coordonnees[] = [];
		const point = state.board[y][x];
		if (Math.abs(point) >= 4) {
			state.board[y][x] = 0;
			const pointCouleur = Math.sign(point);
			for (const [dy, dx] of directions) {
				const nx = x + dx;
				const ny = y + dy;
				if (state.board[ny]?.[nx] != null) {
					newCells.push([ny, nx]);
					state.board[ny][nx] = pointCouleur * (Math.abs(state.board[ny][nx]) + 1);
				}
			}
		}
		return newCells;
	}

	function ajoutPointMinmax({ state, coordonnees }: { state: Noeud; coordonnees: Coordonnees }) {
		const [y, x] = coordonnees;
		const board = state.board;
		const couleur = Math.sign(board[y][x]);
		board[y][x] += couleur;
		let cells: Coordonnees[] = [[y, x]];
		while (cells.length) {
			const newCells: Coordonnees[] = [];
			for (const cell of cells) {
				newCells.push(...resoudreExplosions(state, cell));
			}
			cells = newCells;
		}
	}

	function evaluer(stateForComputer: Noeud): number {
		const { board } = stateForComputer;
		let evaluation = 0;
		let nombreCasesPossiblesJoueur1 = 0;
		let nombreCasesPossiblesJoueur2 = 0;
		const tailleJ = board.length;
		for (let j = 0; j < tailleJ; j++) {
			const ligne = board[j];
			const tailleI = ligne.length;
			for (let i = 0; i < tailleI; i++) {
				const cell = ligne[i];
				evaluation += cell * tabEval[i][j];
				if (cell > 0) {
					nombreCasesPossiblesJoueur1++;
				} else if (cell < 0) {
					nombreCasesPossiblesJoueur2++;
				}
			}
		}
		if (!nombreCasesPossiblesJoueur1) {
			return -MAX_EVAL;
		} else if (!nombreCasesPossiblesJoueur2) {
			return MAX_EVAL;
		}

		return evaluation;
	}

	function estFeuille(noeud: Noeud): boolean {
		const board = noeud.board;
		let joueur1 = false;
		let joueur2 = false;
		for (const lignes of board) {
			for (const points of lignes) {
				if (points > 0) {
					joueur1 = true;
					if (joueur1 && joueur2) {
						return false;
					}
				} else if (points < 0) {
					joueur2 = true;
					if (joueur1 && joueur2) {
						return false;
					}
				}
			}
		}
		return true;
	}

	function donnerEnfants(noeud: Noeud): Coordonnees[] {
		const trait = noeud.trait;
		const casesPossibles: Coordonnees[] = [];
		const board = noeud.board;
		for (let y = 0; y < board.length; y++) {
			const ligne = board[y];
			for (let x = 0; x < ligne.length; x++) {
				if (Math.sign(ligne[x]) === trait) {
					casesPossibles.push([y, x]);
				}
			}
		}
		return casesPossibles;
	}

	function jouer(noeud: Noeud, coordonnees: Coordonnees): Noeud {
		const nouveauNoeud = clonerBoard(noeud);
		ajoutPointMinmax({ state: nouveauNoeud, coordonnees });
		nouveauNoeud.trait *= -1;

		return nouveauNoeud;
	}

	function clonerBoard(noeud: Noeud): Noeud {
		n++;
		const noeudClone: Noeud = { board: [], trait: noeud.trait };
		const longueur = noeud.board.length;
		for (let i = 0; i < longueur; i++) {
			const ligne: number[] = [];
			for (let j = 0; j < longueur; j++) {
				ligne.push(noeud.board[i][j]);
			}
			noeudClone.board.push(ligne);
		}
		return noeudClone;
	}

	return {
		evaluer,
		estFeuille,
		donnerEnfants,
		jouer,
		ajoutPointMinmax,
		resoudreExplosions,
		donnerN
	};
}

export function preCalculs(tailleGrille: number): number[][] {
	const milieu = (tailleGrille - 1) / 2;
	const BASE_VALUE_OFFSET = 0.75;
	const ROUNDING_FACTOR = 10;
	const centerValue = Math.round(
		BASE_VALUE_OFFSET + Math.sqrt(2 * Math.pow(milieu, 2)) * ROUNDING_FACTOR
	);
	const evals: number[][] = [];
	for (let i = 0; i < tailleGrille; i++) {
		const distI = Math.abs(milieu - i);
		const lineEval: number[] = [];
		for (let j = 0; j < tailleGrille; j++) {
			const distJ = Math.abs(milieu - j);
			lineEval.push(
				Math.round(
					(centerValue - Math.sqrt(Math.pow(distI, 2) + Math.pow(distJ, 2))) * ROUNDING_FACTOR
				) / ROUNDING_FACTOR
			);
		}
		evals.push(lineEval);
	}
	return evals;
}
