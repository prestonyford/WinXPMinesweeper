<template>
	<button 
		class="tile flex items-center justify-center"
		:class="{
			'clicked': isLeftClicked,
			'unopened': tile.type === TileType.UNOPENED,
			'empty': [TileType.NUMBER, TileType.BOMB, TileType.LOSING_BOMB].includes(tile.type),
			'unclickable': [TileType.FLAGGED, TileType.FALSE_FLAG, TileType.BOMB, TileType.LOSING_BOMB].includes(tile.type) || !allowClicks,
			'colored red': tile.type === TileType.LOSING_BOMB,
			'colored pink': tile.type === TileType.FALSE_FLAG
		}"
		@mousedown="handleMouseDown"
		@mouseup="handleMouseUp"
		@mouseleave="handleMouseUp"
	>
		<div v-if="tile.type === TileType.BOMB || tile.type === TileType.LOSING_BOMB">
			<img src="/src/assets/Bomb.png" />
		</div>
		<div v-if="tile.type === TileType.FLAGGED || tile.type === TileType.FALSE_FLAG">
			<img src="/src/assets/Flag.png" />
		</div>
		<div v-else-if="tile.type === TileType.NUMBER" class="pt-[1px] pl-[1px]" >
			<img v-if="tile.value !== 0" :src="`/src/assets/Tile${tile.value}.png`" />
		</div>
	</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type Tile, TileType } from '../../model/TileType.ts';

defineProps<{
	tile: Tile;
	allowClicks: boolean;
}>();

const isLeftClicked = ref(false);

function handleMouseDown(event: MouseEvent) {
	if (event.button === 0) { // Left click
		isLeftClicked.value = true;
	}
}

function handleMouseUp() {
	isLeftClicked.value = false; 
}

</script>

<style scoped>
.tile {
	min-width: 24px;
	min-height: 24px;
	max-width: 24px;
	max-height: 24px;
	border-left: 2px white solid;
	border-top: 2px white solid;
	border-right: 2px #808080 solid;
	border-bottom: 2px #808080 solid;
	image-rendering: pixelated;
}
.clicked:not(.unclickable), .empty:not(.colored) {
	background-color: #adadad;
	border-left: 2px #808080 solid;
	border-top: 2px #808080 solid;
	border-right: 2px #adadad solid;
	border-bottom: 2px #adadad solid;
}
.unopened.clicked > * {
	position: relative;
	top: 1px;
	left: 1px;
}
.red {
	background-color: oklch(0.637 0.237 25.331);
}
.tile.red {
	border-left: 2px white solid;
	border-top: 2px white solid;
	border-right: 2px #808080 solid;
	border-bottom: 2px #808080 solid;
}
.pink {
	background-color: oklch(0.808 0.114 19.571);
}
img {
	pointer-events: none;
}
</style>