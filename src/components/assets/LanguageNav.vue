<script setup>
import { inject } from 'vue'
import { useRoute } from 'vue-router'

const bus = inject('bus')
const route = useRoute()

function changeLanguage(lang) {
  if (lang === 'fr')
    bus.emit('changeLanguage', 'fr')
  else
    bus.emit('changeLanguage', 'en')
}
</script>

<template>
  <div id="choiceLanguage">
    <template v-if="route.params.lang === 'en'">
      <router-link :to="{ name: 'home', params: { lang: 'fr' } }" @click="changeLanguage('fr')">
        <img src="/img/locales/fr.webp">
      </router-link>
    </template>
    <template v-else>
      <router-link :to="{ name: 'home', params: { lang: 'en' } }" @click="changeLanguage('en')">
        <img src="/img/locales/en.webp">
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
