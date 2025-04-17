<template>
	<XPWindow title="Minesweeper" showMenuBar :menuBarOptions="menuBarOptions" @optionSelected="onOptionSelect">
		<template #icon>
			<img src="../assets/Minesweeper.png"/>
		</template>
		<Minesweeper />
	</XPWindow>
</template>

<script setup lang="ts">
import type MenuBarOptions from '../model/MenuBarOption';
import XPWindow from './xp/XPWindow.vue';
import Minesweeper from './minesweeper/Minesweeper.vue';

const menuBarOptions: MenuBarOptions[] = [
	{
		name: "Game",
		options: [
			"New",
			"Beginner",
			"Intermediate",
			"Expert",
			"Custom..."
		]
	},
	{
		name: "Help",
		options: [
			"TODO"
		]
	}
];

function onOptionSelect(option: string) {
	console.log(option);
}


</script>
