<script setup lang="ts">
import XPBackground from './components/XPBackground.vue'
import XPWindow from './components/XPWindow.vue'
</script>

<template>
	<header>
		
	</header>

	<main>
		<XPBackground>
			<XPWindow title="Minesweeper">
				<template #icon>
					<img src="./assets/Minesweeper.png"/>
				</template>
				<!-- <div>Hello, world!</div> -->
			</XPWindow>
		</XPBackground>
	</main>
</template>

<style scoped>

</style>
