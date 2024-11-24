<script setup>
import { computed, inject, onMounted, reactive, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import Markdown from "../components/assets/Markdown.vue"

const route = useRoute()
const router = useRouter()
const api = inject("api")
const post = reactive({
  id: null,
  published_at: null,
  updated_at: null,
  fr: {
    title: null,
    description: null,
    content: null,
    tags: null,
  },
  en: {
    title: null,
    description: null,
    content: null,
    tags: null,
  },
})
const lang = computed(() => (route.params.lang ? route.params.lang : "fr"))
const state = ref("loading")
const contentMarkdown = computed(() => post[lang.value].content)
const timeToRead = computed(() => {
  let wordsPerMinute

  // src : https://resources.wolframcloud.com/FunctionRepository/resources/TimeToRead/
  switch (lang.value) {
    case "en":
      wordsPerMinute = 238
      break
    case "fr":
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
const published_at = computed(() => {
  const date = new Date(post.published_at)
  return date.toLocaleDateString(lang.value, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
})
const updated_at = computed(() => {
  const date = new Date(post.updated_at)
  return date.toLocaleDateString(lang.value, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
})

function getPost(id) {
  return api
    .get(`/items/blog/${id}?fields=*,translations.*`)
    .then((response) => response.data)
    .then((data) => {
      data = data.data

      post.id = data.id
      post.published_at = data.published_at
      post.updated_at = data.updated_at

      const postFr = data.translations.find(
        (translation) => translation.languages_id === "fr-FR"
      )
      const postEn = data.translations.find(
        (translation) => translation.languages_id === "en-US"
      )

      post.fr.title = postFr.title
      post.fr.description = postFr.description
      post.fr.content = postFr.content
      post.fr.tags = postFr.tags

      if (postEn && postEn.title && postEn.content) {
        post.en.title = postEn.title
        post.en.description = postEn.description
        post.en.content = postEn.content
        post.en.tags = postEn.tags
      } else {
        post.en.title = postFr.title
        post.en.description = postFr.description
        post.en.content = postFr.content
        post.en.tags = postFr.tags
      }

      state.value = "loaded"
    })
    .catch(() => {
      state.value = "not-found"

      setTimeout(() => {
        if (route.name === "blog-element" && route.params.id_blog === id)
          router.push({ name: "blog", params: { lang: lang.value } })
      }, 2000)
    })
}

watch(lang, () => {
  if (post.id) {
    document.title = `Catif - ${post[lang.value].title}`
    // remove <br> in description
    const description = post[lang.value].description.replace(/<br>/g, " ")
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", description)

    // set keywords
    const actualKeywords = document
      .querySelector('meta[name="keywords"]')
      .getAttribute("content")
    const keywords = post[lang.value].tags.join(", ")
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", `${actualKeywords}, ${keywords}`)
  }
})

onMounted(() => {
  const id = route.params.id_blog

  if (!id) router.push({ name: "blog", params: { lang: lang.value } })

  getPost(id).then(() => {
    document.title = `Catif - ${post[lang.value].title}`
    // remove <br> in description
    const description = post[lang.value].description.replace(/<br>/g, " ")
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", description)

    // set keywords
    const actualKeywords = document
      .querySelector('meta[name="keywords"]')
      .getAttribute("content")
    const keywords = post[lang.value].tags.join(", ")
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", `${actualKeywords}, ${keywords}`)
  })
})
</script>

<template>
  <section id="Post">
    <!-- LOADING -->
    <template v-if="state === 'loading'">
      <div class="loading">
        <div class="loading__text">
          {{ $t("divers.loading") }}
        </div>
      </div>
    </template>

    <!-- NOT FOUND -->
    <template v-else-if="state === 'not-found'">
      <div class="not-found">
        <div class="not-found__text">
          {{ $t("blog.post-not-found") }}
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
              {{ timeToRead }} {{ $t("blog.minutes-read") }}
            </span>
          </h1>
          <div class="Post__header__dates">
            <span class="created">
              {{ $t("blog.created-at") }} {{ published_at }}
            </span>
            <span v-if="updated_at !== published_at" class="updated">
              {{ $t("blog.updated-at") }} {{ updated_at }}
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
        color: v.$color-font;
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
      color: v.$color-font;
      opacity: 0.7;
    }
  }
}
</style>
