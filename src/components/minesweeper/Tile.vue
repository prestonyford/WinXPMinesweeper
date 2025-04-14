<template>
	<div class="tile">
		
	</div>
</template>

<script setup lang="ts">
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data() {

	}
})
</script>

<style scoped>
.tile {
	width: 24px;
	height: 24px;
	border-left: 2px white solid;
	border-top: 2px white solid;
	border-right: 2px #808080 solid;
	border-bottom: 2px #808080 solid;
}
.tile > * {
}
</style>