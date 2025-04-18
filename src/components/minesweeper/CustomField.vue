<template>
	<div class="customField select-none bg-[#ECE9D8] flex items-center">
		<div class="flex justify-around w-full">
			<div class="grid grid-cols-2 gap-x-3 gap-y-1 text-[14px]">
				<label for="height">Height:</label>
				<input id="height" type="number" min="1" v-model="height" @input="sanitizeInput($event, 'height')" />
				<label for="width">Width:</label>
				<input id="width" type="number" min="1" v-model="width" @input="sanitizeInput($event, 'width')" />
				<label for="mines">Mines:</label>
				<input id="mines" type="number" v-model="mines" @input="sanitizeInput($event, 'mines')" />
			</div>
			<div class="flex flex-col justify-between">
				<button @click="emit('save', height, width, mines)">OK</button>
				<button @click="emit('close')">Cancel</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let height = ref(9);
let width = ref(9);
let mines = ref(10);

const emit = defineEmits<{
	close: [],
	save: [height: number, width: number, mines: number]
}>();

function sanitizeInput(event: Event, field: 'height' | 'width' | 'mines') {
	const input = event.target as HTMLInputElement;
	let value = input.value;

	// Remove non-numeric characters
	value = value.replace(/[^0-9]/g, '');

	// Update the corresponding field
	if (field === 'height') {
		height.value = value ? Math.max(parseInt(value, 10), 1) : 1;
	} else if (field === 'width') {
		width.value = value ? Math.max(parseInt(value, 10), 1) : 1;
	} else if (field === 'mines') {
		const maxMines = height.value * width.value - 1;
		mines.value = value ? Math.min(parseInt(value, 10), maxMines) : maxMines;
	}
	
	input.value = value;
}
</script>

<style scoped>
.customField {
	width: 240px;
	height: 160px;
}

input {
	width: 50px;
	height: 23px;
	padding: 3px 4px;
	border: 1px solid #7f9db9;
	background-color: #fff;
	box-sizing: border-box;
	appearance: none;
	-moz-appearance: textfield;
	border-radius: 0;
	line-height: 2;
}

button {
	min-width: 60px;
	min-height: 26px;
	padding: 0 12px;
	font-size: 14px;
	box-sizing: border-box;
	border: 1px solid #003c74;
	background: linear-gradient(180deg,
			rgba(255, 255, 255, 1) 0%,
			rgba(236, 235, 229, 1) 86%,
			rgba(216, 208, 196, 1) 100%);
	box-shadow: none;
	border-radius: 3px;
}

button:not(:disabled):active,
button:not(:disabled).active {
	box-shadow: none;
	background: linear-gradient(180deg,
			rgba(205, 202, 195, 1) 0%,
			rgba(227, 227, 219, 1) 8%,
			rgba(229, 229, 222, 1) 94%,
			rgba(242, 242, 241, 1) 100%);
}

button:not(:disabled):hover {
	box-shadow: inset -1px 1px #fff0cf, inset 1px 2px #fdd889, inset -2px 2px #fbc761, inset 2px -2px #e5a01a;
}

button:focus,
button.focused {
	box-shadow: inset -1px 1px #cee7ff, inset 1px 2px #98b8ea, inset -2px 2px #bcd4f6, inset 1px -1px #89ade4,
		inset 2px -2px #89ade4;
}

button::-moz-focus-inner {
	border: 0;
}
</style>