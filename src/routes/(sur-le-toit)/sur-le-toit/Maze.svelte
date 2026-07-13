<script lang="ts">
    import {maze$, width$} from "./state.store";
</script>

<div class="tableContainer" style:--cols={$width$}>
    {#each $maze$ as floors, z (z)}
        <div>
            <div class="floorTitle">Etage No {z}</div>
            {#each floors as rows, y (y)}
                <div class="maze-grid">
                    {#each rows as cell, x (x)}
                    {@const {top, right, bottom, left, up, down} = cell}
                        <div 
                            class="cell" 
                            class:wall-top={!top} 
                            class:wall-bottom={!bottom} 
                            class:wall-left={!left} 
                            class:wall-right={!right} 
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
                </div>
            {/each}
        </div>
    {/each}
</div>

