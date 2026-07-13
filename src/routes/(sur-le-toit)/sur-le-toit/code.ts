import type { Cell, Maze } from "./types.ts";

// Type utilitaire pour restreindre les directions possibles
type Direction = "up" | "down" | "top" | "bottom" | "right" | "left";

const opposed: Record<Direction, Direction> = {
    up: "down",
    down: "up",
    top: "bottom",
    bottom: "top",
    right: "left",
    left: "right",
};

/**
 * Mélange un tableau en place.
 */
function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Récupère les directions mélangées.
 */
function getShuffleDirections(): [Direction, number, number, number][] {
    return shuffleArray([
        ["up", 1, 0, 0],
        ["down", -1, 0, 0],
        ["top", 0, -1, 0],
        ["bottom", 0, 1, 0],
        ["right", 0, 0, 1],
        ["left", 0, 0, -1],
    ]);
}

/**
 * Génère un labyrinthe 3D parfait.
 */
export function mazeFactory(mz: number, my: number, mx: number): Maze {
    const t: Cell[][][] = [];
    let max = 0;

    // Initialisation de la grille
    for (let z = 0; z < mz; z++) {
        const floor: Cell[][] = [];
        t.push(floor);
        for (let y = 0; y < my; y++) {
            const row: Cell[] = [];
            floor.push(row);
            for (let x = 0; x < mx; x++) {
                row.push({
                    id: 0,
                    position: [z, y, x],
                    up: false, down: false, top: false, 
                    right: false, bottom: false, left: false,
                    dist: undefined,
                });
            }
        }
    }

    function walk(z: number, y: number, x: number, idPath: number): void {
        max = idPath;
        const currentCell = t[z][y][x];
        currentCell.id = idPath;

        const directions = getShuffleDirections();
        for (const [dir, dz, dy, dx] of directions) {
            const nz = z + dz, ny = y + dy, nx = x + dx;
            const nextCell = t[nz]?.[ny]?.[nx];

            if (nextCell != null && nextCell.id === 0) {
                currentCell[dir] = true;
                nextCell[opposed[dir]] = true;
                walk(nz, ny, nx, idPath);
                return;
            }
        }
    }

    function fusion(): void {
        const groups: { z: number; y: number; x: number }[][] = Array.from(
            { length: max + 1 }, 
            () => []
        );
        
        for (let z = 0; z < mz; z++) {
            for (let y = 0; y < my; y++) {
                for (let x = 0; x < mx; x++) {
                    groups[t[z][y][x].id].push({ z, y, x });
                }
            }
        }

        for (let n = max; n > 1; n--) {
            const cellsInRegion = shuffleArray(groups[n]);
            let found = false;
            for (const { z, y, x } of cellsInRegion) {
                const currentCell = t[z][y][x];
                const directions = getShuffleDirections();
                for (const [dir, dz, dy, dx] of directions) {
                    const nz = z + dz, ny = y + dy, nx = x + dx;
                    const nextCell = t[nz]?.[ny]?.[nx];

                    if (nextCell && nextCell.id < n) {
                        currentCell[dir] = true;
                        nextCell[opposed[dir]] = true;
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
        }
    }

    function placeEntryExit(): void {
        const endX = Math.floor(Math.random() * mx);
        const endY = Math.floor(Math.random() * my);
        t[mz - 1][endY][endX].up = true;
    }

    let id = 1;
    for (let z = 0; z < mz; z++) {
        for (let y = 0; y < my; y++) {
            for (let x = 0; x < mx; x++) {
                if (t[z][y][x].id === 0) {
                    walk(z, y, x, id);
                    id++;
                }
            }
        }
    }

    fusion();
    placeEntryExit();

    return {
        mx, my, mz, t,
        player: [0, Math.floor(Math.random() * my), Math.floor(Math.random() * mx)],
    };
}

// --- Logique d'exécution ---

/*
let maze: Maze;

// Typage strict de l'objet d'événements clavier
const eventDirs: Record<string, [Direction, number, number, number]> = {
    "ArrowLeft": ["left", 0, 0, -1],
    "ArrowRight": ["right", 0, 0, 1],
    "ArrowUp": ["top", 0, -1, 0],
    "ArrowDown": ["bottom", 0, 1, 0],
    "PageUp": ["up", 1, 0, 0],
    "PageDown": ["down", -1, 0, 0],
};

document.addEventListener("keydown", (event: KeyboardEvent) => {
    const move = eventDirs[event.code];
    if (move) {
        event.preventDefault();
        moveFunction(move);
    }
});

function moveFunction(move: [Direction, number, number, number]): void {
    const [dir, dz, dy, dx] = move;
    const [z, y, x] = maze.player;
    
    const cell = maze.t[z][y][x];
    const nbFloors = maze.t.length - 1;
    
    if (cell[dir]) {
        if (z + dz > nbFloors) {
            console.error("WIN");
            displayWin(); // Doit être déclaré ailleurs dans votre code
        } else {
            maze.player = [z + dz, y + dy, x + dx];
            console.log("Position :", maze.player);
            majDisplay(); // Doit être déclaré ailleurs dans votre code
        }
    }
}

// Variables/Fonctions externes supposées (à adapter selon votre projet)
declare function displayWin(): void;
declare function majDisplay(): void;
*/