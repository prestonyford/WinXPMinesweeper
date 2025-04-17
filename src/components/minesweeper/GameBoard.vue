<template>
	<div class="board overflow-auto">
		<div class="flex" v-for="(_, row) in new Array(rows)" >
			<MinesweeperTile v-for="(_, col) in new Array(cols)"
				:tile="props.board[row][col]"
				:allowClicks="allowClicks"
				@click="onClick(row, col)"
				@contextmenu.prevent="onRclick(row, col)"
				@mousedown="event => emit('tileMouseDown', event, props.board[row][col])"
				@mouseup="emit('tileMouseUp')"
				@mouseleave="emit('tileMouseUp')"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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

const onClick = (row: number, col: number) => {
	emit("selectTile", row, col);
}
const onRclick = (row: number, col: number) => {
	emit("markTile", row, col);
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