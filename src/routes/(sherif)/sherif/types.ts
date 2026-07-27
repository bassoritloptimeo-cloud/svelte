export type CellPos =  {x: number, y: number};

export interface Cell {
	'1': CellPos
	'2': CellPos
	'3': CellPos
	'4': CellPos
}

export interface Place {
	id: string
	nom: string
	numero_noir: number
	numero_rouge: number
	x: number
	y: number
}
