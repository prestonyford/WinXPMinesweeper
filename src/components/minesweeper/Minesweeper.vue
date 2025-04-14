<template>
	<div class="h-full flex flex-col">
		<div class="bg-[#ECE9D8] h-[19px]">

		</div>
		<div class="frame grow">
			<div class="bg-[#C0C0C0] h-full flex flex-col p-[6px]">
				<div class="upper-frame h-[37px] flex justify-around items-center">
					<NumberDisplay />
					<button class="h-[26px] w-[26px] flex items-center justify-center"><img src="../../assets/smile.png"></button>
					<NumberDisplay />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import NumberDisplay from './NumberDisplay.vue';
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {

		}
	},
})
</script>

<style scoped>
.frame {
	border-left: 4px white solid;
	border-top: 4px white solid;
	/* box-shadow: -3px -3px white; */
}
.upper-frame {
	box-shadow: inset 2px 2px #808080, inset -2px -2px white;
}
.upper-frame button {
	border: 1px #808080 solid;
	box-shadow: inset 2px 2px white, inset -2px -2px #808080;
	image-rendering: pixelated;
	border-radius: 0px;
	border-top-right-radius: 0px;
}
</style>