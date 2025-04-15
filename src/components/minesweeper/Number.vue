<template>
	<!-- Yeah. I know. -->
	<img v-if="number === 0" src="../../assets/Number0.png">
	<img v-else-if="number === 1" src="../../assets/Number1.png">
	<img v-else-if="number === 2" src="../../assets/Number2.png">
	<img v-else-if="number === 3" src="../../assets/Number3.png">
	<img v-else-if="number === 4" src="../../assets/Number4.png">
	<img v-else-if="number === 5" src="../../assets/Number5.png">
	<img v-else-if="number === 6" src="../../assets/Number6.png">
	<img v-else-if="number === 7" src="../../assets/Number7.png">
	<img v-else-if="number === 8" src="../../assets/Number8.png">
	<img v-else src="../../assets/Number9.png">
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		number: {
			required: true,
			validator(value: number) {
				return value >= 0 && value <= 9;
			},
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