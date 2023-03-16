<script setup>
import Presentation from "@/components/Presentation.vue";
import PinnedProjects from "@/components/PinnedProjects.vue";
import Blog from "@/components/Blog.vue";
import Contact from "@/components/Contact.vue";
</script>

<template>
	<div>
		<Presentation />
		<PinnedProjects />
		<Blog />
		<Contact />
	</div>
</template>

<style lang="scss" scoped>
section:nth-child(even) {
	background-color: $color-secondary-background;
}
</style>
