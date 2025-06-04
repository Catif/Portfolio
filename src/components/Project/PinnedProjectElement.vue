<script setup>
import Markdown from "@/components/assets/Markdown.vue"

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
const lang = computed(() => (route.params.lang ? route.params.lang : "fr"))

const projectComputed = computed(() => {
  const projectTemp = props.project

  const projectFr = projectTemp.translations.find(
    (translation) => translation.languages_code === "fr-FR"
  )
  const projectEn = projectTemp.translations.find(
    (translation) => translation.languages_code === "en-US"
  )

  projectTemp.fr = {
    title: projectFr.title,
    description: projectFr.description,
    tags: projectFr.tags,
  }

  if (projectEn && projectEn.title && projectEn.description && projectEn.tags) {
    projectTemp.en = {
      title: projectEn.title,
      description: projectEn.description,
      tags: projectEn.tags,
    }
  } else {
    projectTemp.en = {
      title: projectFr.title,
      description: projectFr.description,
      tags: projectFr.tags,
    }
  }

  return projectTemp
})
</script>

<template>
  <div class="pinnedProject">
    <div class="pinnedProject__image">
      <img
        :src="`https://api.catif.dev/assets/${projectComputed.main_picture}`"
        alt="project image"
      />
    </div>

    <div class="pinnedProject__side">
      <div class="pinnedProject__side__header">
        <h3 :title="projectComputed[lang].title">
          {{ projectComputed[lang].title }}
        </h3>
        <img
          v-if="projectComputed.is_solo_project"
          src="/img/icons/user.svg"
          alt="solo icon"
          title="Solo project"
        />
        <img
          v-else
          src="/img/icons/team.svg"
          alt="team icon"
          title="Team project"
        />
      </div>

      <Markdown :markdown="projectComputed[lang].description" />

      <div class="pinnedProject__side__technologies">
        <span
          v-for="tag in projectComputed[lang].tags"
          :key="tag"
        >
          {{ tag }}
        </span>
      </div>

      <div class="pinnedProject__side__footer">
        <a
          v-if="projectComputed.github_link"
          :href="projectComputed.github_link"
          target="_blank"
        >
          <img src="/img/icons/github-mark.svg" />
          Github
        </a>

        <router-link
          :to="{
            name: 'portfolio-element',
            params: { lang, id_project: projectComputed.id },
          }"
        >
          {{ $t("project.see-more") }}
          <img src="/img/icons/arrow-right.svg" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.pinnedProject {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 30px;
  padding: 20px 0px;
  width: 100%;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  &__image {
    width: 100%;
    max-width: 500px;
    height: auto;
    overflow: hidden;
    border-radius: 5px;

    aspect-ratio: 16 / 9;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__side {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 500px;

    &__header {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      h3 {
        font-size: 1.5rem;
        font-weight: 500;
        color: v.$color-font;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      img {
        width: 20px;
        height: 20px;
        filter: brightness(0) invert(0.9);
      }
    }

    p {
      font-size: 1rem;
      font-weight: 300;
      color: v.$color-font;
      margin: 0px;
      margin-bottom: 0;

      max-height: 100px;
    }

    &__technologies {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 10px;
      max-height: 66px;
      overflow-y: auto;
      width: 100%;

      span {
        font-size: 0.9rem;
        font-weight: 400;
        color: v.$color-font;
        background-color: v.$color-secondary-background;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid color.adjust(v.$color-background, $lightness: 10%);

        &:hover {
          background-color: color.adjust(v.$color-background, $lightness: 10%);
        }
      }
    }

    &__footer {
      flex: 1;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: flex-end;

      a {
        width: 100%;
        color: v.$color-font;
        background-color: hsla(0, 0%, 30%, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0px;
        border-radius: 5px;

        img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
          margin-left: 10px;
          filter: brightness(0) invert(0.9);
          transition: all 0.2s ease-in-out;
        }

        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: color.adjust(v.$color-background, $lightness: 10%);
        }
      }
    }
  }
}
</style>
