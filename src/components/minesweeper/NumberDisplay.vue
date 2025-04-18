<template>
	<div class="numbers bg-black flex pointer-events-none select-none">
		<Number :number="digits[0]" />
		<Number :number="digits[1]" />
		<Number :number="digits[2]" />
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
			required: true
		}
	},
	computed: {
		digits: function(): String {
			const num = Math.min(999, Math.max(-99, this.number as number));
			const numStr: String = num.toString().padStart(3, '0');
			return numStr;
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
	/* width: 59px; */
	/* height: 42px; */
	padding: 1px;
	gap: 2px;
}

img {
	image-rendering: pixelated;
}
</style>