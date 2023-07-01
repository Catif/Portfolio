<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div id="choiceLanguage">
    <template v-if="route.params.lang === 'fr'">
      <router-link :to="{ name: 'home', params: { lang: 'en' } }">
        <img src="/img/locales/en.webp">
      </router-link>
    </template>
    <template v-else>
      <router-link :to="{ name: 'home', params: { lang: 'fr' } }">
        <img src="/img/locales/fr.webp">
      </router-link>
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
  a {
    width: 40px;
    height: 23px;
    padding: 0;
    margin: 0;
  }
}
</style>
