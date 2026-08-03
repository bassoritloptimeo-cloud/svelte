export type CellPos =  {x: number, y: number};

export type Cell = Record<string, CellPos>;

export interface Place {
	id: string
	nom: string
	numero_noir: number
	numero_rouge: number
	x: number
	y: number
}
