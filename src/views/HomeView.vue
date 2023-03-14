<script setup>
import Presentation from "@/components/Presentation.vue";
import PinnedProjects from "@/components/PinnedProjects.vue";
import Blog from "@/components/Blog.vue";
import Contact from "@/components/Contact.vue";
</script>

<template>
	<article>
		<Presentation />
		<PinnedProjects />
		<Blog />
		<Contact />
	</article>
</template>

<style lang="scss">
article {
	padding-bottom: 500px;
}
</style>
