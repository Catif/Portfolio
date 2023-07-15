<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import LanguageNav from './assets/LanguageNav.vue'

const actualRouteCodeTrad = ref('')
const route = useRoute()

function changeRoute(name) {
  actualRouteCodeTrad.value = name
}
</script>

<template>
  <nav>
    <div id="name">
      <router-link to="/" @click="changeRoute('')">
        <span id="user">bradley@barbier</span>
        <span id="colon">:</span>
        <span id="action">~/
          <transition name="fade" mode="out-in">
            <span v-if="actualRouteCodeTrad" :key="actualRouteCodeTrad" v-html="$t(actualRouteCodeTrad)" />
          </transition>
        </span>
      </router-link>
    </div>

    <div id="menu">
      <span>cd</span>
      <router-link :to="{ name: 'home', params: { lang: route.params.lang } }" @click="changeRoute('navbar.home')">
        {{
          $t("navbar.home")
        }}
      </router-link>
      <router-link :to="{ name: 'portfolio', params: { lang: route.params.lang } }" @click="changeRoute('navbar.portfolio')">
        {{
          $t("navbar.portfolio")
        }}
      </router-link>
      <router-link :to="{ name: 'blog', params: { lang: route.params.lang } }" @click="changeRoute('navbar.blog')">
        {{
          $t("navbar.blog")
        }}
      </router-link>
      <LanguageNav />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  background: $color-background-nav;
  display: flex;
  position: sticky;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;

  color: $color-link-nav;

  #name {
    font-family: $font-family-mono;
    font-size: 1.4rem;
    font-weight: 600;

    #user {
      color: hsl(120, 80%, 75%);
    }

    #colon {
      color: #ccc;
    }

    #action {
      color: $color-link-nav;
    }
  }

  #menu {
    font-family: $font-family-mono;
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
    a {
      padding: 0px 10px;
      color: $color-link-nav;
    }
  }
}
</style>
