<template>
	<div class="numbers bg-black flex pointer-events-none select-none">
		<Number :number="parseInt(digits[0])" />
		<Number :number="parseInt(digits[1])" />
		<Number :number="parseInt(digits[2])" />
	</div>
</template>

<script setup lang="ts">
import Number from './Number.vue';
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
	props: {
		number: {
			required: true,
			validator(value: number) {
				return value >= 0 && value <= 999;
			},
		}
	},
	computed: {
		digits: function(): String {
			const num: String = this.number.toString().padStart(3, '0');
			return num;
		}
	}
})
</script>

<style scoped>
.numbers {
	border-top: 1px #808080 solid;
	border-left: 1px #808080 solid;
	border-right: 1px white solid;
	border-bottom: 1px white solid;
	width: 40px;
	height: 24px;
	padding: 1px;
	gap: 2px;
}

img {
	image-rendering: pixelated;
}
</style>