import {describe, test, expect} from "vitest";
import {donnerEvalFns, preCalculs} from "./game";
import type {Coordonnees, Direction, Noeud} from "./game";
import {createMinMax} from "$lib/game/alphaBetaWorker";

const directions: readonly Direction[] = [
	[-1, 0],
	[0, -1],
	[0, 1],
	[1, 0],
];

// Version séquentielle (sans workers) de coupOrdinateur() dans code.ts
function trouverMeilleurCoup(
	noeud: Noeud,
	tabEval: number[][],
	profondeur: number,
): Coordonnees | undefined {
	const {donnerEnfants, evaluer, estFeuille, jouer} = donnerEvalFns(tabEval, directions);
	const alphabeta = createMinMax<Coordonnees, Noeud>({
		evaluate: evaluer,
		isLeaf: estFeuille,
		getChildren: donnerEnfants,
		play: jouer,
	});

	const mustMaximize = noeud.trait === 1;
	let meilleurCoup: Coordonnees | undefined;
	let meilleureEvaluation = mustMaximize ? -Infinity : Infinity;

	for (const coup of donnerEnfants(noeud)) {
		const noeudEnfant = jouer(noeud, coup);
		const evaluation = alphabeta(noeudEnfant, profondeur - 1, -Infinity, Infinity, !mustMaximize);

		if (
			(!mustMaximize && evaluation < meilleureEvaluation) ||
			(mustMaximize && evaluation > meilleureEvaluation)
		) {
			meilleureEvaluation = evaluation;
			meilleurCoup = coup;
		}
	}
	return meilleurCoup;
}

describe("Computer move", () => {
	test("find the best move for a simple board for red player", () => {
		const tabEval = preCalculs(3);
		const noeud: Noeud = {
			board: [
				[-1, 0, 0],
				[0, -3, 1],
				[0, 0, 0],
			],
			trait: -1,
		};

		const coup = trouverMeilleurCoup(noeud, tabEval, 1);

		expect(coup).toEqual([1, 1]);
	});

	test("find the best move for a simple board for green player", () => {
		const tabEval = preCalculs(3);
		const noeud: Noeud = {
			board: [
				[1, 0, 0],
				[0, 3, -1],
				[0, 0, 0],
			],
			trait: 1,
		};

		const coup = trouverMeilleurCoup(noeud, tabEval, 1);

		expect(coup).toEqual([1, 1]);
	});
});

describe("preCalculs", () => {
	test("preCalcul with 5", () => {
		const tabEval = preCalculs(5);
		expect(tabEval).toStrictEqual([
			[ 0.8, 1.4, 1.6, 1.4, 0.8 ],
			[ 1.4, 2.2, 2.6, 2.2, 1.4 ],
			[ 1.6, 2.6, 3.6, 2.6, 1.6 ],
			[ 1.4, 2.2, 2.6, 2.2, 1.4 ],
			[ 0.8, 1.4, 1.6, 1.4, 0.8 ]
		]);
	});
});

describe("evaluer", () => {

	test("negative eval", () => {
		const board = [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, -3, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1],
		];
		const tabEval = preCalculs(5);
		const {evaluer} = donnerEvalFns(tabEval, directions);
		const evaluation = evaluer({board, trait: 1})
		expect(evaluation).toBe(-10);
	});


});
