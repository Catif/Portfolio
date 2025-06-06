<script setup>
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
  elementFocus: {
    type: Object,
  },
})

const emits = defineEmits(["focusElement", "openElement"])

const route = useRoute()
const lang = computed(() => (route.params.lang ? route.params.lang : "fr"))
const elementComputed = computed(() => {
  const elementTemp = props.element

  const elementFr = {
    ...elementTemp.translations.find(
      (translation) => translation.languages_code === "fr-FR"
    ),
    main_picture: elementTemp.main_picture,
  }
  const elementEn = {
    ...elementTemp.translations.find(
      (translation) => translation.languages_code === "en-US"
    ),
    main_picture: elementTemp.main_picture,
  }

  elementTemp.onlyFr = true
  if (elementEn && elementEn.title && elementEn.description && elementEn.tags) {
    elementTemp.onlyFr = false
  }

  elementTemp.pictures = generateUrlPictures(elementFr)

  elementTemp.fr = {
    title: elementFr.title,
    description: elementFr.description,
    tags: elementFr.tags,
  }

  elementTemp.en = {
    title: elementEn.title || elementFr.title,
    description: elementEn.description || elementFr.description,
    tags: elementEn.tags || elementFr.tags,
  }

  return elementTemp
})

function generateUrlPictures(element) {
  const regex = /https:\/\/api.catif.dev\/assets\/[a-zA-Z0-9-]*/g
  const matches = element.content.match(regex) || []

  return ["https://api.catif.dev/assets/" + element.main_picture, ...matches]
}
</script>

<template>
  <div
    class="element"
    :class="{ active: elementFocus?.id === elementComputed.id }"
  >
    <img
      class="element__icon"
      src="/img/folder/folder_mac_minified.png"
      alt="folder"
      @click.stop="emits('focusElement', elementComputed)"
      @dblclick="emits('openElement', elementComputed)"
    />
    <div class="element__name">
      <p
        @click.stop="emits('focusElement', elementComputed)"
        @dblclick="emits('openElement', elementComputed)"
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

  .element__icon {
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

  &__pictures img {
    height: 200px;
    border-radius: 5px;
    transform: scale(0);
    transition: transform 0.3s;
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
