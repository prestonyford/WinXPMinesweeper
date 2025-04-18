<template>
	<div class="button">
		<button class="p-[2px] flex items-center justify-center">
			<img width="17px" height="17px" v-if="props.face === ButtonFace.SURPRISE" src="../../assets/Surprise.png">
			<img width="17px" height="17px" v-else-if="props.face === ButtonFace.DEAD" src="../../assets/Dead.png">
			<img width="17px" height="17px" v-else-if="props.face === ButtonFace.COOL" src="../../assets/Cool.png">
			<img width="17px" height="17px" v-else src="../../assets/Smile.png">
		</button>
	</div>
</template>

<script setup lang="ts">
import { ButtonFace } from '../../model/ButtonFace';

const props = defineProps<{
	face: ButtonFace
}>();

</script>

<style scoped>
.button {
	border: 1px #808080 solid;
}
button {
	border-left: 2px white solid;
	border-top: 2px white solid;
	border-right: 2px #808080 solid;
	border-bottom: 2px #808080 solid;
	image-rendering: pixelated;
}
button:active {
	background-color: #adadad;
	border-left: 2px #808080 solid;
	border-top: 2px #808080 solid;
	border-right: 2px #adadad solid;
	border-bottom: 2px #adadad solid;
}
img {
	pointer-events: none;
	position: relative;
}
button:active img {
	top: 1px;
	left: 1px;
}
</style>