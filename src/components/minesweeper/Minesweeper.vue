<template>
	<div class="h-full flex flex-col">
		<div class="bg-[#ECE9D8] h-[19px]">

		</div>
		<div class="frame grow">
			<div class="bg-[#C0C0C0] h-full flex flex-col p-[6px] gap-[6px]">
				<div class="upper-frame h-[46px] flex justify-between items-center p-[4px]">
					<NumberDisplay :number="gameState.game.getNumBombs() - numFlags" />
					<MinesweeperButton @click="reset" />
					<NumberDisplay :number="time" />
				</div>
				<GameBoard class="grow"
					:board="gameState.game.getBoard()"
					@selectTile="selectTile"
					@markTile="markTile"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue';
import NumberDisplay from './NumberDisplay.vue';
import GameBoard from './GameBoard.vue';
import MinesweeperButton from './MinesweeperButton.vue';
import MinesweeperGame from './MinesweeperGame';
import { TileType } from './TileType';

const time = ref(0);
const interval = ref<number | null>(null);
const numFlags = ref(0);

const gameState = reactive({
	game: MinesweeperGame.BeginnerGame()
});

function selectTile(row: number, col: number) {
	gameState.game.chooseTile(row, col);
}

function markTile(row: number, col: number) {
	if (gameState.game.getBoard()[row][col].type === TileType.UNOPENED) {
		gameState.game.flagTile(row, col);
		++numFlags.value;
	} else if (gameState.game.getBoard()[row][col].type === TileType.FLAGGED) {
		gameState.game.unflagTile(row, col);
		--numFlags.value;
	}
}

function reset() {
	stopTimer();
	numFlags.value = 0;
	gameState.game = MinesweeperGame.IntermediateGame();
	startTimer();
}

function startTimer() {
	time.value = 0;
	interval.value = window.setInterval(() => {
		time.value++;
	}, 1000);
}

function stopTimer() {
	if (interval.value !== null) {
		window.clearInterval(interval.value);
		interval.value = null;
	}
}

// Lifecycle hooks
onMounted(() => {
	reset();
});

onBeforeUnmount(() => {
	stopTimer();
});
</script>

<style scoped>
.frame {
	border-left: 4px white solid;
	border-top: 4px white solid;
}
.upper-frame {
	border-left: 2px #808080 solid;
	border-top: 2px #808080 solid;
	border-right: 2px white solid;
	border-bottom: 2px white solid;
}
</style>