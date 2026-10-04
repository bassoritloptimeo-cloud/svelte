<script lang="ts">
	import { onMount } from "svelte";
	import {settings$, backgroundColor$, gameStarted$, editing$, paramString$, updateUrl, initState} from "./code";

	import Edition from "./components/game/Edition.svelte";
	import Game from "./components/game/Game.svelte";
	import Menu from "./components/Menu.svelte";
	import SettingsDialog from "./components/SettingsDialog.svelte";

	import "./styles.css";
	
	onMount(() => {
		initState();
		const unsubscribe = paramString$.subscribe(updateUrl);
		return unsubscribe;
	});
</script>

<div class={`plateau ${$backgroundColor$}`}>
	{#if !$gameStarted$}
		<Menu />
	{:else}
		{#if $editing$}
			<Edition />
		{:else}
			<Game />
			{#if $settings$}
				<SettingsDialog />
			{/if}
		{/if}
	{/if}
</div>

<style>
	.player1 {
		background: linear-gradient(to top, rgb(0 150 0) 0%, rgb(0 255 0) 100%);
	}

	.player2 {
		background: linear-gradient(to top, rgb(150 0 0) 0%, rgb(255 0 0) 100%);
	}
</style>
