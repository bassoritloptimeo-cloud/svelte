

export const places = {
	maison_haut_gauche: {
		id: 'maison_haut_gauche',
		nom: 'Maison avec fleurs (en haut à gauche)',
		numero_noir: 71,
		numero_rouge: 53,
		left: 15.0,
		top: 12.5
	},
	gare: {
		id: 'gare',
		nom: 'Station (Gare)',
		numero_noir: 14,
		numero_rouge: 70,
		left: 40.5,
		top: 12.5
	},
	maison_haut_centre: {
		id: 'maison_haut_centre',
		nom: 'Petite maison (à côté de la gare)',
		numero_noir: 9,
		numero_rouge: 18,
		left: 60.5,
		top: 13.0
	},
	hotel: {
		id: 'hotel',
		nom: 'Hôtel (Méridional)',
		numero_noir: 12,
		numero_rouge: 1,
		left: 83.5,
		top: 14.5
	},
	sheriff: {
		id: 'sheriff',
		nom: 'Bureau du Shérif (Sheriff Office)',
		numero_noir: 16,
		numero_rouge: 27,
		left: 17.5,
		top: 27.5
	},
	diligence: {
		id: 'diligence',
		nom: 'Diligence et cheval',
		numero_noir: 29,
		numero_rouge: 80,
		left: 39.5,
		top: 27.0
	},
	banque: {
		id: 'banque',
		nom: 'Banque (Bank)',
		numero_noir: 77,
		numero_rouge: 30,
		left: 64.0,
		top: 26.5
	},
	primeur: {
		id: 'primeur',
		nom: 'Marchand de légumes (Vegetables)',
		numero_noir: 25,
		numero_rouge: 57,
		left: 86.0,
		top: 30.5
	},
	epicerie: {
		id: 'epicerie',
		nom: 'Épicerie (Grocery)',
		numero_noir: 76,
		numero_rouge: 7,
		left: 19.5,
		top: 43.0
	},
	fontaine: {
		id: 'fontaine',
		nom: 'Fontaine',
		numero_noir: 75,
		numero_rouge: 74,
		left: 42.5,
		top: 42.0
	},
	prison: {
		id: 'prison',
		nom: 'Prison (Jail)',
		numero_noir: 59,
		numero_rouge: 62,
		left: 63.0,
		top: 44.0
	},
	pont_bois: {
		id: 'pont_bois',
		nom: 'Grand pont en bois (à gauche)',
		numero_noir: 42,
		numero_rouge: 5,
		left: 16.5,
		top: 58.5
	},
	cabane_droite: {
		id: 'cabane_droite',
		nom: 'Cabane en bois (à droite de la prison)',
		numero_noir: 6,
		numero_rouge: 38,
		left: 86.5,
		top: 45.5
	},
	armurier: {
		id: 'armurier',
		nom: 'Armurier (Guns)',
		numero_noir: 58,
		numero_rouge: 47,
		left: 38.5,
		top: 58.0
	},
	cabane_peche: {
		id: 'cabane_peche',
		nom: 'Cabane de pêche / Puits',
		numero_noir: 34,
		numero_rouge: 28,
		left: 60.5,
		top: 60.5
	},
	pont_pierre: {
		id: 'pont_pierre',
		nom: 'Pont en pierre / Tunnel (à droite)',
		numero_noir: 45,
		numero_rouge: 48,
		left: 81.5,
		top: 59.5
	},
	pompes_funebres: {
		id: 'pompes_funebres',
		nom: 'Pompes funèbres (Funerals)',
		numero_noir: 31,
		numero_rouge: 5,
		left: 19.0,
		top: 72.0
	},
	forge: {
		id: 'forge',
		nom: 'Forge (Maréchal-ferrant)',
		numero_noir: 55,
		numero_rouge: 32,
		left: 40.0,
		top: 73.0
	},
	statue: {
		id: 'statue',
		nom: 'Statue de cowboy',
		numero_noir: 67,
		numero_rouge: 78,
		left: 61.5,
		top: 71.5
	},
	poste: {
		id: 'poste',
		nom: 'Bureau de poste (Post Office)',
		numero_noir: 51,
		numero_rouge: 3,
		left: 82.0,
		top: 73.0
	},
	saloon: {
		id: 'saloon',
		nom: 'Saloon',
		numero_noir: 37,
		numero_rouge: 24,
		left: 16.5,
		top: 86.5
	},
	cimetiere: {
		id: 'cimetiere',
		nom: 'Cimetière',
		numero_noir: 61,
		numero_rouge: 83,
		left: 40.5,
		top: 86.5
	},
	eglise: {
		id: 'eglise',
		nom: 'Église',
		numero_noir: 36,
		numero_rouge: 66,
		left: 63.5,
		top: 84.5
	},
	ecole: {
		id: 'ecole',
		nom: 'École (School)',
		numero_noir: 39,
		numero_rouge: 4,
		left: 86.0,
		top: 86.5
	}
};


export const moves = {
	maison_haut_gauche: {
		'1': 'maison_haut_centre',
		'2': 'sheriff',
		'3': 'hotel',
		'4': 'gare'
	},
	gare: {
		'1': 'diligence',
		'2': 'hotel',
		'3': 'maison_haut_centre',
		'4': 'maison_haut_gauche'
	},
	maison_haut_centre: {
		'1': 'maison_haut_gauche',
		'2': 'banque',
		'3': 'gare',
		'4': 'hotel'
	},
	hotel: {
		'1': 'primeur',
		'2': 'gare',
		'3': 'maison_haut_gauche',
		'4': 'maison_haut_centre'
	},
	sheriff: {
		'1': 'pont_bois',
		'2': 'maison_haut_gauche',
		'3': 'epicerie',
		'4': 'diligence'
	},
	diligence: {
		'1': 'gare',
		'2': 'fontaine',
		'3': 'banque',
		'4': 'sheriff'
	},
	banque: {
		'1': 'prison',
		'2': 'maison_haut_centre',
		'3': 'diligence',
		'4': 'primeur'
	},
	primeur: {
		'1': 'hotel',
		'2': 'pont_pierre',
		'3': 'cabane_droite',
		'4': 'banque'
	},
	epicerie: {
		'1': 'fontaine',
		'2': 'pont-bois',
		'3': 'sheriff',
		'4': 'pompes_funebres'
	},
	fontaine: {
		'1': 'epicerie',
		'2': 'diligence',
		'3': 'armurier',
		'4': 'prison'
	},
	prison: {
		'1': 'banque',
		'2': 'cabane_droite',
		'3': 'cabane_peche',
		'4': 'fontaine'
	},
	cabane_droite: {
		"1": 'poste',
		'2': 'prison',
		'3': 'primeur',
		'4': 'pont_pierre'
	},
	pont_bois: {
		'1': 'cheriff',
		"2": 'epicerie',
		'3': 'pompes_funebres',
		'4': 'armurerie'
	},
	armurier: {
		'1': 'forge',
		'2': 'cabane_peche',
		'3': 'fontaine',
		'4': 'pont_bois'
	},
	cabane_peche: {
		'1': 'pont_pierre',
		'2': 'armurier',
		'3': 'prison',
		'4': 'statue'
	},
	pont_pierre: {
		'1': 'cabane_peche',
		'2': 'primeur',
		'3': 'poste',
		'4': 'cabane_droite'
	},
	pompes_funebres: {
		'1': 'saloon',
		'2': 'forge',
		'3': 'pont_bois',
		'4': 'epicerie'
	},
	forge: {
		'1': 'armurier',
		'2': 'pompes_funebres',
		'3': 'statue',
		'4': 'cimetiere'
	},
	statue: {
		'1': 'eglise',
		'2': 'poste',
		'3': 'forge',
		'4': 'cabane_peche'
	},
	poste: {
		'1': 'cabane_droite',
		'2': 'statue',
		'3': 'pont_pierre',
		'4': 'ecole'
	},
	saloon: {
		'1': 'pompes_funebres',
		'2': 'cimetiere',
		'3': 'ecole',
		'4': 'eglise'
	},
	cimetiere: {
		'1': 'ecole',
		'2': 'saloon',
		'3': 'eglise',
		'4': 'forge'
	},
	eglise: {
		'1': 'statue',
		'2': 'ecole',
		'3': 'cimetiere',
		'4': 'saloon'
	},
	ecole: {
		'1': 'cimetiere',
		'2': 'eglise',
		'3': 'saloon',
		'4': 'poste'
	}
};
