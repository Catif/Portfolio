<script setup>
import { inject, onMounted, ref } from "vue"

import BlogCard from "@/components/Blog/BlogCard.vue"

const api = inject("api")
const blogs = ref([])

function getBlogs() {
  api
    .get("/items/blog?fields=*,translations.*&sort=-id")
    .then((response) => response.data)
    .then((data) => {
      data = data.data

      blogs.value = data
    })
}

onMounted(() => {
  getBlogs()
})
</script>

<template>
  <section id="Blog">
    <h2>{{ $t("blog.title") }}</h2>
    <div class="list-blog">
      <template v-for="blog in blogs" :key="blog.blog_id">
        <BlogCard :blog="blog" />
      </template>
    </div>
  </section>
</template>

<style lang="scss">
#Blog {
  .list-blog {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    width: 100%;
    max-width: 700px;
  }
}
</style>
