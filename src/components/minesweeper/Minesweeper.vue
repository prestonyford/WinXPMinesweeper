<template>
	<div class="h-full flex flex-col select-none">
		<div class="frame">
			<div class="bg-[#C0C0C0] h-full flex flex-col p-[6px] gap-[6px]">
				<div class="upper-frame h-[46px] flex justify-between items-center p-[4px]">
					<NumberDisplay :number="gameState.game.getNumBombs() - gameState.game.getNumFlags()" />
					<MinesweeperButton @click="reset" :face="currentButtonFace" />
					<NumberDisplay :number="time" />
				</div>
				<div>
					<GameBoard
						:board="gameState.game.getBoard()"
						:allowClicks="gameInProgress"
						@selectTile="selectTile"
						@markTile="markTile"
						@tileMouseDown="tileMouseDown"
						@tileMouseUp="tileMouseUp"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue';
import NumberDisplay from './NumberDisplay.vue';
import GameBoard from './GameBoard.vue';
import MinesweeperButton from './MinesweeperButton.vue';
import MinesweeperGame from '../../model/MinesweeperGame';
import { TileType, type Tile } from '../../model/TileType';
import { ButtonFace } from '../../model/ButtonFace';

const time = ref(0);
const interval = ref<number | null>(null);
const gameInProgress = ref(true);
const currentButtonFace = ref(ButtonFace.SMILE);

const gameState = reactive({
	game: MinesweeperGame.BeginnerGame(onGameLost, onGameWon)
});

function selectTile(row: number, col: number) {
	if (gameInProgress.value) {
		gameState.game.chooseTile(row, col);
	}
}

function markTile(row: number, col: number) {
	if (gameInProgress.value) {
		if (gameState.game.getBoard()[row][col].type === TileType.UNOPENED) {
			gameState.game.flagTile(row, col);
		} else if (gameState.game.getBoard()[row][col].type === TileType.FLAGGED) {
			gameState.game.unflagTile(row, col);
		}
	}
}

function tileMouseDown(event: MouseEvent, tile: Tile) {
	// Left click
	if (
		event.button === 0
		&& currentButtonFace.value === ButtonFace.SMILE
		&& tile.type === TileType.UNOPENED
	) {
		currentButtonFace.value = ButtonFace.SURPRISE;
	}
}

function tileMouseUp() {
	if (currentButtonFace.value === ButtonFace.SURPRISE) {
		currentButtonFace.value = ButtonFace.SMILE;
	}
}

function reset() {
	stopTimer();
	gameInProgress.value = true;
	currentButtonFace.value = ButtonFace.SMILE;
	gameState.game = MinesweeperGame.HardGame(onGameLost, onGameWon);
	startTimer();
}

function onGameLost() {
	gameInProgress.value = false;
	currentButtonFace.value = ButtonFace.DEAD;
	stopTimer();
}

function onGameWon() {
	gameInProgress.value = false;
	currentButtonFace.value = ButtonFace.COOL;
	stopTimer();
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