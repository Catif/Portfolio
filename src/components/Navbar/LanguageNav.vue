<script setup>
const bus = inject("bus")
const route = useRoute()
const router = useRouter()

function changeLanguage(lang) {
  const currentRoute = route.name
  if (lang === "fr") {
    router.push({ name: currentRoute, params: { lang: "fr" } })
    bus.emit("changeLanguage", "fr")
  } else {
    router.push({ name: currentRoute, params: { lang: "en" } })
    bus.emit("changeLanguage", "en")
  }
}
</script>

<template>
  <div id="choiceLanguage">
    <template v-if="route.params.lang === 'en'">
      <button @click="changeLanguage('fr')">
        <img src="/img/locales/fr.webp" />
      </button>
    </template>
    <template v-else>
      <button @click="changeLanguage('en')">
        <img src="/img/locales/en.webp" />
      </button>
    </template>
  </div>
</template>

<style lang="scss" scoped>
#choiceLanguage {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  img {
    top: 0;
    left: 0;
    position: absolute;
    width: 40px;
    height: 23px;
  }
  button {
    cursor: pointer;
    width: 40px;
    height: 23px;
    padding: 0;
    margin: 0;
  }
}
</style>
