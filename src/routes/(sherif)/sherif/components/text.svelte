<script lang="ts">

	import "../styles.css";

	interface Props {
		text: string[];
	}


	const { text }: Props = $props();
</script>
<div class="bottom-element newspaper">
	<h2>Journal des Événements</h2>
	<div class="bottom">
		{#each text as event, i (i)}
			<p>{event}</p>
		{/each}
	</div>
</div>

<style>
	p {
		color: rgb(74, 222, 128);
		white-space: nowrap;
		overflow: hidden;

	}

	h2 {
		font-family: "Domine, serif";
		text-transform: uppercase;
		font-size: 1.125rem;
		font-weight: 700;
		color: rgb(206 198 180);
	}

	.newspaper {
		background-color: rgb(0, 0, 0);
	}

	.bottom {
		height: 100%;
		width: 100%;
		margin: 5px;
		padding: 10px;
	}
</style>