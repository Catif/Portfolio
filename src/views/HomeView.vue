<script setup>
import BlogLastPost from '../components/Blog/BlogLastPost.vue'
import Presentation from '@/components/Presentation.vue'
import PinnedProjects from '@/components/Project/PinnedProjects.vue'
</script>

<template>
  <div>
    <Presentation />
    <PinnedProjects />
    <BlogLastPost />
  </div>
</template>

<style lang="scss" scoped>
section:nth-child(even) {
  background-color: v.$color-secondary-background;
}
</style>
