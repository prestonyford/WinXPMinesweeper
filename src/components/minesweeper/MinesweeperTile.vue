<template>
	<button 
		class="tile flex items-center justify-center"
		:class="{
			'unopened': tile.type === TileType.UNOPENED,
			'number': tile.type === TileType.NUMBER,
			'flag': tile.type === TileType.FLAGGED
		}"
	>
		<div v-if="tile.type === TileType.BOMB">
			<img src="/src/assets/Bomb.png" />
		</div>
		<div v-if="tile.type === TileType.FLAGGED">
			<img src="/src/assets/Flag.png" />
		</div>
		<div v-else-if="tile.type === TileType.NUMBER" class="pt-[1px] pl-[1px]" >
			<img v-if="tile.value !== 0" :src="`/src/assets/Tile${tile.value}.png`" />
		</div>
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
	image-rendering: pixelated;
}
.tile:active:not(.flag), .number {
	background-color: #adadad;
	border-left: 2px #808080 solid;
	border-top: 2px #808080 solid;
	border-right: 2px #adadad solid;
	border-bottom: 2px #adadad solid;
}
.unopened:active > * {
	position: relative;
	top: 1px;
	left: 1px;
}
img {
	pointer-events: none;
}
</style>