<script lang="ts">
	interface Props {
		value: number;
		x: number;
		y: number;
	}

	const {value, x, y}: Props = $props();
	function onclick() {
		console.log(`🔴 (DEBUG) [Cell.svelte:10]: onclick: `, x, y);
	}
</script>

<button {onclick}>{value}</button>