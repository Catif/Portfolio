<script setup>
import WindowActions from "./WindowActions.vue"
import FinderCategory from "./FinderCategory.vue"
import FinderElement from "./FinderElement.vue"

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  projects: {
    type: Array,
    required: true,
  },
  folderActive: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(["setActiveFolder"])

const router = useRouter()
const route = useRoute()
const elementFocus = ref(null)
const lang = computed(() => (route.params.lang ? route.params.lang : "fr"))

function focusElement(element) {
  if (!element.id) {
    elementFocus.value = null
    return
  }

  elementFocus.value = element
}

function openElement(element) {
  if (!element.id) return

  router.push({
    name: "portfolio-element",
    params: {
      lang: route.params.lang,
      id_project: element.id,
    },
  })
}
</script>

<template>
  <div id="finder">
    <div class="left-side">
      <WindowActions />
      <div class="categories">
        <template
          v-for="category in categories"
          :key="category.title"
        >
          <FinderCategory
            :category="category"
            :folder-active="folderActive"
            @setActiveFolder="emits('setActiveFolder', $event)"
          />
        </template>
      </div>
    </div>
    <div
      class="right-side"
      @click="focusElement({})"
    >
      <div class="right-side__header">
        <h2>{{ $t("project.title") }}</h2>
      </div>

      <div class="right-side__content">
        <template
          v-for="project in props.projects"
          :key="project.blog_id"
        >
          <FinderElement
            :element="project"
            :element-focus="elementFocus"
            @focusElement="focusElement"
            @openElement="openElement"
          />
        </template>
      </div>
    </div>

    <div
      class="panel"
      v-if="elementFocus"
    >
      <div class="panel__technologies">
        <span
          v-for="tag in elementFocus[lang].tags"
          :key="tag"
        >
          {{ tag }}
        </span>
      </div>

      <div class="panel__pictures">
        <img
          v-for="picture in elementFocus.pictures"
          :key="picture"
          :src="picture"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// color mac folder
$background-categories: hsl(219, 24%, 18%);
$background-folder: #232527;

#finder {
  font-family: "San Francisco";

  background-color: $background-folder;
  border-radius: 10px;
  width: 100%;
  height: 100vh;
  max-height: 650px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  border: 1px solid rgba(128, 128, 128, 0.5);

  .left-side {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.75rem 0.5rem;
    background-color: $background-categories;
    width: 130px;
    border-right: 1px solid rgba(0, 0, 0, 0.8);

    .categories {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
    }
  }

  .right-side {
    flex: 1;
    padding: 1rem 0.5rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    &__header {
      padding-bottom: 0.5rem;
    }

    &__content {
      padding-top: 1.5rem;
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 2rem;

      .projectCard {
        margin-bottom: 20px;
        p {
          color: white;
          font-size: 1.2rem;
          text-align: center;
        }
      }
    }
  }

  .panel {
    width: 50%;
    max-width: 500px;
    padding: 1rem 0.5rem;
    background-color: $background-categories;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__technologies {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 10px;
      max-height: 66px;
      width: 100%;

      span {
        font-size: 0.9rem;
        font-weight: 400;
        color: v.$color-font;
        background-color: color.adjust(
          v.$color-secondary-background,
          $alpha: 0.5
        );
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid color.adjust(v.$color-background, $lightness: 10%);

        &:hover {
          background-color: color.adjust(v.$color-background, $lightness: 10%);
        }
      }
    }

    &__pictures {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: center;

      img {
        height: 400px;
        width: inherit;
        object-fit: cover;
        border-radius: 5px;
        transition: transform 0.3s;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .panel {
    display: none;
  }
}
</style>
