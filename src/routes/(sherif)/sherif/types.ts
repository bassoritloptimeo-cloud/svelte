import type { Writable } from '@amadeus-it-group/tansu';

export type CellPos = { x: number; y: number };

export type Cell = Record<string, CellPos>;

export interface Place {
	id: string;
	nom: string;
	numeroNoir: number;
	numeroRouge: number;
	x: number;
	y: number;
}

export interface SherifInventory {
	star: number;
	procuration: number;
	deliveryNote: number;
	axe: number;
	notebook: number;
	telegram: number;
	poster: number;
	hammer: number;
	file: number;
	handcuffs: number;
	trunkKey: number;
	goldSack: number;
	money: number;
	revolver: number;
	barber: number;
	shaved: number;
	starKnown: number;
	convoyeur: number;
	sonFriendKnown: number;
	sonUnderBridgeKnown: number;
	goldDeposited: number;
}

export interface BanditInventory {
	razor: number;
	pencil: number;
	canvasBag: number;
	woodenBox: number;
	knife: number;
	crowbar: number;
	oldRifle: number;
	canteen: number;
	pastorRobe: number;
	key: number;
	suitcase: number;
	goldSack: number;
	matches: number;
	money: number;
	dynamite: number;
	combination: number;
}

export type ActionFn = (
	readText: (text: string) => void,
	sherifInventory$: Writable<SherifInventory>,
	banditInventory$: Writable<BanditInventory>,
	runNote: (note: string) => void,
	addInventory: (owner: 'sherif' | 'bandit', item: string, amount?: number) => void
) => void;

export interface Destination {
	path: string;
	place: Place;
}