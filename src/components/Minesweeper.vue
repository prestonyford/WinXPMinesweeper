<template>
	<XPWindow title="Minesweeper" showMenuBar :menuBarOptions="menuBarOptions" @optionSelected="onOptionSelect">
		<template #icon>
			<img src="../assets/Minesweeper.png"/>
		</template>
		<div class="h-full flex flex-col select-none">
			<div class="frame">
				<div class="bg-[#C0C0C0] h-full flex flex-col p-[6px] gap-[6px]">
					<div class="upper-frame flex justify-between items-center p-[4px]">
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
	</XPWindow>

	<XPWindow v-if="showCustomFieldPopup" title="Custom Field">
		<template #icon>
			<img src="../assets/14.ico"/>
		</template>
		<CustomField
			@close="showCustomFieldPopup = false"
			@save="createCustomField"
		/>
	</XPWindow>
</template>

<script setup lang="ts">
import type MenuBarOptions from '../model/MenuBarOption';
import XPWindow from './xp/XPWindow.vue';
import MinesweeperGame from '@/model/MinesweeperGame';
import { ButtonFace } from '@/model/ButtonFace';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { TileType, type Tile } from '@/model/TileType';
import NumberDisplay from './minesweeper/NumberDisplay.vue';
import GameBoard from './minesweeper/GameBoard.vue';
import MinesweeperButton from './minesweeper/MinesweeperButton.vue';
import CustomField from './minesweeper/CustomField.vue';

let gameMaker = () => MinesweeperGame.BeginnerGame(onGameLost, onGameWon);

// Reactive state
const gameState = reactive({
	game: gameMaker()
})
const time = ref(0);
const interval = ref<number | null>(null);
const gameInProgress = ref(true);
const currentButtonFace = ref(ButtonFace.SMILE);
const showCustomFieldPopup = ref(false);

// Other
const gameOptions = {
	NEW: "New", BEGINNER: "Beginner", INTERMEDIATE: "Intermediate", EXPERT: "Expert", CUSTOM: "Custom..."
}
const menuBarOptions: MenuBarOptions[] = [
	{
		name: "Game",
		options: Object.values(gameOptions)
	},
	{
		name: "Help",
		options: [
			"TODO"
		]
	}
];

// Methods
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
	gameState.game = gameMaker()
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

function onOptionSelect(option: string) {
	switch (option) {
		case gameOptions.NEW:
			break
		case gameOptions.BEGINNER:
			gameMaker = () => MinesweeperGame.BeginnerGame(onGameLost, onGameWon);
			break;
		case gameOptions.INTERMEDIATE:
			gameMaker = () => MinesweeperGame.IntermediateGame(onGameLost, onGameWon);
			break;
		case gameOptions.EXPERT:
			gameMaker = () => MinesweeperGame.HardGame(onGameLost, onGameWon);
			break;
		case gameOptions.CUSTOM:
			showCustomFieldPopup.value = true;
			break;
	}
	reset();
}

function createCustomField(height: number, width: number, mines: number) {
	gameMaker = () => new MinesweeperGame(height, width, mines, onGameLost, onGameWon);
	reset();
	showCustomFieldPopup.value = false;
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