<script setup>
import Presentation from "@/components/Presentation.vue";
import PinnedProjects from "@/components/PinnedProjects.vue";
</script>

<template>
	<main>
		<Presentation />
		<PinnedProjects />
	</main>
</template>

<style lang="scss">
main {
	display: flex;
	gap: 80px;
	padding-top: 50px;
}
</style>
