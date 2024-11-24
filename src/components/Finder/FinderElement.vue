<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
  focusElement: {
    type: Function,
    required: true,
  },
  elementFocus: {
    type: Object,
    required: true,
    deep: true,
  },
  openElement: {
    type: Function,
    required: true,
  },
})

const route = useRoute()
const lang = computed(() => (route.params.lang ? route.params.lang : "fr"))
const elementComputed = computed(() => {
  const elementTemp = props.element

  const elementFr = elementTemp.translations.find(
    (translation) => translation.languages_code === "fr-FR"
  )
  const elementEn = elementTemp.translations.find(
    (translation) => translation.languages_code === "en-US"
  )

  elementTemp.fr = {
    title: elementFr.title,
    description: elementFr.description,
    tags: elementFr.tags,
  }
  elementTemp.onlyFr = true

  if (elementEn && elementEn.title && elementEn.description && elementEn.tags) {
    elementTemp.en = {
      title: elementEn.title,
      description: elementEn.description,
      tags: elementEn.tags,
    }
    elementTemp.onlyFr = false
  } else {
    elementTemp.en = {
      title: elementFr.title,
      description: elementFr.description,
      tags: elementFr.tags,
    }
  }

  return elementTemp
})
</script>

<template>
  <div
    class="element"
    :class="{ active: elementFocus.id === elementComputed.id }"
  >
    <img
      src="/img/folder_mac.png"
      alt="folder"
      @click="focusElement(elementComputed)"
      @dblclick="openElement(elementComputed)"
    />
    <div class="element__name">
      <p
        @click="focusElement(elementComputed)"
        @dblclick="openElement(elementComputed)"
      >
        {{ elementComputed[lang].title }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.element {
  position: relative;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;

  img {
    height: 112px;
    padding: 1rem 0.5rem;
    border-radius: 5px;
    cursor: pointer;
  }

  &__name {
    width: 100%;
    text-align: center;

    p {
      cursor: pointer;
      display: inline;
      color: white;
      font-size: 1rem;
      text-align: center;
      font-weight: 300;
      border-radius: 5px;
      line-height: 1.13;

      -webkit-box-decoration-break: clone;
      -ms-box-decoration-break: clone;
      -o-box-decoration-break: clone;
      box-decoration-break: clone;
      padding-inline: 0.25rem;
    }
  }

  &.active {
    img {
      background-color: #393a3b;
    }

    p {
      background-color: #0158d0;
    }
  }
}
</style>
