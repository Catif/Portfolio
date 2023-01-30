<script setup>
import { ref } from "vue";

const actualRoute = ref("");

function changeRoute(name) {
  actualRoute.value = name;
}
</script>

<template>
  <nav>
    <div id="name">
      <router-link to="/" @click="changeRoute('')"
        ><span id="user">bradley@barbier</span>
        <span id="colon">:</span>
        <span id="action"
          >~/<transition name="slide" mode="out-in" appear
            ><span :key="actualRoute">{{ actualRoute + " $" }}</span></transition
          >
        </span>
      </router-link>
    </div>

    <div id="menu">
      <span>cd</span>
      <router-link to="/" @click="changeRoute('')">Who I'm ?</router-link>
      <router-link to="/portfolio" @click="changeRoute('Portfolio')">Portfolio</router-link>
      <router-link to="/blog" @click="changeRoute('Blog')">Blog</router-link>
      <router-link to="/cv" @click="changeRoute('CV')">CV</router-link>
      <router-link to="/contact" @click="changeRoute('Contact')">Contact</router-link>
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
      color: $color-link;
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
    gap: 15px;
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
