<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  blog: Object,
})

const route = useRoute()

const blogComputed = computed(() => {
  const blogTemp = props.blog

  const blogFr = blogTemp.translations.find(translation => translation.languages_id === 'fr-FR')
  const blogEn = blogTemp.translations.find(translation => translation.languages_id === 'en-US')

  blogTemp.fr = {
    title: blogFr.title,
    description: blogFr.description,
    tags: blogFr.tags,
  }
  blogTemp.onlyFr = true

  if (blogEn && blogEn.title && blogEn.description && blogEn.tags) {
    blogTemp.en = {
      title: blogEn.title,
      description: blogEn.description,
      tags: blogEn.tags,
    }
    blogTemp.onlyFr = false
  }
  else {
    blogTemp.en = {
      title: blogFr.title,
      description: blogFr.description,
      tags: blogFr.tags,
    }
  }

  return blogTemp
})

const lang = computed(() => route.params.lang ? route.params.lang : 'fr')
const dateBlog = computed(() => new Date(props.blog.published_at).toLocaleDateString(lang.value))
</script>



<template>
  <router-link :to="{ name: 'blog-element', params: { lang, id_blog: blogComputed.id } }" class="blogCard">
    <h3 class="blogCard__title">
      {{ blogComputed[lang].title }}
      <span v-if="blogComputed.onlyFr" class="blogCard__title__onlyFr">
        No translation
      </span>
    </h3>
    <p class="blogCard__description">
      {{ blogComputed[lang].description }}
    </p>
    <div class="blogCard__footer">
      <div class="blogCard__footer__tags">
        <template v-for="tag in blogComputed[lang].tags" :key="tag">
          <span class="tag">
            {{ tag }}
          </span>
        </template>
      </div>
      <div class="blogCard__footer__date">
        {{ dateBlog }}
      </div>
    </div>
  </router-link>
</template>



<style lang="scss">
.blogCard {
  position: relative;
  cursor: pointer;
  width: 100%;
  padding: 1rem 2rem;
  background-color: v.$color-secondary-background;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s ease-in-out;
  z-index: 1;
  color: v.$color-font;

  &:hover {
    transform: scale(1.05);
    color: v.$color-font;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: v.$color-font;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;

    &__onlyFr {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.75rem;
      font-weight: 700;
      color: v.$color-font;
      opacity: 0.45;
      margin-left: 1rem;
    }
  }

  &__description {
    font-size: 1rem;
    font-weight: 400;
    color: v.$color-font;
    opacity: 0.7;
  }

  &__footer {
    padding-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    opacity: 0.45;

    &__tags {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      flex-wrap: wrap;

      .tag {
        padding: 0.5rem 1rem;
        background-color: v.$color-background;
        border: 1px solid v.$color-font;
        color: v.$color-font;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 700;
      }
    }
  }
}
</style>
