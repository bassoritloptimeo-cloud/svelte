<script lang="ts">
	import {onCellClick, playableCellsStr$} from "../code";

	interface Props {
		value: number;
		x: number;
		y: number;
	}

	const {value, x, y}: Props = $props();
	let isPlayable = $derived($playableCellsStr$.includes(`${y}${x}`));

	function onclick() {
		if (isPlayable) {
			onCellClick(y, x);
		}

		console.log(`🔴 (DEBUG) [Cell.svelte:10]: onclick: `, x, y);
	}
</script>

<button class:playable={isPlayable} {onclick}>
    {#if value !== 0}
        <!-- Le pion unique qui contient les deux faces et gère la rotation -->
        <div class="pawn" class:is-white={value === 1} class:is-black={value === -1}>
            <div class="face black"></div>
            <div class="face white"></div>
        </div>
    {:else}
        <div class:possibleMove={isPlayable}></div>
    {/if}
</button>

<style>
    button {
        all: unset;
        position: relative;
        border: var(--border-cell) solid white;
        background-color: var(--color-cell);
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
        perspective: 1000px;

        &.playable {
            pointer-events: all;
            cursor: pointer;
        }
    }

    .possibleMove {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1rem;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        background-color: rgb(255 255 255 / 50%);
        border: 1.5px dashed rgb(255 255 255 / 65%);
        transition: width 100ms linear;
        opacity: 0.6;
    }

    button:hover .possibleMove {
        width: 1.25rem;
    }

    /* Le conteneur du pion */
    .pawn {
        position: absolute;
        width: var(--pawn-size);
        aspect-ratio: 1 / 1;
        transform-style: preserve-3d;
        transition: var(--flipping-transition); /* Durée du retournement */

        /* Lorsque value === 1, on retourne tout le pion de 180deg */
        &.is-white {
            transform: rotateY(180deg);
        }
    }

    /* Style commun aux deux faces du pion */
    .face {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        backface-visibility: hidden; /* Cache la face arrière pendant la rotation */
    }

    .black {
        background: var(--black-radiant-color);
        border: 1px solid var(--black-border-color);

        /* Visible par défaut (0°) */
    }
	
	.is-black .black {
		box-shadow: 2px 5px 9px var(--black-shadow-color);
	}

	.is-white .white {
		box-shadow: 2px 5px 10px var(--white-shadow-color);
	}

    .white {
        background: radial-gradient(circle at 35% 30%, var(--white-radiant) 100%);
        border: 1px solid var(--white-border-color);
        /* Pré-pivotée à 180° pour être cachée au départ à l'arrière */
        transform: rotateY(180deg);
    }
</style>
