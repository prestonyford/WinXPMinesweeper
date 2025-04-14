<template>
	<!-- <img class="w-screen h-screen object-cover pointer-events-none absolute -z-10" src="../assets/xp.png" /> -->
	<div class="xp w-screen h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		
	}
})
</script>

<style scoped>
.xp {
	background-image: url("../assets/xp.png");
}
</style>