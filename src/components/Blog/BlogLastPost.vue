<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import BlogCard from './BlogCard.vue'


const route = useRoute()
const blogs = reactive({
  fr: [],
  en: [],
})
const lang = computed(() => route.params.lang ? route.params.lang : 'fr')



function getBlogs() {
  axios.get('https://api.catif.dev/items/blog_translations?sort=-blog_id&limit=3')
    .then(response => response.data)
    .then((data) => {
      data = data.data
      blogs.fr = data.filter(blog => blog.languages_id === 'fr-FR')
      blogs.en = data.filter(blog => blog.languages_id === 'en-US')

      // Set french version if no translation in english
      blogs.en.forEach((blog) => {
        if (!blog.title) {
          blog = blogs.fr.find(frBlog => frBlog.blog_id === blog.blog_id)
          blog.onlyFr = true
        }
      })
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
      <template v-for="blog in blogs[lang]" :key="blog.blog_id">
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
