<script setup>
import { ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import WindowActions from './WindowActions.vue'
import FinderCategory from './FinderCategory.vue'
import FinderElement from './FinderElement.vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  projects: {
    type: Array,
    required: true,
  },
  setActiveFolder: {
    type: Function,
    required: true,
  },
  folderActive: {
    type: String,
    required: true,
  },
})
const router = useRouter()
const route = useRoute()
const elementFocus = ref({})

function focusElement(element) {
  if (element.id) {
    setTimeout(() => {
      elementFocus.value = element
    }, 0)
  }
  elementFocus.value = element
}

function openElement(element) {
  if (element.id) {
    router.push({
      name: 'portfolio-element',
      params: {
        lang: route.params.lang,
        id_project: element.id,
      },
    })
  }
}
</script>



<template>
  <div id="finder">
    <div class="left-side">
      <WindowActions />
      <div class="categories">
        <template v-for="category in categories" :key="category.title">
          <FinderCategory :category="category" :set-active-folder="setActiveFolder" :folder-active="folderActive" />
        </template>
      </div>
    </div>
    <div class="right-side">
      <div class="right-side__header">
        <h2>{{ $t("project.title") }}</h2>
      </div>


      <div class="right-side__content" @click="focusElement({})">
        <template v-for="project in props.projects" :key="project.blog_id">
          <FinderElement :element="project" :focus-element="focusElement" :element-focus="elementFocus" :open-element="openElement" />
        </template>
      </div>
    </div>
  </div>
</template>



<style lang="scss">
@import 'src/assets/fonts/San_Francisco/sanfrancisco.css';

// color mac folder
$background-categories: hsl(219, 24%, 18%);
$background-folder: #232527;



#finder {
  font-family: "San Francisco";

  background-color: $background-folder;
  border-radius: 10px;
  width: 100%;
  height: 100%;
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
    padding: 0.75rem .5rem;
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

    &__header {
      padding-bottom: 0.5rem;
    }

    &__content {
      padding-top: 1.5rem;
      width: 100%;
      flex: 1;
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

}
</style>
