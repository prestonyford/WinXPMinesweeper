<template>
	<button 
		class="tile flex items-center justify-center"
		:class="{
			'zero': tile.type === TileType.NUMBER && tile.value === 0,
			'flag': tile.type === TileType.FLAGGED
		}"
	>
		<div v-if="tile.type === TileType.BOMB">B</div>
		<div v-if="tile.type === TileType.FLAGGED">F</div>
		<div v-else-if="tile.type === TileType.NUMBER">{{ tile.value || "" }}</div>
	</button>
</template>

<script setup lang="ts">
import { type Tile, TileType } from './TileType.ts';

defineProps<{
	tile: Tile;
}>();
</script>

<style scoped>
.tile {
	width: 24px;
	height: 24px;
	border-left: 2px white solid;
	border-top: 2px white solid;
	border-right: 2px #808080 solid;
	border-bottom: 2px #808080 solid;
}
.tile:active:not(.flag), .zero {
	background-color: #adadad;
	border-left: 2px #808080 solid;
	border-top: 2px #808080 solid;
	border-right: 2px #adadad solid;
	border-bottom: 2px #adadad solid;
}
.tile:active:not(.flag) > * {
	position: relative;
	top: 1px;
	left: 1px;
}
</style>