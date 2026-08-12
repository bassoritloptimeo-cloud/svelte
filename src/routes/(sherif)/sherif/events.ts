import type { ActionFn } from './types.ts';

export const events: Record<string, ActionFn> = {
	note1: (readText) => {
		readText('le bandit trouve un rasoir.');
	},
	note2: (readText, _sherif$, bandit$, runNote) => {
		readText('le bandit trouve une caisse en bois.');
		if (bandit$.get().knife > 0) runNote('64');
	},
	note3: (readText) => {
		readText('le bandit trouve un crayon.');
	},
	note4: (readText) => {
		readText(
			"le bandit entend un écolier raconter à un camarade: mon père à moi, il est banquier. Et même qu'il connaît la combinaison du coffre: c'est 4.2.1."
		);
	},
	note5: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit a un rasoir');
		if (bandit$.get().razor > 0) runNote('40');
	},
	note6: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif a une hache');
		if (sherif$.get().axe > 0) runNote('21');
	},
	note7: (readText) => {
		readText('le bandit trouve un sac en toile.');
	},
	note8: (readText, sherif$) => {
		readText('le shérif montre sa procuration au convoyeur de fonds qui le suit.');
		sherif$.update((inventory) => ({ ...inventory, convoyeur: 1 }));
	},
	note9: (readText) => {
		readText('sa femme lui apprend que son fils a pris ses menottes pour jouer.');
	},
	note10: (readText) => {
		readText('le pasteur lui dit que son habit a disparu. Il remet au shérif un bon de livraison.');
	},
	note11: (readText) => {
		readText(
			'tricheur! Vous ne devez lire que les notes correspondant aux cases où se trouvent les personnages.'
		);
	},
	note12: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif a déjà rencontré le barbier');
		if (sherif$.get().barber > 0) runNote('35');
	},
	note13: (readText) => {
		readText("le bandit s'empare du sac d'or.");
	},
	note14: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif a les clés de la malle');
		if (sherif$.get().trunkKey > 0) runNote('17');
	},
	note15: (readText) => {
		readText(
			'grâce au carnet, le shérif dresse une contravention au cow-boy qui pêche dans la réserve de pêche. Il encaisse 10 $'
		);
	},
	note16: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif sait où se trouve son étoile');
		if (sherif$.get().starKnown > 0) runNote('49');
	},
	note17: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif est accompagné du convoyeur de fonds');
		if (sherif$.get().convoyeur > 0) runNote('23');
	},
	note18: (readText) => {
		readText('le bandit détourne la tête.');
	},
	note19: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit a des allumettes');
		if (bandit$.get().matches > 0) runNote('46');
	},
	note20: (readText) => {
		readText("le bandit ouvre la porte de la prison (jail). Il n'y a personne.");
	},
	note21: (readText) => {
		readText("le shérif rend la hache au bûcheron qui l'avait perdue.");
	},
	note22: (readText) => {
		readText('il achète des allumettes.');
	},
	note23: (readText) => {
		readText("le shérif ouvre le coffre et y prend le sac d'or.");
	},
	note24: (readText) => {
		readText('le bandit joue au poker et il gagne 10 $.');
	},
	note25: (readText) => {
		readText("le boutiquier donne au shérif le carnet qu'il avait commandé.");
	},
	note26: (readText) => {
		readText(
			"le bandit essaye d'ouvrir la porte de l'armurerie (guns), mais le pied de biche se casse en deux."
		);
	},
	note27: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit a un vieux fusil');
		if (bandit$.get().oldRifle > 0) runNote('52');
	},
	note28: (readText) => {
		readText('le bandit trouve un couteau.');
	},
	note29: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif a une procuration');
		if (sherif$.get().procuration > 0) runNote('8');
	},
	note30: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit a de la dynamite');
		if (bandit$.get().dynamite > 0) runNote('19');
	},
	note31: (readText, sherif$) => {
		readText('le shérif apprend que le fils du croque-mort est le meilleur copain de son fils.');
		sherif$.update((inventory) => ({ ...inventory, sonFriendKnown: 1 }));
	},
	note32: (readText) => {
		readText('le bandit trouve un pied-de-biche.');
	},
	note33: (readText, _sherif$, bandit$, runNote) => {
		readText("si le bandit a le sac d'or");
		if (bandit$.get().goldSack > 0) runNote('54');
	},
	note34: (readText) => {
		readText('le shérif trouve une hache.');
	},
	note35: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif a 10 $');
		if (sherif$.get().money >= 10) runNote('63');
	},
	note36: (readText, sherif$) => {
		readText(
			'le shérif trouve son adjoint qui lui indique que son étoile est dans le tiroir du bureau du sherif office..'
		);
		sherif$.update((inventory) => ({ ...inventory, starKnown: 1 }));
	},
	note37: (readText) => {
		readText('le shérif trouve le barbier et lui dit de regagner son salon.');
	},
	note38: (readText) => {
		readText('le bandit trouve un vieux fusil');
	},
	note39: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif sait qui est le meilleur copain de son fils');
		if (sherif$.get().sonFriendKnown > 0) runNote('79');
	},
	note40: (readText) => {
		readText('le bandit trébuche. Il laisse échapper le rasoir qui tombe dans la rivière.');
	},
	note41: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit est déguisé en pasteur');
		if (bandit$.get().pastorRobe > 0) runNote('22');
	},
	note42: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif a un carnet');
		if (sherif$.get().notebook > 0) runNote('15');
	},
	note43: (readText) => {
		readText('le bandit remplit sa gourde.');
	},
	note44: (readText) => {
		readText(
			'le shérif sait qui il doit arrêter. Il échange le bon de livraison contre un revolver chargé.'
		);
	},
	note45: (readText, sherif$, _bandit$, runNote) => {
		readText("si le shérif sait qui se cache sous le pont, il l'appelle par son prénom");
		if (sherif$.get().sonUnderBridgeKnown > 0) runNote('69');
	},
	note46: (readText, _sherif$, bandit$, runNote) => {
		readText('le bandit fait exploser la porte de la banque et se précipite vers le coffre.');
		if (bandit$.get().combination > 0) runNote('73');
	},
	note47: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit a un pied-de-biche');
		if (bandit$.get().crowbar > 0) runNote('26');
	},
	note48: (readText) => {
		readText('le bandit trouve une gourde.');
	},
	note49: (readText) => {
		readText('le shérif récupère son étoile.');
	},
	note50: (readText) => {
		readText('le shérif est présentable, Mrs Deagle le reçoit et lui donne une procuration.');
	},
	note51: (readText) => {
		readText(
			"on remet au shérif un télégramme, lui indiquant l'arrivée par la diligence d'une malle contenant un sac d'or."
		);
	},
	note52: (readText) => {
		readText('le bandit laisse tomber le fusil.');
	},
	note53: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit a un habit de pasteur');
		if (bandit$.get().pastorRobe > 0) runNote('82');
	},
	note54: (readText) => {
		readText(
			"le bandit emprunte un cheval. Il signe un bon avec le crayon et s'enfuit avec son butin vers une autre aventure. Vous avez perdu!"
		);
	},
	note55: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif a un marteau');
		if (sherif$.get().hammer > 0) runNote('65');
	},
	note56: (readText) => {
		readText('le bandit ouvre la valise. Elle est vide.');
	},
	note57: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit a 10 $');
		if (bandit$.get().money >= 10) runNote('41');
	},
	note58: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif a un bon de livraison');
		if (sherif$.get().deliveryNote > 0) runNote('60');
	},
	note59: (readText) => {
		readText('le shérif trouve une affiche. « Wanted : Jack Silvergun »');
	},
	note60: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif a une affiche');
		if (sherif$.get().poster > 0) runNote('44');
	},
	note61: (readText, _sherif$, bandit$, runNote) => {
		readText("si le voleur a pris l'habit du pasteur");
		if (bandit$.get().pastorRobe > 0) runNote('10');
	},
	note62: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit a une clé');
		if (bandit$.get().key > 0) runNote('20');
	},
	note63: (readText) => {
		readText('le shérif se fait faire la barbe.');
	},
	note64: (readText, _sherif$, bandit$, runNote) => {
		readText('il ouvre la caisse avec son couteau.');
		if (bandit$.get().canvasBag > 0) runNote('68');
	},
	note65: (readText) => {
		readText(
			'le shérif donne le marteau au forgeron. Pour le remercier, celui-ci lui offre une lime.'
		);
	},
	note66: (readText) => {
		readText("le bandit trouve un habit de pasteur dans l'église.");
	},
	note67: (readText) => {
		readText("le bandit contemple, pensif, la statue de l'ancien shérif.");
	},
	note68: (readText) => {
		readText("dans la caisse, il a trouvé quelques batons de dynamite qu'il met dans son sac.");
	},
	note69: (readText) => {
		readText('son fils accourt et lui remet ses menottes.');
	},
	note70: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit a un crayon');
		if (bandit$.get().pencil > 0) runNote('33');
	},
	note71: (readText, sherif$, _bandit$, runNote) => {
		readText('Le shérif a un télégramme');
		if (sherif$.get().telegram > 0) runNote('72');
	},
	note72: (readText, sherif$, _bandit$, runNote) => {
		readText("si le shérif s'est fait faire la barbe");
		if (sherif$.get().shaved > 0) runNote('50');
	},
	note73: (readText, sherif$, _bandit$, runNote) => {
		readText('4.2.1. et hop! Le bandit ouvre le coffre de la banque.');
		if (sherif$.get().goldDeposited > 0) runNote('13');
	},
	note74: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit a un récipient');
		if (bandit$.get().canteen > 0) runNote('43');
	},
	note75: (readText) => {
		readText('le shérif trouve un marteau.');
	},
	note76: (readText) => {
		readText('le shérif trouve le chauffeur de la diligence qui lui remet la clé de la malle.');
	},
	note77: (readText, sherif$, _bandit$, runNote) => {
		readText("si le shérif a le sac d'or");
		if (sherif$.get().goldSack > 0) runNote('81');
	},
	note78: (readText) => {
		readText('le bandit trouve une clef.');
	},
	note79: (readText, sherif$) => {
		readText('il apprend par le copain de son fils, que celui-ci se cache sous le pont de pierre.');
		sherif$.update((inventory) => ({ ...inventory, sonUnderBridgeKnown: 1 }));
	},
	note80: (readText) => {
		readText('le bandit trouve une petite valise.');
	},
	note81: (readText, sherif$) => {
		readText("Il dépose le sac d'or dans le coffre de la banque.");
		sherif$.update((inventory) => ({ ...inventory, goldDeposited: 1 }));
	},
	note82: (readText) => {
		readText('le bandit se déguise en pasteur.');
	},
	note83: (readText, _sherif$, bandit$, runNote) => {
		readText('Le bandit a une valise');
		if (bandit$.get().suitcase > 0) runNote('56');
	}
};
