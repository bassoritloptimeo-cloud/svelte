<script lang="ts">
	interface Props {
		color: "white" | "black";
	}

	const {color}: Props = $props();
</script>

<div class={`face ${color}`}></div>

<style>
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
		box-shadow: var(--black-shadow);
	}

	.white {
		background: radial-gradient(circle at 35% 30%, var(--white-radiant) 100%);
		border: 1px solid var(--white-border-color);
		box-shadow: var(--white-shadow);
	}
</style>
