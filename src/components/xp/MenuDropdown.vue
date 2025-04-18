<template>
	<div class="dropdown z-10 absolute flex flex-col py-[2px]">
		<div v-for="option in options" class="px-[6px] py-[2px]" @click="onOptionSelect(option)">
			{{ option }}
		</div>
	</div>
</template>

<script setup lang="ts">
import type MenuBarOption from '../../model/MenuBarOption';

const props = defineProps<{
	options: string[]
}>();

const emit = defineEmits<{
	optionSelected: [option: string]
}>();

function onOptionSelect(option: string) {
	emit("optionSelected", option);
}

</script>

<style scoped>
.dropdown {
	width: 150px;
	background-color: white;
	border: 1px #A0A197 solid;
}
.dropdown div:active {
	background-color: #2A5FC0;
	color: white;
}
</style>