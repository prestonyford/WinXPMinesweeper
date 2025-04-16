<template>
	<img :src="imgSrc">
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	number: number | string
}>();

const imgSrc = computed(() => new URL(`/src/assets/Number${props.number}.png`, import.meta.url).href);

</script>

<style scoped>
img {
	image-rendering: pixelated;
}
</style>