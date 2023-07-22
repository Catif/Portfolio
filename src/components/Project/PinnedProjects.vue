<script setup>
import { inject, onMounted, ref } from 'vue'
import PinnedProjectElement from '@/components/Project/PinnedProjectElement.vue'

const api = inject('api')
const projects = ref([])


function getProjects() {
  api.get('/items/project?fields=*,translations.*&sort=-id')
    .then(response => response.data)
    .then((data) => {
      data = data.data

      projects.value = data
    })
}

onMounted(() => {
  getProjects()
})
</script>

<template>
  <section id="Projects">
    <h2>{{ $t("pinnedProjects.title") }}</h2>
    <div id="list-pinned-projects">
      <PinnedProjectElement v-for="project in projects" :key="project.id" :project="project" />
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
