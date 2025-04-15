<template>
	<div class="board">
		<div class="flex" v-for="(_, row) in new Array(rows)" >
			<MinesweeperTile v-for="(_, col) in new Array(cols)"
				:tile="props.board[row][col]"
				@click="onClick(row, col)"
				@contextmenu.prevent="onRclick(row, col)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type Tile, TileType } from './TileType.ts';
import MinesweeperTile from './MinesweeperTile.vue';

const props = defineProps<{
	board: Tile[][]
}>();

const emit = defineEmits<{
	selectTile: [row: number, col: number]
	markTile: [row: number, col: number]
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