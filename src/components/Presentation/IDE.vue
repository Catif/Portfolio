<script setup>
import useMarkdown from "@/composables/useMarkdown"
import IDERow from "./IDERow.vue"

const disabledActions = ref(false)
const confetti = inject("confetti")
const bus = inject("bus")
const Markdown = useMarkdown()
const route = useRoute()

function runConffeti() {
  if (disabledActions.value) return
  disabledActions.value = true

  const limitedInterval = setInterval(() => {
    confetti.addConfetti({
      confettiColors: ["#3d7eff", "#62aaa5", "#455555"],
      confettiRadius: 5,
      confettiNumber: 700,
    })
  }, 100)

  setTimeout(() => {
    disabledActions.value = false
    clearTimeout(limitedInterval)
  }, 1000)
}

const data = ref(null)

loadMarkdown(route.params.lang || "fr")

bus.on("changeLanguage", (lang) => {
  loadMarkdown(lang)
})

function loadMarkdown(lang) {
  Markdown.importMarkdown(lang, "presentation").then((markdownFormated) => {
    data.value = markdownFormated
  })
}
</script>

<template>
  <div id="IDE">
    <header>
      <p class="title">README.md</p>
      <div id="list-action">
        <div
          id="close"
          :title="$t('presentation.IDE.titleConfetti')"
          @click="runConffeti"
        />
        <div
          id="reduct"
          :title="$t('presentation.IDE.titleConfetti')"
          @click="runConffeti"
        />
        <div
          id="full"
          :title="$t('presentation.IDE.titleConfetti')"
          @click="runConffeti"
        />
      </div>
    </header>
    <div class="list-rows">
      <!-- $tm('presentation.IDE.listRows') -->
      <template v-if="data">
        <div
          v-for="(row, index) in data"
          :key="index"
          class="row"
        >
          <div class="number">
            <p>{{ index + 1 }}</p>
          </div>
          <IDERow :row="row" />
        </div>
      </template>
      <div
        v-else
        class="row"
      >
        <div class="number">
          <p>{{ 1 }}</p>
        </div>
        <p class="text">{{ $t("general.loading") }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#IDE {
  display: flex;
  flex-direction: column;

  background: #292d3e;

  border-radius: 5px;

  &:hover header {
    background: #222;
  }

  header {
    height: 35px;
    position: relative;
    width: 100%;
    background: #2c2c2c;
    border-radius: 5px 5px 0 0;
    transition: background 0.2s ease-in-out;

    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #eee;
    }

    #list-action {
      position: absolute;
      left: 15px;
      top: 0;
      height: 100%;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;
      gap: 10px;

      & > div {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        cursor: pointer;
      }

      #close {
        background-color: #ff5d59;
      }

      #reduct {
        background-color: #fdbf38;
      }

      #full {
        background-color: #24c841;
      }
    }
  }

  .list-rows {
    display: flex;
    flex-direction: column;
    padding: 10px 5px;
    overflow-y: auto;
    height: 300px;
    width: 100%;
    overflow-y: auto;

    .row {
      display: grid;
      grid-template-columns: 20px 1fr;
      grid-gap: 10px;
      font-family: v.$font-family-mono;

      .number {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        height: 100%;
        width: 100%;
        overflow: hidden;

        p {
          margin: 0;
          font-size: 0.85rem;
          font-weight: 400;
          color: #4c5063;
        }
      }
      .text {
        margin: 0;
        font-size: 0.85rem;
        font-weight: 400;
        color: #bfc7d5;
      }

      .tab {
        display: inline-block;
        width: 20px;
        height: 1px;
        background: transparent;
      }

      &:hover {
        .number {
          p {
            color: #fff;
          }
        }
        .text {
          background: #212432;
        }
      }
    }
  }

  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: hsl(229, 0%, 20%);
  }
  ::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 0%, 30%);
    border-radius: 0px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
