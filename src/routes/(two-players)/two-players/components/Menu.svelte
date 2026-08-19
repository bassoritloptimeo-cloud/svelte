<script lang="ts">
	import { asset } from '$app/paths';
	import { petSelect$, player1$, player2$, traitInit$, traitInitText$, vsAmi, vsOrdi } from "../code";
</script>

<div class="menu">
	<div class="commencer">
		<button onclick={() => vsAmi()} class="demarrage">Commencer</button>
		<button onclick={() => vsOrdi()} class="vsOrdi">Jouer contre l'ordinateur</button>
	</div>
	<div class="parametres">
		<img class="icone" src={asset('/two-players/gear.svg')} width="40px" alt="gear icon">
		<br>
		<label for="pet-select">Taille de la grille :</label>
		<select name="pets" bind:value={$petSelect$}>
			<option value="4">4x4</option>
			<option value="5">5x5 (par défaut)</option>
			<option value="6">6x6</option>
			<option value="7">7x7</option>
			<option value="8">8x8</option>
		</select>
		<br>
		<br>
		<input id="posEditor" class="editeur-checkbox" type="checkbox" name="case1"> <label for="posEditor">Editeur de position</label>
		<h3>Noms des joueurs</h3>
		<div class=name-select>
			<input class="nom-joueur1 joueur1 name1" bind:value={$player1$}>
			<input class="nom-joueur2 joueur2 name2" bind:value={$player2$}>
		</div>
		<div class="beginner_Block"></div>
		<h3>Choisir le trait</h3>
		<div class = "beginner">
			<button class="trait_joueur1" onclick={() => $traitInit$ = 1}>Trait au vert</button>
			<button class="alea_trait" onclick={() => $traitInit$ = undefined}>Trait aléatoire</button>
			<button class="trait_joueur2" onclick={() => $traitInit$ = -1}>Trait au rouge</button>
		</div>
		<div class="beginner">
			<h4>trait : 
				<span 
					class="trait" 
					class:alea={$traitInit$ === undefined}
					class:joueur1={$traitInit$ === 1}
					class:joueur2={$traitInit$ === -1}
				>
					{$traitInitText$}
				</span>
			</h4>
		</div>
	</div>
</div>