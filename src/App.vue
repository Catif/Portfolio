<script setup>
import { provide } from 'vue'
import { RouterView } from 'vue-router'
import mitt from 'mitt'
import JSConfetti from 'js-confetti'
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'

const bus = mitt()
const confetti = new JSConfetti()

provide('bus', bus)
provide('confetti', confetti)
</script>

<template>
  <header>
    <Navbar />
  </header>

  <article>
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
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
