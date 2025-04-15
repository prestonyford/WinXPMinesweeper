<template>
	<img :src="`/src/assets/Number${number}.png`">
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		number: {
			required: true
		}
	},
	data() {
		return {

		}
	},
})
</script>

<style scoped>
img {
	image-rendering: pixelated;
}
</style>