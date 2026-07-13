function creerCell(cell, player) {
	const classes = [];
	const content = [];
	const [cz, cy, cx] = cell.position;
	const [z, y, x] = player;
	const {top, right, bottom, left, up, down} = cell;
	if (!top) {classes.push("wall-top")};
	if (!right) {classes.push("wall-right")};
	if (!bottom) {classes.push("wall-bottom")};
	if (!left) {classes.push("wall-left")};
	if (up && down) {
		content.push('<div class="go-both"></div>');
	} else {
		if (up) {content.push('<div class="go-up"></div>')};
		if (down) {content.push('<div class="go-down"></div>')};
	}
	if (cz === z && cy === y && cx === x) {classes.push("player")};

	// return `<td class="board-cell ${classes.join(" ")}">${content.join("")}${cell.id}</td>`;
	const {position} = cell;
	return `<div class="cell ${classes.join(" ")}" data-y="${position[1]}" data-x="${position[2]}">${content.join("")}</div>`;
}
const TState = {
	height: 1,
	width: 1,
	length: 1,
}
function creerTable(player, floor, floorNb) {
	return `
		<div>
			<div class="floorTitle">Etage No ${floorNb}</div>
			<div class="maze-grid">
				${floor.map((ligne) => `${ligne.map((cell) => creerCell(cell, player)).join('')}`).join('')}
			</div>
		</div>
	`;
}
function afficherTable() {
	let html = "";
	const floors = maze.t;
	for (let i = 0; i < floors.length; i++) {
		html += creerTable(maze.player, floors[i], i);
	}
	const container = document.querySelector(".tableContainer");
	container.innerHTML = html;
	const cols = maze.mx;
	// container.style.setProperty('--size', 'min(calc(50vh / var(--rows)), calc(50vw / var(--cols)))');
	console.log("cols", cols);
	container.style.setProperty('--cols', cols);
}
function afficherEtage(etage) {
	const html = creerTable(maze.player, maze.t[etage], etage);

	const container = document.querySelector(".tableContainer");
	container.innerHTML = html;
	const rows = 3;
	const cols = 5;
	const size = 50;
	// container.style.setProperty('--size', 'min(calc(50vh / var(--rows)), calc(50vw / var(--cols)))');
	container.style.setProperty('--size', '20px');
	// container.style.setProperty('--cols', cols);
	container.style.setProperty('--rows', rows);
}

function createPosition() {

	// document.querySelector(".WIN_general").style.display = "none";
	const height = TState.height;
	const width = TState.width;
	const length = TState.length;
	console.error("TState", TState);
	maze = createMaze(height, length, width);
	document.querySelector(".highButton").innerHTML = '<button class="demarrage" onclick="solvelabyrinth()">Trouver la sortie</button>';
	document.querySelector(".settings").style.display = "none";
	afficherTable();
}


const classNames = {
	"D": "start",
	"F": "end",
	"V": "empty",
	"C": "path",
	"P": "wall",
}

function majTable(board) {
	const cells = [...document.querySelector(".tableContainer").querySelectorAll('.cell')];
	for(const cell of cells) {
		rowIndex = cell.getAttribute("data-y");
		rowIndex = cell.getAttribute("data-x");
		const content = board[rowIndex][colIndex];
		td.className = classNames[content];
	}

	// Update the table display
}


const compareState = createStateComparator();

function majDisplay() {
	const diff = compareState(maze);
	console.log("📢[html.js:33]: diff: ", diff, maze.t);

	if (diff.t || diff.player) {
		afficherEtage(maze.player[0]);
	}
	// document.querySelector("td.player").scrollIntoView();

}


function displayWin() {
	const dialog = document.querySelector(".WIN_general");
	document.querySelector(".tableContainer").style.display = "none";
	dialog.showModal();

	dialog.classList.replace("WIN_begin", "WIN_color");
	document.querySelector(".WINtext_general").classList.replace("WINtext_begin", "WINtext_end");

}
function majValue(value, type) {
	document.querySelector(`.${type}`).innerHTML = value + "";
	const color = colorSlider(value);
	document.querySelector(`.slider_${type}`).style.accentColor = `rgb(${color[0] + ", " + color[1] + ", " + color[2]})`;
	TState[type] = value;
}

function colorSlider(value) {
	const maxValue = 48;
	let minColor = [0, 0, 255];
	let maxColor = [255, 0, 0];
	let color = [];
	value -= 2;
	for (let i = 0; i < 3; i++) {
		color.push((maxColor[i] - minColor[i]) * value / maxValue + minColor[i]);
	}
	return color;
}