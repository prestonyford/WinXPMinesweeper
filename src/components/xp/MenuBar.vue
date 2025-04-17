<template>
	<div class="menubar bg-[#ECE9D8] h-[19px] flex select-none text-[13px] pl-[4px] relative">
		<div v-for="option in props.menuBarOptions"
			class="option px-[6px]"
			@click="event => menuOptionClick(event, option)"
		>
			{{ option.name }}
		</div>
		<MenuDropdown v-if="openDropdown" ref="menuDropdown" :style="{top: dropdownPosition.top, left: dropdownPosition.left}" />
	</div>
</template>

<script setup lang="ts">
import type MenuBarOption from '@/model/MenuBarOption';
import { ref } from 'vue';
import MenuDropdown from './MenuDropdown.vue';
import { nextTick } from 'vue';

const props = defineProps<{
	menuBarOptions: MenuBarOption[]
}>();

let openDropdown = ref<null | MenuBarOption>(null);
const menuDropdown = ref<null | HTMLElement>(null);
const dropdownPosition = ref({ top: '0px', left: '0px' });

async function menuOptionClick(event: MouseEvent, option: MenuBarOption) {
	const el = event.target as HTMLElement | null;
	if (!el) return;

	openDropdown.value = option;
	await nextTick();

	if (!menuDropdown.value) return;
	
	dropdownPosition.value.top = `${el.offsetHeight}px`;
	dropdownPosition.value.left = `${el.offsetLeft}px`;
}

</script>

<style scoped>
.menubar {
	font-family: "Trebuchet MS";
}
.option:hover {
	background-color: #bfbdb0;
}
</style>