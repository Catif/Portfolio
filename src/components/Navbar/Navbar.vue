<script setup>
import Fastfetch from "@/components/terminal/Fastfetch.vue"
import LanguageNav from "@/components/Navbar/LanguageNav.vue"
import { nextTick } from "vue"

const actualRouteCodeTrad = ref("")
const router = useRouter()
const isModalOpen = ref(true)
const isActionFinish = ref(true)
const inputTermRef = useTemplateRef("inputTermRef")

const history = ref([])

const possiblesCommands = [
  {
    command: "help",
    data: {
      action: "text",
      description: "Display command list",
      callback: () => {
        console.log("callback help")
        return possiblesCommands
          .map((command) => {
            return `<span class="accent">${command.command}</span> - ${command.data.description || ""}`
          })
          .join("<br>")
      },
      callbackOutput: "",
    },
  },
  {
    command: "clear",
    data: {
      action: "text",
      description: "Clear terminal",
      callback: () => {
        history.value = []
        return "Terminal cleared"
      },
      callbackOutput: "",
    },
  },
  {
    // TODO: Implement route not found
    command: "cd",
    data: {
      action: "text",
      description: "Change page",
      callback: (args) => {
        const routeName = args[0] || "home"
        router.push({
          name: routeName,
          params: { lang: router.currentRoute.value.params.lang },
        })

        return `Moving to ${routeName} page`
      },
      callbackOutput: "",
    },
  },
  {
    command: "fastfetch",
    data: {
      action: "component",
      component: Fastfetch,
      description: "Display user information",
    },
  },
  {
    command: "exit",
    data: {
      action: "text",
      description: "Close terminal",
      callback: () => {
        isModalOpen.value = false
        return "Terminal closed"
      },
      callbackOutput: "",
    },
  },
]

watch(router.currentRoute, (route) => {
  actualRouteCodeTrad.value = route.meta.navbarCode
  isModalOpen.value = false
})

watch(isModalOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      inputTermRef.value.focus()
    })
  }
})

onMounted(() => {
  handleNewCommand("help")
})

function openModal() {
  isModalOpen.value = true
}

function createHistory(command, data) {
  console.log(`Command executed: ${command}`, data)

  data.callbackOutput = data.callback ? data.callback(data.args) : ""

  history.value.push({
    id: self.crypto.randomUUID(),
    command,
    data,
    timestamp: new Date().toISOString(),
  })
}

function findDataAction(command, args = []) {
  const foundedDataAction = possiblesCommands.find(
    (action) => action.command === command
  )?.data

  if (!foundedDataAction) {
    return {
      action: "unknown",
      args,
    }
  }

  foundedDataAction.args = args

  return foundedDataAction
}

function handleNewCommand(userCommand, event = null) {
  const allCommand = userCommand.trim()
  if (!allCommand) {
    return
  }

  isActionFinish.value = false

  const command = allCommand.split(" ")[0] // Get the first word as the command
  const args = allCommand.split(" ").slice(1) // Get the rest as arguments
  createHistory(command, findDataAction(command, args))

  setTimeout(() => {
    if (event) {
      event.target.value = ""
    }

    isActionFinish.value = true
    nextTick(() => {
      inputTermRef.value.focus()
    })
  }, 100)
}
</script>

<template>
  <nav>
    <div id="name">
      <router-link to="/">
        <span id="user">bradley@barbier</span>
        <span id="colon">:</span>
        <span id="action"
          >~/
          <transition
            name="fade"
            mode="out-in"
          >
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
      <span @click="openModal">...</span>
    </div>
  </nav>

  <div
    class="modal"
    v-show="isModalOpen"
    @keydown.esc="isModalOpen = false"
  >
    <div
      class="terminal"
      @click.stop="inputTermRef.focus()"
    >
      <!-- Fastfetch display -->
      <div
        class="line"
        v-for="line in history"
      >
        <div class="name">
          <span class="user">bradley@barbier</span>
          <span class="colon">:</span>
          <span class="directory">~/</span>
          <!-- TODO: Add arguments -->
          <span class="action">{{ line.command }}</span>
        </div>
        <div class="output">
          <component
            v-if="line.data.action === 'component'"
            :is="line.data.component"
          />

          <span
            v-else-if="line.data.action === 'text'"
            v-html="line.data.callbackOutput"
          />

          <span v-else-if="line.data.action === 'unknown'">
            <span>zsh: Command not found: </span>
            <span>{{ line.command }}</span>
          </span>
        </div>
      </div>

      <div
        class="line"
        v-show="isActionFinish"
      >
        <div class="name">
          <span class="user">bradley@barbier</span>
          <span class="colon">:</span>
          <span class="directory">~/</span>
          <input
            ref="inputTermRef"
            class="input"
            type="text"
            @keydown.enter="
              (event) => handleNewCommand(event.target.value, event)
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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

.modal {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  padding: 1rem 0.5rem;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);

  letter-spacing: -0.07rem;
  font-size: 0.9rem;

  .terminal {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: v.$font-family-mono;

    .line {
      .name {
        display: flex;
        gap: 3px;
        font-family: v.$font-family-mono;
        font-weight: 600;

        .user {
          color: hsl(120, 80%, 75%);
        }

        .colon,
        .action {
          color: #ccc;
        }

        .directory {
          color: v.$color-link-nav;
        }
      }

      .accent {
        color: #ec6a6a;
      }

      a {
        color: #ccc;
        text-decoration: underline;
      }

      .input {
        width: 100%;
        background: transparent;
        border: none;
        color: #ccc;
        font-family: v.$font-family-mono;
        font-weight: 600;
        outline: none;

        &::placeholder {
          color: #ccc;
          opacity: 0.5;
        }
      }
    }
  }

  .modal-content {
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    a {
      color: v.$color-link-nav;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
