/** 
 * @typedef {Object} Cell
 * @property {number} id - Identifiant de la région (0 si non visitée).
 * @property {number[]} position - Coordonnées [z, y, x].
 * @property {boolean} up - Passage vers l'étage supérieur (z+1).
 * @property {boolean} down - Passage vers l'étage inférieur (z-1).
 * @property {boolean} top - Passage vers le nord (y-1).
 * @property {boolean} bottom - Passage vers le sud (y+1).
 * @property {boolean} right - Passage vers l'est (x+1).
 * @property {boolean} left - Passage vers l'ouest (x-1).
 * @property {number|undefined} dist - Distance pour les algos de pathfinding.
 */

/**
 * @typedef {Object} Maze
 * @property {number} mx - Largeur (X).
 * @property {number} my - Hauteur (Y).
 * @property {number} mz - Étages (Z).
 * @property {Cell[][][]} t - La grille 3D de cellules.
 * @property {number[]} player - Position actuelle du joueur [z, y, x].
 */

 const opposed = {
    up: "down",
    down: "up",
    top: "bottom",
    bottom: "top",
    right: "left",
    left: "right",
};

/**
 * Mélange un tableau en place.
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
function shuffleArray(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * @returns {[string, number, number, number][]}
 */
function getShuffleDirections() {
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
 * 
 * @param {number} mz - Nombre d'étages.
 * @param {number} my - Nombre de lignes.
 * @param {number} mx - Nombre de colonnes.
 * @returns {Maze}
 */
function createMaze(mz, my, mx) {
    /** @type {Cell[][][]} */
    const t = [];
    let max = 0;

    // Initialisation de la grille
    for (let z = 0; z < mz; z++) {
        const floor = [];
        t.push(floor);
        for (let y = 0; y < my; y++) {
            const row = [];
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

    function walk(z, y, x, idPath) {
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

    function fusion() {
        /** @type {{z:number, y:number, x:number}[][]} */
        const groups = Array.from({ length: max + 1 }, () => []);
        
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

    function placeEntryExit() {
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

let maze;

const eventDirs = {
    "ArrowLeft": ["left", 0, 0, -1],
    "ArrowRight": ["right", 0, 0, 1],
    "ArrowUp": ["top", 0, -1, 0],
    "ArrowDown": ["bottom", 0, 1, 0],
    "PageUp": ["up", 1, 0, 0],
    "PageDown": ["down", -1, 0, 0],
};

document.addEventListener("keydown", (event) => {
    const move = eventDirs[event.code];
    if (move) {
        event.preventDefault();
        moveFunction(move);
    }
});

/**
 * @param {[string, number, number, number]} move 
 */
function moveFunction(move) {
    const [dir, dz, dy, dx] = move;
    const [z, y, x] = maze.player;
    
    // Ici, grâce au @returns {Maze} de createMaze, 
    // l'éditeur sait que cell est de type Cell.
    const cell = maze.t[z][y][x];
	const nbFloors = maze.t.length - 1;
    if (cell[dir]) {
		if (z + dz > nbFloors) {
			console.error("WIN");
			displayWin();
		} else {
			maze.player = [z + dz, y + dy, x + dx];
			console.log("Position :", maze.player);
			majDisplay();
		}
    }
}