<script setup>
import Terminal from "@/components/terminal/index.vue"

const emits = defineEmits(["autorizeScroll"])

const actualRouteCodeTrad = ref("")
const router = useRouter()
const isModalOpen = ref(true)

watch(router.currentRoute, (route) => {
  actualRouteCodeTrad.value = route.meta.navbarCode
})

watch(isModalOpen, (isOpen) => {
  emits("autorizeScroll", !isOpen)
})
</script>

<template>
  <nav>
    <div id="name">
      <router-link to="/">
        <span id="user">bradley@barbier</span>
        <span id="colon">:</span>
        <span id="action"
          >~/
          <transition name="fade" mode="out-in">
            <span
              v-if="actualRouteCodeTrad"
              :key="actualRouteCodeTrad"
              v-html="$t(actualRouteCodeTrad)"
            />
          </transition>
        </span>
      </router-link>
    </div>

    <div id="menu">
      <span>cd</span>
      <span @click="isModalOpen = true">...</span>
    </div>
  </nav>

  <Terminal :is-modal-open="isModalOpen" @close="isModalOpen = false" />
</template>

<style lang="scss" scoped>
nav {
  background: v.$color-background-nav;
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  z-index: 100;

  color: v.$color-link-nav;

  #name {
    font-family: v.$font-family-mono;
    font-size: 1.4rem;
    font-weight: 600;

    #user {
      color: hsl(120, 80%, 75%);
    }

    #colon {
      color: #ccc;
    }

    #action {
      color: v.$color-link-nav;
    }
  }

  #menu {
    font-family: v.$font-family-mono;
    display: flex;
    gap: 20px;
    font-size: 1.3rem;
    font-weight: 600;

    &:hover {
      a {
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }
      }
    }

    span:first-child {
      color: #ccc;
      margin-right: 10px;
    }
    span:last-child {
      cursor: pointer;
    }
  }
}
</style>
