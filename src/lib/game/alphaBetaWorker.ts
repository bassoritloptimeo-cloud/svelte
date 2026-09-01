export interface MinMaxNode {
	eval?: number;
}

export interface MinMaxOptions<Move, Node extends MinMaxNode> {
	evaluate: (node: Node) => number;
	isLeaf: (node: Node) => boolean;
	getChildren: (node: Node) => Move[];
	play: (node: Node, move: Move) => Node;
}

export type MinMaxFunction<Node extends MinMaxNode> = (
	node: Node,
	depth: number,
	alpha: number,
	beta: number,
	isMaximizingPlayer: boolean
) => number;

export function createMinMax<Move, Node extends MinMaxNode>({
	evaluate,
	isLeaf,
	getChildren,
	play
}: MinMaxOptions<Move, Node>): MinMaxFunction<Node> {
	return function alphabetaSequential(
		node: Node,
		depth: number,
		alpha: number,
		beta: number,
		isMaximizingPlayer: boolean
	): number {
		if (depth === 0 || isLeaf(node)) {
			return evaluate(node);
		}

		let score: number;
		const moves = getChildren(node);
		const sortedChildren: Node[] = [];

		// Quick pre-evaluation for move ordering
		for (const move of moves) {
			const child = play(node, move);
			sortedChildren.push(child);
			child.eval = evaluate(child);
		}

		if (isMaximizingPlayer) {
			sortedChildren.sort((a, b) => (b.eval ?? 0) - (a.eval ?? 0));
			score = -Infinity;
			for (const child of sortedChildren) {
				const value = alphabetaSequential(child, depth - 1, alpha, beta, false);
				score = Math.max(score, value);
				if (score >= beta) {
					return score;
				}
				alpha = Math.max(alpha, score);
			}
		} else {
			sortedChildren.sort((a, b) => (a.eval ?? 0) - (b.eval ?? 0));
			score = Infinity;
			for (const child of sortedChildren) {
				const value = alphabetaSequential(child, depth - 1, alpha, beta, true);
				score = Math.min(score, value);
				if (alpha >= score) {
					return score;
				}
				beta = Math.min(beta, score);
			}
		}
		return score;
	};
}
