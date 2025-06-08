<script setup>
import Markdown from "../components/assets/Markdown.vue"

const route = useRoute()
const router = useRouter()
const api = inject("api")
const project = reactive({
  id: null,
  main_picture: null,
  is_solo_project: null,
  done_at: null,

  fr: {
    title: null,
    description: null,
    content: null,
    tags: [],
  },
  en: {
    title: null,
    description: null,
    content: null,
    tags: [],
  },
})
const lang = computed(() => (route.params.lang ? route.params.lang : "fr"))
const state = ref("loading")
const contentMarkdown = computed(() => project[lang.value].content)
const done_in = computed(() => {
  const date = new Date(project.done_at)
  const month = date.toLocaleString(lang.value, { month: "long" })
  const year = date.getFullYear()

  return `${month} ${year}`
})
const timer = ref(3)
const interval = ref(null)

watch(lang, () => {
  if (project?.id) {
    document.title = `Catif - ${project[lang.value].title}`
    // remove <br> in description
    const description = project[lang.value].description.replace(/<br>/g, " ")
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", description)

    // set keywords
    const actualKeywords = document
      .querySelector('meta[name="keywords"]')
      .getAttribute("content")
    const keywords = project[lang.value].tags.join(", ")
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", `${actualKeywords}, ${keywords}`)
  }
})

watch(
  () => route.params.id_project,
  async (id) => {
    if (!id) router.push({ name: "portfolio", params: { lang: lang.value } })

    const isOk = await getProject(id)

    if (!isOk) {
      return
    }

    document.title = `Catif - ${project[lang.value].title}`
    // remove <br> in description
    const description = project[lang.value].description.replace(/<br>/g, " ")
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", description)

    // set keywords
    const actualKeywords = document
      .querySelector('meta[name="keywords"]')
      .getAttribute("content")
    const keywords = project[lang.value].tags.join(", ")
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", `${actualKeywords}, ${keywords}`)
  },
  { immediate: true }
)

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value)
})

async function getProject(id) {
  try {
    const { data: response } = await api.get(
      `/items/project/${id}?fields=*,translations.*`
    )

    const data = response.data

    project.id = data.id
    project.main_picture = data.main_picture
    project.is_solo_project = data.is_solo_project
    project.done_at = data.done_at

    const projectFr = data.translations.find(
      (translation) => translation.languages_code === "fr-FR"
    )
    const projectEn = data.translations.find(
      (translation) => translation.languages_code === "en-US"
    )

    project.fr = {
      title: projectFr.title,
      description: projectFr.description,
      content: projectFr.content,
      tags: projectFr.tags,
    }

    if (projectEn && projectEn.title && projectEn.content && projectEn.tags) {
      project.en = {
        title: projectEn.title,
        description: projectEn.description,
        content: projectEn.content,
        tags: projectEn.tags,
      }
    } else {
      project.en = {
        title: projectFr.title,
        description: projectFr.description,
        content: projectFr.content,
        tags: projectFr.tags,
      }
    }

    state.value = "loaded"
    return true
  } catch (error) {
    console.log("getProject cached", error)

    if (error.response.status === 403) {
      notFound()
      return false
    }
  }
}

function notFound() {
  state.value = "not-found"

  timer.value = 3
  interval.value = setInterval(() => {
    console.log(timer.value)
    if (timer.value <= 0) {
      clearInterval(interval)
      return
    }
    timer.value -= 1
  }, 1000)

  setTimeout(() => {
    router.push({ name: "portfolio", params: { lang: lang.value } })
  }, timer.value * 1000)
}
</script>

<template>
  <section id="Project">
    <!-- LOADING -->
    <template v-if="state === 'loading'">
      <div class="loading">
        <div class="loading__text">
          {{ $t("divers.loading") }}
        </div>
      </div>
    </template>

    <!-- NOT FOUND -->
    <template v-else-if="state === 'not-found'">
      <div class="not-found">
        <div class="not-found__text">
          {{
            $t("project.project-not-found", {
              timer: timer,
            })
          }}
        </div>
      </div>
    </template>

    <!-- LOADED -->
    <template v-else>
      <article class="Project">
        <div class="Project__header">
          <h1 class="Project__header__title">
            {{ project[lang].title }}
          </h1>
          <div class="Project__header__list-info">
            <span class="team">
              <template v-if="project.is_solo_project">
                {{ $t("project.solo-project") }}
                <img src="/img/icons/user.svg" alt="solo icon" />
              </template>
              <template v-else>
                {{ $t("project.team-project") }}
                <img src="/img/icons/team.svg" alt="team icon" />
              </template>
            </span>
            <span v-if="project.done_at" class="date">
              {{ $t("project.done-in") }} : {{ done_in }}
            </span>
            <div class="tags">
              Tags :
              <template v-for="tag in project[lang].tags" :key="tag">
                <span class="tag">
                  {{ tag }}
                </span>
              </template>
            </div>
          </div>
          <div class="Project__header__picture">
            <img
              :src="`https://api.catif.dev/assets/${project.main_picture}`"
              alt="Project main picture"
            />
          </div>
        </div>
        <hr />
        <Markdown class="Project__content" :markdown="contentMarkdown" />
      </article>
    </template>
  </section>
</template>

<style lang="scss">
.Project {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  max-width: 900px;

  &__header {
    &__picture {
      margin-top: 2rem;

      width: 100%;
      height: 300px;
      border-radius: 0.5rem;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__title {
      font-size: 3rem;
      font-weight: 700;
    }

    &__list-info {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      color: v.$color-font;
      opacity: 0.7;
      text-underline-offset: 0.2rem;

      .team {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        img {
          width: 20px;
          height: 20px;
          filter: brightness(0) invert(0.9);
        }
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;

        .tag {
          padding: 0.2rem 0.5rem;
          border-radius: 0.5rem;
          color: v.$color-font;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid v.$color-font;
        }
      }
    }
  }

  hr {
    width: 100%;
    opacity: 0.2;
  }
}
</style>
