// P V D F

console.log('Init global state');
const globalState = {
	arrival: [],
}

function boardChanged() {
    globalState.board = [...globalState.board];
	console.log("📢[code.js:26]: boardChanged: ", globalState.board);
}

function solvelabyrinth() {
    const obj = {
        board: maze.t,
        floorsNb: maze.t.length,
        rowsNb: maze.t[0].length,
        colsNb: maze.t[0][0].length,
        position: maze.player,
	};
    Object.assign(globalState, obj);
    
	console.log("📢[code.js:26]: solvelabyrinth: ", maze);
	let InitBoard = structuredClone(globalState.board);
	console.log("InitBoard", InitBoard);
	const position = maze.player;
	globalState.board[position[0]][position[1]][position[2]].value = 0;
    FindPath([globalState.position], 1);
	boardChanged();
	majDisplay(globalState);
}
const directions = [
    ["up", 1, 0, 0],
    ["down", -1, 0, 0],
    ["top", 0, -1, 0],
    ["bottom", 0, 1, 0],
    ["right", 0, 0, 1],
    ["left", 0, 0, -1],
];

function FindPath(casesPossibles, startingDistance) {
    const board = globalState.board;
    const nextCases = [];
    let solution = false;

    for (const [h, y, x] of casesPossibles) {
        const currentCell = board[h][y][x];

        for (const direction of directions) {
            const hM = h + direction[1];
            const yM = y + direction[2];
            const xM = x + direction[3];

            if (!board?.[hM]?.[yM]?.[xM]) {continue};

            const cell = board[hM][yM][xM];

            if (currentCell[direction[0]] && cell.value === undefined) {
                cell.value = startingDistance;
                nextCases.push([hM, yM, xM]);
            }

            if (h === board.length - 1 && cell.up) {
                solution = true;
                globalState.arrival = [hM, yM, xM];
            }
        }
    }

    if (!solution && nextCases.length) {
        FindPath(nextCases, startingDistance + 1);
    } else {
        // console.warn("board", board);
        backPath(startingDistance, globalState.arrival);
    }
}


function backPath(startingDistance, path) {
	// debugger;
	let validCase = [];
	let findPath = false;
	let [h, y, x] = path;
	let [hM, yM, xM] = path;
	const board = globalState.board;
	for (const direction of directions) {
        h += direction[1];
		y += direction[2];
		x += direction[3];
		const caseTest = board?.[h]?.[y]?.[x];
		if (caseTest) {
			if (caseTest.value === startingDistance - 1 && startingDistance > 0 && board[hM][yM][xM][direction[0]]) {
				validCase = [h, y, x];
				board[h][y][x].value = "C";
				path = [h, y, x];
				break;
			} else if (!caseTest.value) {
				findPath = true;
			}
		}
		[h, y, x] = [hM, yM, xM];
	}

	if (findPath) {
		// removeValues(globalState.board);
        console.log("Tboard", board);
	} else {
		backPath(startingDistance - 1, path);
	}

}

function removeValues(board) {
	const longueur = globalState.rowsNb;
	const longueurLines = globalState.colsNb;
	for (let i = 0; i < longueur; i++) {
		for (let j = 0; j < longueurLines; j++) {
			if (typeof board[i][j] === "number") {
				board[i][j] = "V";
			}
		}
	}
	console.log("board", board);
	majDisplay(globalState);
}