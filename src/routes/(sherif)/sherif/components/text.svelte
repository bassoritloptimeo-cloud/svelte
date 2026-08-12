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
	}

	.bottom {
		background-color: rgb(0, 0, 0);
		padding: 20px;
		width: fit-content;
	}
</style>