<template>
	<div class="menubar bg-[#ECE9D8] h-[22px] flex select-none text-[13px] relative">
		<div v-for="option in props.menuBarOptions"
			class="option px-[6px] h-full flex items-center"
			:class="{'selected': option.name === openDropdown?.name}"
			@click.stop="event => menuOptionClick(event, option)"
			@mouseenter="event => menuOptionHover(event, option)"
		>
			{{ option.name }}
		</div>
		<div v-if="openDropdown" ref="menuDropdown">
			<MenuDropdown
				:style="{top: dropdownPosition.top, left: dropdownPosition.left}"
				:options="openDropdown?.options ?? []"
				@optionSelected="onOptionSelect"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type MenuBarOption from '@/model/MenuBarOption';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import MenuDropdown from './MenuDropdown.vue';
import { nextTick } from 'vue';

const props = defineProps<{
	menuBarOptions: MenuBarOption[]
}>();

const emit = defineEmits<{
	optionSelected: [option: string]
}>();

let openDropdown = ref<null | MenuBarOption>(null);
const menuDropdown = ref<null | HTMLElement>(null);
const dropdownPosition = ref({ top: '0px', left: '0px' });

async function menuOptionClick(event: MouseEvent, option: MenuBarOption, ignoreSameDropdown = false) {
	const el = event.target as HTMLElement | null;
	if (!el) return;

	if (!ignoreSameDropdown) {
		if (openDropdown.value?.name === option.name) {
			openDropdown.value = null;
			return;
		}
	}

	openDropdown.value = option;
	await nextTick();

	if (!menuDropdown.value) return;
	
	dropdownPosition.value.top = `${el.offsetHeight}px`;
	dropdownPosition.value.left = `${el.offsetLeft}px`;
}

function menuOptionHover(event: MouseEvent, option: MenuBarOption) {
	if (menuDropdown.value) {
		menuOptionClick(event, option, true);
	}
}

function onClickAway(event: MouseEvent) {
	const dropdownEl = menuDropdown.value;
	const targetEl = event.target as HTMLElement | null;
	if (!dropdownEl || !dropdownEl.contains(targetEl)) {
		openDropdown.value = null;
	}
}

function onOptionSelect(option: string) {
	emit("optionSelected", option);
	openDropdown.value = null;
}

onMounted(() => {
	document.addEventListener('click', onClickAway);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', onClickAway);
})

</script>

<style scoped>
.menubar {
	font-family: "Trebuchet MS";
}
.selected {
	background-color: #2A5FC0;
	color: white;
}
/* .option:hover {
	background-color: #bfbdb0;
} */
</style>