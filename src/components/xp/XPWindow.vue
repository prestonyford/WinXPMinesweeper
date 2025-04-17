<template>
	<div class="window absolute flex flex-col max-w-screen max-h-screen"  ref="windowElement">
		<div class="chrome w-full flex gap-1" @mousedown="startDrag">
			<div class="icon pointer-events-none select-none flex items-center h-full p-0.5">
				<slot name="icon"></slot>
			</div>
			<div class="text-white pointer-events-none select-none">{{ title }}</div>
		</div>
		<div class="content" :style="windowStyle">
			<MenuBar v-if="showMenuBar" :menuBarOptions="menuBarOptions" />
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import type MenuBarOption from '@/model/MenuBarOption';
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import MenuBar from './MenuBar.vue';


const props = withDefaults(
	defineProps<{
		title: string,
		startingContentWidth?: string,
		startingContentHeight?: string,
		showMenuBar?: boolean,
		menuBarOptions?: MenuBarOption[]
	}>(),
	{
		startingContentWidth: 'auto',
		startingContentHeight: 'auto',
		showMenuBar: false,
		menuBarOptions: () => []
	}
);

const isDragging = ref(false);
const offsetX = ref(0);
const offsetY = ref(0);
const windowElement = ref<HTMLElement | null>();

const windowStyle = computed(() => `width: ${props.startingContentWidth}; height: ${props.startingContentHeight};`);

function startDrag(event: MouseEvent) {
	if (!windowElement.value) return;

	isDragging.value = true;
	offsetX.value = Math.max(0, event.clientX - windowElement.value.offsetLeft);
	offsetY.value = event.clientY - windowElement.value.offsetTop;
}

function onDrag(event: MouseEvent) {
	if (!isDragging.value) return;

	if (!windowElement.value) return;

	const windowWidth = windowElement.value.offsetWidth;
	const windowHeight = windowElement.value.offsetHeight;
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;


	let newX = event.clientX - offsetX.value;
	let newY = event.clientY - offsetY.value;

	newX = Math.max(0, Math.min(newX, viewportWidth - windowWidth));
	newY = Math.max(0, Math.min(newY, viewportHeight - windowHeight));

	windowElement.value!.style.left = `${newX}px`;
	windowElement.value!.style.top = `${newY}px`;
}

function stopDrag() {
	isDragging.value = false;
}

function center() {
	if (!windowElement.value) return;

	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;

	const windowWidth = windowElement.value.offsetWidth;
	const windowHeight = windowElement.value.offsetHeight;

	const newX = (viewportWidth - windowWidth) / 2;
	let newY = (viewportHeight - windowHeight) / 2;

	newY *= .8; // Slightly higher than center cause it looks better

	windowElement.value.style.left = `${newX}px`;
	windowElement.value.style.top = `${newY}px`;
}

function menuOptionClick(option: MenuBarOption) {

}

onMounted(() => {
	window.addEventListener('mousemove', onDrag);
	window.addEventListener('mouseup', stopDrag);
	nextTick(center);
});

onBeforeUnmount(() => {
	window.removeEventListener('mousemove', onDrag);
	window.removeEventListener('mouseup', stopDrag);
});

</script>

<style scoped>
.window {
	box-shadow: inset -1px -1px #00138c, inset 1px 1px #0831d9, inset -2px -2px #001ea0, inset 2px 2px #166aee, inset -3px -3px #003bda, inset 3px 3px #0855dd;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	padding: 0 0 3px 0;
	-webkit-font-smoothing: antialiased;
}

.chrome {
	height: 28px;
	font-family: "Trebuchet MS";
	background: linear-gradient(180deg,
			rgba(9, 151, 255, 1) 0%,
			rgba(0, 83, 238, 1) 8%,
			rgba(0, 80, 238, 1) 40%,
			rgba(0, 102, 255, 1) 88%,
			rgba(0, 102, 255, 1) 93%,
			rgba(0, 91, 255, 1) 95%,
			rgba(0, 61, 215, 1) 96%,
			rgba(0, 61, 215, 1) 100%);
	padding: 3px 5px 3px 3px;
	border-top: 1px solid #0831d9;
	border-left: 1px solid #0831d9;
	border-right: 1px solid #001ea0;
	border-top-left-radius: 8px;
	border-top-right-radius: 7px;
	font-size: 13px;
	text-shadow: 1px 1px #0f1089;
}

.content {
	background-color: #E3E3E3;
	margin: 0 3px 0 3px;
}

.icon>* {
	height: 100%;
	width: auto;
}
</style>