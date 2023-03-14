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
.page-transition-slide-right-enter-active,
.page-transition-slide-right-leave-active,
.page-transition-slide-left-enter-active,
.page-transition-slide-left-leave-active {
	position: absolute;
	transition: all 10s ease-in;
}

.page-transition-slide-right-enter-from,
.page-transition-slide-left-leave-to,
.page-transition-slide-left-enter-from,
.page-transition-slide-right-leave-to {
	opacity: 0;
}
</style>
