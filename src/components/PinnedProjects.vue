<script setup>
import PinnedProject from '@/components/assets/PinnedProject.vue'
</script>

<template>
  <section id="Projects">
    <h2>{{ $t("pinnedProjects.title") }}</h2>
    <div id="list-pinned-projects">
      <PinnedProject v-for="(project, index) in $tm('pinnedProjects.list')" :key="index" :project="project" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
#Projects {
  #list-pinned-projects {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }
}
</style>
