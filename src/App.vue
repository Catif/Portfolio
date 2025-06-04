<script setup>
import mitt from "mitt"
import JSConfetti from "js-confetti"
import axios from "axios"
import Footer from "@/components/Footer.vue"
import Navbar from "@/components/Navbar/Navbar.vue"

const bus = mitt()
const confetti = new JSConfetti()
const api = axios.create({
  baseURL: "https://api.catif.dev",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  cors: true,
})

provide("bus", bus)
provide("confetti", confetti)
provide("api", api)

const firstLoad = ref(false)

onMounted(() => {
  setTimeout(() => {
    firstLoad.value = true
  }, 200)
})
</script>

<template>
  <header id="nav">
    <Navbar />
  </header>

  <template v-if="firstLoad">
    <article>
      <RouterView v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </article>

    <Footer />
  </template>
</template>
