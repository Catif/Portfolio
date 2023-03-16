<script setup>
import Navbar from "@/components/Navbar.vue";

import { provide } from "vue";
import { RouterView } from "vue-router";
import JSConfetti from "js-confetti";

const confetti = new JSConfetti();
provide("confetti", confetti);
</script>

<template>
	<header>
		<Navbar />
	</header>

	<router-view v-slot="{ Component, route }">
		<transition :name="route.meta.transition">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<style lang="scss">
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/basic.scss";

/* Animation de transition de page */
@import "@/assets/scss/animation/slide-left.scss";
@import "@/assets/scss/animation/slide-right.scss";
@import "@/assets/scss/animation/fade.scss";
</style>
