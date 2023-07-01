<script setup>
import Presentation from '@/components/Presentation.vue'
import PinnedProjects from '@/components/PinnedProjects.vue'
import Blog from '@/components/Blog.vue'
</script>

<template>
  <div>
    <Presentation />
    <PinnedProjects />
    <Blog />
  </div>
</template>

<style lang="scss" scoped>
section:nth-child(even) {
  background-color: $color-secondary-background;
}
</style>
