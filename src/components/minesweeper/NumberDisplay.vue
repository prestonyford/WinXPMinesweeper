<template>
	<div class="numbers bg-black flex">
		<Number :number="0" />
		<Number :number="0" />
		<Number :number="0" />
	</div>
</template>

<script setup lang="ts">
import Number from './Number.vue';
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	data() {
		return {

		}
	},
})
</script>

<style scoped>
.numbers {
	border-top: 1px #808080 solid;
	border-left: 1px #808080 solid;
	border-right: 1px white solid;
	border-bottom: 1px white solid;
	width: 38px;
	height: 23px;
	padding: 1px;
	gap: 2px;
}
img {
	image-rendering: pixelated;
}
</style>