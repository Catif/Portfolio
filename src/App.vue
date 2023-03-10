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

	<div class="container">
		<RouterView />
	</div>
</template>

<style lang="scss">
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/basic.scss";
</style>
