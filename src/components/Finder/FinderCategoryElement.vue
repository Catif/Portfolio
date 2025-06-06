<script setup>
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
  folderActive: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(["setActiveFolder"])
</script>

<template>
  <div
    class="category__element"
    :class="{ active: folderActive === element.name }"
    @click="emits('setActiveFolder', element.name)"
  >
    <img
      :src="element.icon"
      alt="folder"
    />
    <p>{{ element.name }}</p>
  </div>
</template>

<style lang="scss" scoped>
#finder {
  .category__element {
    padding: 0.25rem 0.75rem;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    img {
      height: 0.8rem;
    }

    &.active {
      background-color: #3a4559;
    }
  }
}
</style>
