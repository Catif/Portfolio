<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

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

	<article>
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</article>

	<Footer />
</template>

<style lang="scss">
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/basic.scss";

/* Animation de transition de page */
@import "@/assets/scss/animation/fade.scss";

/* temp */
</style>
