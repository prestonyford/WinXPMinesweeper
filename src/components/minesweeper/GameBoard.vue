<template>
	<div class="board overflow-auto">
		<div class="flex" v-for="(_, row) in new Array(rows)">
			<MinesweeperTile v-for="(_, col) in new Array(cols)"
				:tile="props.board[row][col]"
				:allowClicks="allowClicks"
				@click="onClick(row, col)"
				@contextmenu.prevent="onRclick(row, col)"
				@mousedown="event => emit('tileMouseDown', event, props.board[row][col])" @mouseup="emit('tileMouseUp')"
				@mouseleave="emit('tileMouseUp')"
				@touchstart="onTouchStart(row, col)"
				@touchend="onTouchEnd()" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { type Tile } from '../../model/TileType.ts';
import MinesweeperTile from './MinesweeperTile.vue';

const props = defineProps<{
	board: Tile[][];
	allowClicks: boolean
}>();

const emit = defineEmits<{
	selectTile: [row: number, col: number]
	markTile: [row: number, col: number]
	tileMouseDown: [event: MouseEvent, tile: Tile]
	tileMouseUp: []
}>();

const rows = computed(() => props.board.length);
const cols = computed(() => props.board[0].length);

const longPressTimeout = ref<number | null>(null);

const onClick = (row: number, col: number) => {
	emit("selectTile", row, col);
}
const onRclick = (row: number, col: number) => {
	emit("markTile", row, col);
}

const onTouchStart = (row: number, col: number) => {
	longPressTimeout.value = window.setTimeout(() => {
		emit('markTile', row, col);
		longPressTimeout.value = null;
	}, 500);
}

function onTouchEnd() {
	if (longPressTimeout.value !== null) {
		clearTimeout(longPressTimeout.value);
		longPressTimeout.value = null;
	}
}

</script>

<style scoped>
.board {
	border-left: 4px #808080 solid;
	border-top: 4px #808080 solid;
	border-right: 4px white solid;
	border-bottom: 4px white solid;
}
</style>