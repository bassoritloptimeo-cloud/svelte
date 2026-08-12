import type { ActionFn } from './types.ts';

export const events: Record<string, ActionFn> = {
	note1: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit trouve un rasoir.');
		addInventory('bandit', 'razor', 1);
	},
	note2: (readText, _sherif$, bandit$, runNote, addInventory) => {
		readText('Le bandit trouve une caisse en bois.');
		addInventory('bandit', 'woodenBox', 1);
		if (bandit$.get().knife > 0) runNote('64');
	},
	note3: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit trouve un crayon.');
		addInventory('bandit', 'pencil', 1);
	},
	note4: (readText) => {
		readText(
			"le bandit entend un écolier raconter à un camarade: mon père à moi, il est banquier. Et même qu'il connaît la combinaison du coffre: c'est 4.2.1."
		);
	},
	note5: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().razor > 0) {
			readText('Le bandit a un rasoir');
			runNote('40');
		} else {
			readText("Le bandit n'a pas de rasoir");
		}
	},
	note6: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().axe > 0) {
			readText('Le shérif a une hache');
			runNote('21');
		} else {
			readText("Le shérif n'a pas d'hache");
		}
	},
	note7: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit trouve un sac en toile.');
		addInventory('bandit', 'canvasBag', 1);
	},
	note8: (readText, sherif$) => {
		readText('Le shérif montre sa procuration au convoyeur de fonds qui le suit.');
		sherif$.update((inventory) => ({ ...inventory, convoyeur: 1 }));
	},
	note9: (readText) => {
		readText('sa femme lui apprend que son fils a pris ses menottes pour jouer.');
	},
	note10: (readText) => {
		readText('Le pasteur lui dit que son habit a disparu. Il remet au shérif un bon de livraison.');
	},
	note11: (readText) => {
		readText(
			'tricheur! Vous ne devez lire que les notes correspondant aux cases où se trouvent les personnages.'
		);
	},
	note12: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().barber > 0) {
			readText('Le shérif a déjà rencontré le barbier');
			runNote('35');
		} else {
			readText("Le shérif n'a jamais rencontré le barbier");
		}
	},
	note13: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText("le bandit s'empare du sac d'or.");
		addInventory('bandit', 'goldSack', 1);
	},
	note14: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().trunkKey > 0) {
			readText('Le shérif a les clés de la malle');
			runNote('17');
		} else {
			readText("Le shérif n'a pas les clés de la malle");
		}
	},
	note15: (readText) => {
		readText(
			'grâce au carnet, le shérif dresse une contravention au cow-boy qui pêche dans la réserve de pêche. Il encaisse 10 $'
		);
	},
	note16: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().starKnown > 0) {
			readText('Le shérif sait où se trouve son étoile');
			runNote('49');
		} else {
			readText('Le shérif ne sais pas où se trouve son étoile');
		}
	},
	note17: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().convoyeur > 0) {
			readText('Le shérif est accompagné du convoyeur de fonds');
			runNote('23');
		} else {
			readText("Le shérif n'est pas accompagné du convoyeur de fonds");
		}
	},
	note18: (readText) => {
		readText('Le bandit détourne la tête.');
	},
	note19: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().matches > 0) {
			readText('Le bandit a des allumettes');
			runNote('46');
		} else {
			readText("Le bandit n'a pas d'allumettes");
		}
	},
	note20: (readText) => {
		readText("le bandit ouvre la porte de la prison (jail). Il n'y a personne.");
	},
	note21: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText("le shérif rend la hache au bûcheron qui l'avait perdue.");
		addInventory('sherif', 'axe', -1);
	},
	note22: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('il achète des allumettes.');
		addInventory('bandit', 'matches', 1);
	},
	note23: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText("le shérif ouvre le coffre et y prend le sac d'or.");
		addInventory('sherif', 'goldSack', 1);
	},
	note24: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit joue au poker et il gagne 10 $.');
		addInventory('bandit', 'money', 10);
	},
	note25: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText("le boutiquier donne au shérif le carnet qu'il avait commandé.");
		addInventory('sherif', 'notebook', 1);
	},
	note26: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText(
			"le bandit essaye d'ouvrir la porte de l'armurerie (guns), mais le pied de biche se casse en deux."
		);
		addInventory('bandit', 'crowbar', -1);
	},
	note27: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().oldRifle > 0) {
			readText('Le bandit a un vieux fusil');
			runNote('52');
		} else {
			readText("Le bandit n'a pas de vieux fusil");
		}
	},
	note28: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit trouve un couteau.');
		addInventory('bandit', 'knife', 1);
	},
	note29: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().procuration > 0) {
			readText('Le shérif a une procuration');
			runNote('8');
		} else {
			readText("Le shérif n'a pas de procuration");
		}
	},
	note30: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().dynamite > 0) {
			readText('Le bandit a de la dynamite');
			runNote('19');
		} else {
			readText("Le bandit n'a pas de dynamite");
		}
	},
	note31: (readText, sherif$) => {
		readText('Le shérif apprend que le fils du croque-mort est le meilleur copain de son fils.');
		sherif$.update((inventory) => ({ ...inventory, sonFriendKnown: 1 }));
	},
	note32: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit trouve un pied-de-biche.');
		addInventory('bandit', 'crowbar', 1);
	},
	note33: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().goldSack > 0) {
			readText("Le bandit a le sac d'or");
			runNote('54');
		} else {
			readText("Le bandit n'a pas le sac d'or");
		}
	},
	note34: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le shérif trouve une hache.');
		addInventory('sherif', 'axe', 1);
	},
	note35: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().money >= 10) {
			readText('Le shérif a 10 $');
			runNote('63');
		} else {
			readText("Le shérif n'a pas 10 $");
		}
	},
	note36: (readText, sherif$) => {
		readText(
			'Le shérif trouve son adjoint qui lui indique que son étoile est dans le tiroir du bureau du sherif office..'
		);
		sherif$.update((inventory) => ({ ...inventory, starKnown: 1 }));
	},
	note37: (readText) => {
		readText('Le shérif trouve le barbier et lui dit de regagner son salon.');
	},
	note38: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit trouve un vieux fusil');
		addInventory('bandit', 'oldRifle', 1);
	},
	note39: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().sonFriendKnown > 0) {
			readText('Le shérif sait qui est le meilleur copain de son fils');
			runNote('79');
		} else {
			readText("Le shérif ne sait pas qui est le meilleur copain de son fils");
		}
	},
	note40: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit trébuche. Il laisse échapper le rasoir qui tombe dans la rivière.');
		addInventory('bandit', 'razor', -1);
	},
	note41: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().pastorRobe > 0) {
			readText('Le bandit est déguisé en pasteur');
			runNote('22');
		} else {
			readText("Le bandit n'est pas déguisé en pasteur");
		}
	},
	note42: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().notebook > 0) {
			readText('Le shérif a un carnet');
			runNote('15');
		} else {
			readText("Le shérif n'a pas de carnet");
		}
	},
	note43: (readText) => {
		readText('Le bandit remplit sa gourde.');
	},
	note44: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText(
			'Le shérif sait qui il doit arrêter. Il échange le bon de livraison contre un revolver chargé.'
		);
		addInventory('sherif', 'deliveryNote', -1);
		addInventory('sherif', 'revolver', 1);
	},
	note45: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().sonUnderBridgeKnown > 0) {
			readText("Le shérif sait qui se cache sous le pont, il l'appelle par son prénom");
			runNote('69');
		} else {
			readText("Le shérif ne sait pas qui se cache sous le pont");
		}
	},
	note46: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().combination > 0) {
			readText('Le bandit fait exploser la porte de la banque et se précipite vers le coffre.');
			runNote('73');
		}
	},
	note47: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().crowbar > 0) {
			readText('Le bandit a un pied-de-biche');
			runNote('26');
		} else {
			readText("Le bandit n'a pas de pied-de-biche");
		}
	},
	note48: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit trouve une gourde.');
		addInventory('bandit', 'canteen', 1);
	},
	note49: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le shérif récupère son étoile.');
		addInventory('sherif', 'star', 1);
	},
	note50: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le shérif est présentable, Mrs Deagle le reçoit et lui donne une procuration.');
		addInventory('sherif', 'procuration', 1);
	},
	note51: (readText) => {
		readText(
			"on remet au shérif un télégramme, lui indiquant l'arrivée par la diligence d'une malle contenant un sac d'or."
		);
	},
	note52: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit laisse tomber le fusil.');
		addInventory('bandit', 'oldRifle', -1);
	},
	note53: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().pastorRobe > 0) {
			readText('Le bandit a un habit de pasteur');
			runNote('82');
		}
	},
	note54: (readText) => {
		readText(
			"le bandit emprunte un cheval. Il signe un bon avec le crayon et s'enfuit avec son butin vers une autre aventure. Vous avez perdu!"
		);
	},
	note55: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().hammer > 0) {
			readText('Le shérif a un marteau');
			runNote('65');
		} else {
			readText("Le shérif n'a pas de marteau");
		}
	},
	note56: (readText) => {
		readText('Le bandit ouvre la valise. Elle est vide.');
	},
	note57: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().money >= 10) {
			readText('Le bandit a 10 $');
			runNote('41');
		} else {
			readText("Le bandit n'a pas 10 $");
		}
	},
	note58: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().deliveryNote > 0) {
			readText('Le shérif a un bon de livraison');
			runNote('60');
		} else {
			readText("Le shérif n's pas de bon de livraison");
		}
	},
	note59: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le shérif trouve une affiche. « Wanted : Jack Silvergun »');
		addInventory("sherif", "poster", 1);
		
	},
	note60: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().poster > 0) {
			readText('Le shérif a une affiche');
			runNote('44');
		} else {
			readText("Le shérif n'a pas d'affiche");
		}
	},
	note61: (readText, _sherif$, bandit$, runNote) => {
		readText("si le voleur a pris l'habit du pasteur");
		if (bandit$.get().pastorRobe > 0) runNote('10');
	},
	note62: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().key > 0) {
			readText('Le bandit a une clé');
			runNote('20');
		} else {
			readText("Le bandit n'a pas de clé");
		}
	},
	note63: (readText) => {
		readText('Le shérif se fait faire la barbe.');
	},
	note64: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().canvasBag > 0) {
			readText('il ouvre la caisse avec son couteau.');
			runNote('68');
		}
	},
	note65: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText(
			'Le shérif donne le marteau au forgeron. Pour le remercier, celui-ci lui offre une lime.'
		);
		addInventory('sherif', 'hammer', -1);
		addInventory('sherif', 'file', 1);
	},
	note66: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText("le bandit trouve un habit de pasteur dans l'église.");
		addInventory('bandit', 'pastorRobe', 1);
	},
	note67: (readText) => {
		readText("le bandit contemple, pensif, la statue de l'ancien shérif.");
	},
	note68: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText("dans la caisse, il a trouvé quelques batons de dynamite qu'il met dans son sac.");
		addInventory('bandit', 'dynamite', 1);
	},
	note69: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('son fils accourt et lui remet ses menottes.');
		addInventory('sherif', 'handcuffs', 1);
	},
	note70: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().pencil > 0) {
			readText('Le bandit a un crayon');
			runNote('33');
		} else {
			readText("Le bandit n'a pas de crayon");
		}
	},
	note71: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().telegram > 0) {
			readText('Le shérif a un télégramme');
			runNote('72');
		} else {
			readText("Le shérif n'a pas de télégramme");
		}
	},
	note72: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().shaved > 0) {
			readText("Le shérif s'est fait faire la barbe");
			runNote('50');
		} else {
			readText("Le shérif ne s'est pas fait faire la barbe");
		}
	},
	note73: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().goldDeposited > 0) {
			readText('4.2.1. et hop! Le bandit ouvre le coffre de la banque.');
			runNote('13');
		}
	},
	note74: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().canteen > 0) {
			readText('Le bandit a un récipient');
			runNote('43');
		} else {
			readText("Le bandit n'a pas de récipient");
		}
	},
	note75: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le shérif trouve un marteau.');
		addInventory('sherif', 'hammer', 1);
	},
	note76: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le shérif trouve le chauffeur de la diligence qui lui remet la clé de la malle.');
		addInventory('sherif', 'trunkKey', 1);
	},
	note77: (readText, sherif$, _bandit$, runNote) => {
		if (sherif$.get().goldSack > 0) {
			readText("Le shérif a le sac d'or");
			runNote('81');
		} else {
			readText("Le shérif n'a pas le sac d'or");
		}
	},
	note78: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit trouve une clef.');
		addInventory('bandit', 'key', 1);
	},
	note79: (readText, sherif$) => {
		readText('il apprend par le copain de son fils, que celui-ci se cache sous le pont de pierre.');
		sherif$.update((inventory) => ({ ...inventory, sonUnderBridgeKnown: 1 }));
	},
	note80: (readText, _sherif$, _bandit$, _runNote, addInventory) => {
		readText('Le bandit trouve une petite valise.');
		addInventory('bandit', 'suitcase', 1);
	},
	note81: (readText, sherif$) => {
		readText("Il dépose le sac d'or dans le coffre de la banque.");
		sherif$.update((inventory) => ({ ...inventory, goldDeposited: 1 }));
	},
	note82: (readText) => {
		readText('Le bandit se déguise en pasteur.');
	},
	note83: (readText, _sherif$, bandit$, runNote) => {
		if (bandit$.get().suitcase > 0) {
			readText('Le bandit a une valise');
			runNote('56');
		} else {
			readText("Le bandit n'a pas de valise");
		}
	}
};
