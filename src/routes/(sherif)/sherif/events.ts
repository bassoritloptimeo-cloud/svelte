export interface Event {
	text: string;
	condition?: { text?: string; target: number };
}

export const events: Record<string, Event> = {
	note1: {
		text: 'le bandit trouve un rasoir.'
	},
	note2: {
		text: 'le bandit trouve une caisse en bois.',
		condition: { text: 'Si il a un couteau', target: 64 }
	},
	note3: {
		text: 'le bandit trouve un crayon.'
	},
	note4: {
		text: "le bandit entend un écolier raconter à un camarade: mon père à moi, il est banquier. Et même qu'il connaît la combinaison du coffre: c'est 4.2.1."
	},
	note5: {
		text: 'si le bandit a un rasoir',
		condition: { target: 40 }
	},
	note6: {
		text: 'si le shérif a une hache',
		condition: { target: 21 }
	},
	note7: {
		text: 'le bandit trouve un sac en toile.'
	},
	note8: {
		text: 'le shérif montre sa procuration au convoyeur de fonds qui le suit.'
	},
	note9: {
		text: 'sa femme lui apprend que son fils a pris ses menottes pour jouer.'
	},
	note10: {
		text: 'le pasteur lui dit que son habit a disparu. Il remet au shérif un bon de livraison.'
	},
	note11: {
		text: 'tricheur! Vous ne devez lire que les notes correspondant aux cases où se trouvent les personnages.'
	},
	note12: {
		text: 'si le shérif a déjà rencontré le barbier',
		condition: { target: 35 }
	},
	note13: {
		text: "le bandit s'empare du sac d'or."
	},
	note14: {
		text: 'si le shérif a les clés de la malle',
		condition: { target: 17 }
	},
	note15: {
		text: 'grâce au carnet, le shérif dresse une contravention au cow-boy qui pêche dans la réserve de pêche. Il encaisse 10 $'
	},
	note16: {
		text: 'si le shérif sait où se trouve son étoile',
		condition: { target: 49 }
	},
	note17: {
		text: 'si le shérif est accompagné du convoyeur de fonds',
		condition: { target: 23 }
	},
	note18: {
		text: 'le bandit détourne la tête.'
	},
	note19: {
		text: 'si le bandit a des allumettes',
		condition: { target: 46 }
	},
	note20: {
		text: "le bandit ouvre la porte de la prison (jail). Il n'y a personne."
	},
	note21: {
		text: "le shérif rend la hache au bûcheron qui l'avait perdue."
	},
	note22: {
		text: 'il achète des allumettes.'
	},
	note23: {
		text: "le shérif ouvre le coffre et y prend le sac d'or."
	},
	note24: {
		text: 'le bandit joue au poker et il gagne 10 $.'
	},
	note25: {
		text: "le boutiquier donne au shérif le carnet qu'il avait commandé."
	},
	note26: {
		text: "le bandit essaye d'ouvrir la porte de l'armurerie (guns), mais le pied de biche se casse en deux."
	},
	note27: {
		text: 'si le bandit a un vieux fusil',
		condition: { target: 52 }
	},
	note28: {
		text: 'le bandit trouve un couteau.'
	},
	note29: {
		text: 'si le shérif a une procuration',
		condition: { target: 8 }
	},
	note30: {
		text: 'si le bandit a de la dynamite',
		condition: { target: 19 }
	},
	note31: {
		text: 'le shérif apprend que le fils du croque-mort est le meilleur copain de son fils.'
	},
	note32: {
		text: 'le bandit trouve un pied-de-biche.'
	},
	note33: {
		text: "si le bandit a le sac d'or",
		condition: { target: 54 }
	},
	note34: {
		text: 'le shérif trouve une hache.'
	},
	note35: {
		text: 'si le shérif a 10 $',
		condition: { target: 63 }
	},
	note36: {
		text: 'le shérif trouve son adjoint qui lui indique que son étoile est dans le tiroir du bureau du sherif office..'
	},
	note37: {
		text: 'le shérif trouve le barbier et lui dit de regagner son salon.'
	},
	note38: {
		text: 'le bandit trouve un vieux fusil'
	},
	note39: {
		text: 'si le shérif sait qui est le meilleur copain de son fils',
		condition: { target: 79 }
	},
	note40: {
		text: 'le bandit trébuche. Il laisse échapper le rasoir qui tombe dans la rivière.'
	},
	note41: {
		text: 'si le bandit est déguisé en pasteur',
		condition: { target: 22 }
	},
	note42: {
		text: 'si le shérif a un carnet',
		condition: { target: 15 }
	},
	note43: {
		text: 'le bandit remplit sa gourde.'
	},
	note44: {
		text: 'le shérif sait qui il doit arrêter. Il échange le bon de livraison contre un revolver chargé.'
	},
	note45: {
		text: "si le shérif sait qui se cache sous le pont, il l'appelle par son prénom",
		condition: { target: 69 }
	},
	note46: {
		text: 'le bandit fait exploser la porte de la banque et se précipite vers le coffre.',
		condition: { text: 'Si le bandit connaît la combinaison du coffre', target: 73 }
	},
	note47: {
		text: 'si le bandit a un pied-de-biche',
		condition: { target: 26 }
	},
	note48: {
		text: 'le bandit trouve une gourde.'
	},
	note49: {
		text: 'le shérif récupère son étoile.'
	},
	note50: {
		text: 'le shérif est présentable, Mrs Deagle le reçoit et lui donne une procuration.'
	},
	note51: {
		text: "on remet au shérif un télégramme, lui indiquant l'arrivée par la diligence d'une malle contenant un sac d'or."
	},
	note52: {
		text: 'le bandit laisse tomber le fusil.'
	},
	note53: {
		text: 'si le bandit a un habit de pasteur',
		condition: { target: 82 }
	},
	note54: {
		text: "le bandit emprunte un cheval. Il signe un bon avec le crayon et s'enfuit avec son butin vers une autre aventure. Vous avez perdu!"
	},
	note55: {
		text: 'si le shérif a un marteau',
		condition: { target: 65 }
	},
	note56: {
		text: 'le bandit ouvre la valise. Elle est vide.'
	},
	note57: {
		text: 'si le bandit a 10 $',
		condition: { target: 41 }
	},
	note58: {
		text: 'si le shérif a un bon de livraison',
		condition: { target: 60 }
	},
	note59: {
		text: 'le shérif trouve une affiche. « Wanted : Jack Silvergun »'
	},
	note60: {
		text: 'si le shérif a une affiche',
		condition: { target: 44 }
	},
	note61: {
		text: "si le voleur a pris l'habit du pasteur",
		condition: { target: 10 }
	},
	note62: {
		text: 'si le bandit a une clé',
		condition: { target: 20 }
	},
	note63: {
		text: 'le shérif se fait faire la barbe.'
	},
	note64: {
		text: 'il ouvre la caisse avec son couteau.',
		condition: { text: "S'il a un sac de toile", target: 68 }
	},
	note65: {
		text: 'le shérif donne le marteau au forgeron. Pour le remercier, celui-ci lui offre une lime.'
	},
	note66: {
		text: "le bandit trouve un habit de pasteur dans l'église."
	},
	note67: {
		text: "le bandit contemple, pensif, la statue de l'ancien shérif."
	},
	note68: {
		text: "dans la caisse, il a trouvé quelques batons de dynamite qu'il met dans son sac."
	},
	note69: {
		text: 'son fils accourt et lui remet ses menottes.'
	},
	note70: {
		text: 'si le bandit a un crayon',
		condition: { target: 33 }
	},
	note71: {
		text: 'si le shérif a un télégramme',
		condition: { target: 72 }
	},
	note72: {
		text: "si le shérif s'est fait faire la barbe",
		condition: { target: 50 }
	},
	note73: {
		text: '4.2.1. et hop! Le bandit ouvre le coffre de la banque.',
		condition: { text: "Si le shérif y a déposé le sac d'or", target: 13 }
	},
	note74: {
		text: 'si le bandit a un récipient',
		condition: { target: 43 }
	},
	note75: {
		text: 'le shérif trouve un marteau.'
	},
	note76: {
		text: 'le shérif trouve le chauffeur de la diligence qui lui remet la clé de la malle.'
	},
	note77: {
		text: "si le shérif a le sac d'or",
		condition: { target: 81 }
	},
	note78: {
		text: 'le bandit trouve une clef.'
	},
	note79: {
		text: 'il apprend par le copain de son fils, que celui-ci se cache sous le pont de pierre.'
	},
	note80: {
		text: 'le bandit trouve une petite valise.'
	},
	note81: {
		text: "Il dépose le sac d'or dans le coffre de la banque."
	},
	note82: {
		text: 'le bandit se déguise en pasteur.'
	},
	note83: {
		text: 'si le bandit a une valise',
		condition: { target: 56 }
	}
};
