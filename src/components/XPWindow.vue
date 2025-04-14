<template>
	<div class="window absolute flex flex-col" style="width: 500px; height: 400px;" ref="window">
		<div class="chrome w-full flex gap-1" @mousedown="startDrag">
			<div class="icon pointer-events-none flex items-center h-full p-0.5">
				<slot name="icon"></slot>
			</div>
			<div class="text-white pointer-events-none select-none">{{ title }}</div>
		</div>
		<div class="content grow">
			<div class="h-full">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		title: String,
		required: true
	},
	data() {
		return {
			isDragging: false,
			offsetX: 0,
			offsetY: 0,
		};
	},
	methods: {
		startDrag(event: MouseEvent) {
			const windowElement = this.$refs.window as HTMLElement;
			if (!windowElement) return;

			this.isDragging = true;
			this.offsetX = event.clientX - windowElement.offsetLeft;
			this.offsetY = event.clientY - windowElement.offsetTop;
		},
		onDrag(event: MouseEvent) {
			if (!this.isDragging) return;

			const windowElement = this.$refs.window as HTMLElement;
			if (!windowElement) return;

			const newX = event.clientX - this.offsetX;
			const newY = event.clientY - this.offsetY;

			windowElement.style.left = `${newX}px`;
			windowElement.style.top = `${newY}px`;
		},
		stopDrag() {
			this.isDragging = false;
		},
	},
	mounted() {
		document.addEventListener('mousemove', this.onDrag);
		document.addEventListener('mouseup', this.stopDrag);
	},
	beforeUnmount() {
		document.removeEventListener('mousemove', this.onDrag);
		document.removeEventListener('mouseup', this.stopDrag);
	},
})
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