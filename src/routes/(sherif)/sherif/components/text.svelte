<script lang="ts">

	interface Props {
		text: string[];
	}


	const { text }: Props = $props();
</script>
<div class="bottom">
	{#each text as event, i (i)}
		<p>{event}</p>
	{/each}
</div>

<style>
	p {
		color: rgb(0, 255, 0);
		white-space: nowrap;
		overflow: hidden;

	}

	.bottom {
		background-color: rgb(0, 0, 0);
		height: 100%;
		width: 100%;
		margin: 5px;
		padding: 10px;
	}
</style>