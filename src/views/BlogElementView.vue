<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Markdown from '../components/assets/Markdown.vue'

const route = useRoute()
const router = useRouter()
const post = reactive({
  fr: {},
  en: {},
})
const lang = computed(() => route.params.lang ? route.params.lang : 'fr')
const state = ref('loading')
const contentMarkdown = computed(() => post[lang.value].content)
const timeToRead = computed(() => {
  let wordsPerMinute

  // src : https://resources.wolframcloud.com/FunctionRepository/resources/TimeToRead/
  switch (lang.value) {
    case 'en':
      wordsPerMinute = 238
      break
    case 'fr':
      wordsPerMinute = 195
      break
    default:
      wordsPerMinute = 200
      break
  }

  const numberOfWords = post[lang.value].content.split(/\s/g).length
  const minutes = numberOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return readTime
})
const created_at = computed(() => {
  const date = new Date(post[lang.value].created_at)
  return date.toLocaleDateString(lang.value, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
})
const updated_at = computed(() => {
  const date = new Date(post[lang.value].updated_at)
  return date.toLocaleDateString(lang.value, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
})

function getPost(id) {
  axios.get(`https://api.catif.dev/items/blog_translations?filter[blog_id]=${id}`)
    .then(response => response.data)
    .then((data) => {
      data = data.data

      // Not found
      if (data.length === 0) {
        state.value = 'not-found'

        setTimeout(() => {
          if (route.name === 'blog-element' && route.params.id_blog === id)
            router.push({ name: 'blog', params: { lang: lang.value } })
        }, 2000)

        return
      }

      state.value = 'loaded'

      // Found
      post.fr = data.filter(blog => blog.languages_id === 'fr-FR')[0]
      post.en = data.filter(blog => blog.languages_id === 'en-US')[0]

      // Set french version if no translation in english
      if (!post.en.title && !post.en.description && !post.en.content && !post.en.tags) {
        post.en = {
          ...post.fr,
        }
      }
    })
}

onMounted(() => {
  const id = route.params.id_blog

  if (!id)
    router.push({ name: 'blog', params: { lang: lang.value } })

  getPost(id)
})
</script>



<template>
  <section id="Post">
    <!-- LOADING -->
    <template v-if="state === 'loading'">
      <div class="loading">
        <div class="loading__text">
          {{ $t('divers.loading') }}
        </div>
      </div>
    </template>


    <!-- NOT FOUND -->
    <template v-else-if="state === 'not-found'">
      <div class="not-found">
        <div class="not-found__text">
          {{ $t('blog.post-not-found') }}
        </div>
      </div>
    </template>


    <!-- LOADED -->
    <template v-else>
      <article class="Post">
        <div class="Post_header">
          <h1 class="Post__header__title">
            {{ post[lang].title }}
            <span class="timeToRead">
              {{ timeToRead }} {{ $t('blog.minutes-read') }}
            </span>
          </h1>
          <div class="Post__header__dates">
            <span class="created">
              {{ $t('blog.created-at') }} {{ created_at }}
            </span>
            <span v-if="updated_at !== created_at" class="updated">
              {{ $t('blog.updated-at') }} {{ updated_at }}
            </span>
          </div>
        </div>
        <Markdown class="Post__content" :markdown="contentMarkdown" />
      </article>
    </template>
  </section>
</template>



<style lang="scss">
.Post {
  display: flex;
  flex-direction: column;
  gap: 3rem;

  width: 100%;
  max-width: 900px;

  &__header {
    &__title {
      font-size: 3rem;
      font-weight: 700;

      .timeToRead {
        display: inline;
        font-size: 1rem;
        font-weight: 500;
        color: $color-font;
        opacity: 0.7;
        text-decoration: underline;
        text-underline-offset: 0.2rem;
      }
    }

    &__dates {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 1rem;
      font-size: 1rem;
      font-weight: 500;
      color: $color-font;
      opacity: 0.7;
    }
  }

}
</style>
