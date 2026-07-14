<script lang="ts">
    import {maze$, player$, width$} from "./state.store";


	const [pz, py, px] = $derived($player$);

</script>

<div class="tableContainer" style:--cols={$width$}>
    {#each $maze$ as floors, z (z)}
        <div>
            <div class="floorTitle">Etage No {z}</div>
			<div class="maze-grid">
            	{#each floors as rows, y (y)}
                    {#each rows as cell, x (x)}
                    	{@const {top, right, bottom, left, up, down} = cell}
                        <div 
                            class="cell" 
                            class:wall-top={!top} 
                            class:wall-bottom={!bottom} 
                            class:wall-left={!left} 
                            class:wall-right={!right} 
							class:player={z === pz && y === py && x === px}
                            data-y={y} 
                            data-x={x}
                        >
                            {#if up && down}
                                <div class="go-both"></div>
                            {:else}
                                {#if up}
                                    <div class="go-up"></div>
                                {/if}
                                {#if down}
                                    <div class="go-down"></div>
                                {/if}
                           {/if}
                        </div>                       
                    {/each}
				{/each}
			</div>
        </div>
    {/each}
</div>

