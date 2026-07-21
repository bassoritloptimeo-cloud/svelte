export interface Maze {
    /** Largeur (X). */
    mx: number;
    /** Hauteur (Y). */
    my: number;
    /** Étages (Z). */
    mz: number;
    /** La grille 3D de cellules. */
    t: Cell[][][];
    /** Position actuelle du joueur [z, y, x]. */
    player: [number, number, number];
}

export interface Cell {
    /** Identifiant de la région (0 si non visitée). */
    id: number;
    /** Coordonnées [z, y, x]. */
    position: [number, number, number];
    /** Passage vers l'étage supérieur (z+1). */
    up: boolean;
    /** Passage vers l'étage inférieur (z-1). */
    down: boolean;
    /** Passage vers le nord (y-1). */
    top: boolean;
    /** Passage vers le sud (y+1). */
    bottom: boolean;
    /** Passage vers l'est (x+1). */
    right: boolean;
    /** Passage vers l'ouest (x-1). */
    left: boolean;
    /** Distance pour les algos de pathfinding. */
    dist?: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right' | 'top' | 'bottom';