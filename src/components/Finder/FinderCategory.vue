<script setup>
import FinderCategoryElement from './FinderCategoryElement.vue'

const props = defineProps({
  category: {
    type: Object,
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
</script>



<template>
  <div class="category">
    <p class="category__title">
      {{ $t(category.title) }}
    </p>
    <div class="category__elements">
      <template v-for="element in category.elements" :key="element.name">
        <FinderCategoryElement :element="element" :set-active-folder="setActiveFolder" :folder-active="folderActive" />
      </template>
    </div>
  </div>
</template>



<style lang="scss" scoped>
#finder {
  .category {
    user-select: none;

    width: 100%;
    &__title {
      padding: 0rem 0.75rem;
      opacity: 0.5;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }

    &__elements {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 0.25rem;
    }
}
}
</style>
