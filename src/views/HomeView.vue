<script setup>
import Presentation from "@/components/Presentation/index.vue"
import PinnedProjects from "@/components/Project/PinnedProjects.vue"
</script>

<template>
  <div>
    <Presentation />
    <PinnedProjects />
  </div>
</template>

<style lang="scss" scoped>
section:nth-child(even) {
  background-color: v.$color-secondary-background;
}
</style>
