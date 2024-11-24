<script setup>
import { inject, ref } from "vue"

const disabledActions = ref(false)
const confetti = inject("confetti")

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
</script>

<template>
  <div class="list-actions">
    <span class="action close" @click="runConffeti" />
    <span class="action minimize" @click="runConffeti" />
    <span class="action maximize" @click="runConffeti" />
  </div>
</template>

<style lang="scss">
// button action top
$color-close-action: #fe5f57;
$color-minimize-action: #febc2e;
$color-maximize-action: #28c840;

#finder {
  .list-actions {
    padding: 0.25rem 0.75rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 10px;

    .action {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: white;
      cursor: pointer;
    }

    .close {
      background-color: $color-close-action;
    }

    .minimize {
      background-color: $color-minimize-action;
    }

    .maximize {
      background-color: $color-maximize-action;
    }
  }
}
</style>
