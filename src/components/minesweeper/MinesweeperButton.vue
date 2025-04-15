<template>
	<div class="button">
		<button class="h-[28px] w-[28px] flex items-center justify-center">
			<img class="pointer-events-none relative" src="../../assets/smile.png">
		</button>
	</div>
</template>

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
button:active img {
	top: 1px;
	left: 1px;
}
</style>