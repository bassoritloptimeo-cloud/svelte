<script lang="ts">
	import type { SherifInventory, BanditInventory } from '../types.ts';

	interface Props {
		sherifInventory: SherifInventory
		banditInventory: BanditInventory
		inventoryTranslations: Record<string, string>
	}

	const { sherifInventory, banditInventory, inventoryTranslations }: Props = $props();
</script>

<div class="inventory">
	<div class="sherif-Inventory">
		<h4>Sherif</h4>
		<div class="avatar-inventory">
			{#each Object.entries(sherifInventory) as [key, value] (key)}
				{#if value !== 0}
					<div class="key-inventory">
						<p>{inventoryTranslations[key]}</p>
					</div>
					<div class="value-inventory">
						<p>{value}</p>
					</div>
				{/if}
			{/each}
		</div>
	</div>
	<div class="bandit-Inventory">
		<h4>Bandit</h4>
		<div class="avatar-inventory">
			{#each Object.entries(banditInventory) as [key, value] (key)}
				{#if value !== 0}
					<div class="key-inventory">
						<p>{inventoryTranslations[key]}</p>
					</div>
					<div class="value-inventory">
						<p>{value}</p>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	p {
		font-size: 0.75rem;
	}
	.inventory {
		display: grid;
    	grid-template-columns: auto 1fr;
	}
	.avatar-inventory {
		display: grid;
    	grid-template-columns: auto 1fr;
	}
	.key-inventory {
		display: inline-block;
		border-right: 2px solid rgb(100, 20, 20);
		padding: 5px 10px 5px 10px;
	}
	.value-inventory {
		display: inline-block;
		border-left: 2px solid rgb(100, 20, 20);
		padding: 5px 10px 5px 10px;
	}
	.sherif-Inventory {
		
		margin-right: 50px;
	}
	.bandit-Inventory {
		width: fit-content;
		margin-left: 50px;
	}
	h4 {
		display: flex;
    	justify-content: center;
	}
</style>