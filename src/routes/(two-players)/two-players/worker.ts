import { createMinMax } from '$lib/game/alphaBetaWorker';
import { donnerEvalFns } from './game.ts';
import type { Coordonnees, Direction, Noeud } from './game.ts';

interface CalculerMessage {
	type: 'CALCULER';
	donnees: {
		noeudEnfant: Noeud;
		profondeur: number;
		alpha: number;
		beta: number;
		prochainJoueurMax: boolean;
		tabEval: number[][];
		directions: readonly Direction[];
	};
}

interface ResultatMessage {
	type: 'RESULTAT';
	evaluation: number;
	n: number;
}

const workerSelf = self as unknown as {
	onmessage: ((event: MessageEvent<CalculerMessage>) => void) | null;
	postMessage: (message: ResultatMessage, transfer?: Transferable[]) => void;
};

workerSelf.onmessage = (evenement) => {
	const { type, donnees } = evenement.data;

	if (type === 'CALCULER') {
		const { noeudEnfant, profondeur, alpha, beta, prochainJoueurMax, tabEval, directions } =
			donnees;
		const { donnerEnfants, estFeuille, evaluer, jouer, donnerN } = donnerEvalFns(
			tabEval,
			directions
		);
		const alphabetaSequentiel = createMinMax<Coordonnees, Noeud>({
			evaluate: evaluer,
			isLeaf: estFeuille,
			getChildren: donnerEnfants,
			play: jouer
		});

		const evaluation = alphabetaSequentiel(noeudEnfant, profondeur, alpha, beta, prochainJoueurMax);
		workerSelf.postMessage({ type: 'RESULTAT', evaluation, n: donnerN() });
	}
};
