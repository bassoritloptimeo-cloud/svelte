<script lang="ts">
	import type { SherifInventory, BanditInventory } from '../types.ts';
	import "../styles.css";

	interface Props {
		sherifInventory: SherifInventory
		banditInventory: BanditInventory
		inventoryTranslations: Record<string, string>
	}

	const { sherifInventory, banditInventory, inventoryTranslations }: Props = $props();
</script>

<div class="bottom-element">
	<h2>>> Inventaire</h2>
	<div class="inventory-container">
		<div class="inventory">
			<div class="sherif-Inventory">
				<h2 class="sherifM sherif-Title title-category">Sherif</h2>
				<div class="avatar-inventory">
					{#each Object.entries(sherifInventory) as [key, value] (key)}
						{#if value !== 0}
							<div class="key-inventory">
								<p>{inventoryTranslations[key]}</p>
							</div>
							<div class="value-inventory">
								<p class="number-right">{value}</p>
							</div>
						{/if}
					{/each}
				</div>
			</div>
			<div class="bandit-Inventory">
				<h2 class="banditM bandit-Title title-category">Bandit</h2>
				<div class="avatar-inventory">
					{#each Object.entries(banditInventory) as [key, value] (key)}
						{#if value !== 0}
							<div class="key-inventory">
								<p>{inventoryTranslations[key]}</p>
							</div>
							<div class="value-inventory">
								<p class="number-right">{value}</p>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	p {
		font-family: "Domine, serif";
		font-size: 0.875rem;
	}
	


	.title-category {
		display: flex;
		justify-content: center;
		font-weight: bold;
		padding-left: 100px;
		padding-right: 100px;
	}

	.inventory-container {
		display: flex;
  		justify-content: center;
	}

	.inventory {
		height: 300px;;
		display: grid;
    	grid-template-columns: auto 1fr;
		overflow-y: auto;
	}

	.avatar-inventory {
		display: grid;
    	grid-template-columns: auto 1fr;
	}

	.key-inventory {
		display: inline-block;
		border-bottom : 1px solid rgba(255, 255, 255, 0.2);
		padding: 5px 10px 5px 10px;
	}
	
	.value-inventory {
		display: flex;
		border-bottom : 1px solid rgba(255, 255, 255, 0.2);
		padding: 5px 10px 5px 10px;
	}

	.sherif-Inventory {
		margin-right: 5px;
	}

	.bandit-Inventory {
		width: fit-content;
		margin-left: 5px;
	}

	.number-right {
		margin-left: auto;
		color: rgb(218 196 121);
		font-weight: bold;
	}

</style>