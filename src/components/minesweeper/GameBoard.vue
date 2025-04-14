<template>
	<div class="board flex">
		<div v-for="_ in new Array(rows!)" >
			<Tile v-for="_ in new Array(cols)" />
		</div>
	</div>
</template>

<script setup lang="ts">
import Tile from './Tile.vue';
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		rows: Number,
		cols: Number
	},
	data() {

	},
	computed: {
		grid() {
			return "grid-template-columns: repeat(9, auto);";
		}
	}
})
</script>

<style scoped>
.board {
	border-left: 4px #808080 solid;
	border-top: 4px #808080 solid;
	border-right: 4px white solid;
	border-bottom: 4px white solid;
}
</style>