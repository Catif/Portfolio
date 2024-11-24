<script setup>
import { computed, inject, onMounted, ref } from "vue"

import FinderWindow from "@/components/Finder/FinderWindow.vue"

const api = inject("api")
const folderActive = ref("")
const categories = ref([
  {
    title: "project.finder.categories.years",
    elements: [],
  },
])
const projectsShow = computed(() => {
  const category = categories.value.find(
    (categoryTemp) => categoryTemp.title === "project.finder.categories.years"
  )
  if (category.elements.length === 0) return []

  if (folderActive.value) {
    const element = category.elements.find(
      (elementTemp) => elementTemp.name === folderActive.value
    )
    return element.projects
  }

  return category.elements[0].projects
})

function getBlogs() {
  api
    .get("/items/project?fields=*,translations.*&sort=-done_at")
    .then((response) => response.data)
    .then((data) => {
      data = data.data

      const category = categories.value.find(
        (categoryTemp) =>
          categoryTemp.title === "project.finder.categories.years"
      )

      data.forEach((project) => {
        const year = String(new Date(project.done_at).getFullYear())
        const element = category.elements.find(
          (elementTemp) => elementTemp.name === year
        )
        if (element) {
          element.projects.push(project)
        } else {
          category.elements.push({
            name: year,
            icon: "/img/folder_mac_outline.png",
            projects: [project],
          })
        }
      })

      setActiveFolder(category.elements[0].name)
    })
}

function setActiveFolder(folder) {
  folderActive.value = folder
}

onMounted(() => {
  getBlogs()
})
</script>

<template>
  <section id="Portofolio">
    <FinderWindow
      :categories="categories"
      :projects="projectsShow"
      :set-active-folder="setActiveFolder"
      :folder-active="folderActive"
    />
  </section>
</template>

<style lang="scss" scoped></style>
