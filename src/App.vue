<script setup>
import Navbar from "@/components/Navbar.vue";

import { RouterView } from "vue-router";
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
