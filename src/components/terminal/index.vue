<script setup>
import Fastfetch from "@/components/terminal/Fastfetch.vue"
import { nextTick } from "vue"

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(["close"])

const router = useRouter()
const isActionFinish = ref(true)
const inputTermRef = useTemplateRef("inputTermRef")

const actualHistory = ref(undefined)
const history = shallowRef([])
const historyShow = computed(() => {
  return history.value.filter((line) => !line.hide)
})

const possiblesCommands = [
  {
    command: "help",
    data: {
      action: "text",
      description: "Display command list",
      callback: () => {
        return possiblesCommands
          .sort((a, b) => a.command.localeCompare(b.command))
          .map((command) => {
            return `<span class="accent">${command.command}</span> - ${command.data.description || ""}`
          })
          .join("<br>")
      },
      callbackOutput: "",
    },
  },
  {
    command: "ls",
    data: {
      action: "text",
      description: "List available commands",
      callback: () => {
        return router
          .getRoutes()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((route) => {
            let output = `<span class="accent">${route.name}</span> => `

            const listParams = route.path
              .split("/")
              .filter((part) => part.startsWith(":"))
              .sort((a, b) => {
                // When ? is at the end of the parameter, treat it as optional
                const aIsOptional = a.endsWith("?")
                const bIsOptional = b.endsWith("?")
                if (aIsOptional && !bIsOptional) return 1
                if (!aIsOptional && bIsOptional) return -1
                return a.localeCompare(b)
              })
            if (listParams.length > 0) {
              output += `(${listParams
                .map((param) => {
                  return param.replace(/^:/, "--")
                })
                .join(", ")})`
            }

            return output
          })
          .join("<br>")
      },
    },
  },
  {
    command: "clear",
    data: {
      action: "text",
      description: "Clear terminal",
      afterCallback: () => {
        history.value = history.value.map((line) => {
          line.hide = true
          return line
        })
      },
      callbackOutput: "",
    },
  },
  {
    command: "cd {route_name}",
    data: {
      action: "text",
      description: "Change page",
      callback: (args) => {
        // cd
        // cd route.name --params1=value1 --params2 value2
        // cd portfolio-element --id_project=1
        // cd portfolio-element --id_project 1
        const routeName = args.commandArguments.route_name ?? "home"

        // Check if the route exists
        const route = router
          .getRoutes()
          .find((route) => route.name === routeName)
        if (!route) {
          return `<span class='accent'>cd</span>: no such route named <span class='accent'>${routeName}</span>. You can use <span class='accent'>ls</span> to see available routes.`
        }

        const listObligatoryParams = route.path
          .split("/")
          .filter((part) => part.startsWith(":") && !part.endsWith("?"))

        if (listObligatoryParams.length > 0) {
          // Check if all obligatory params are provided
          for (const param of listObligatoryParams) {
            const paramName = param.replace(/^:/, "")
            if (!args.flags[paramName]) {
              return `<span class='accent'>cd</span>: missing required parameter <span class='accent'>--${paramName}</span>.`
            }
          }
        }

        // Navigate with params
        router.push({
          name: routeName,
          params: {
            lang: router.currentRoute.value.params.lang,
            ...args.flags,
          },
        })

        emits("close")

        return
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
        emits("close")
        return "Terminal closed"
      },
      callbackOutput: "",
    },
  },
]

watch(
  () => props.isModalOpen,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        inputTermRef.value.focus()
      })
    }
  }
)

onMounted(() => {
  handleNewCommand("help")
})

function handleNewCommand(userCommand, event = null) {
  actualHistory.value = undefined

  const allCommand = userCommand.trim()
  if (!allCommand) {
    return
  }

  isActionFinish.value = false

  const parsed = parseCommand(allCommand)

  const dataCommand = findDataAction(parsed)

  createHistory(parsed.full_command, dataCommand)

  if (event) {
    event.target.value = ""
  }

  isActionFinish.value = true
  nextTick(() => {
    inputTermRef.value.focus()
  })
}

function parseCommand(input) {
  const result = {
    full_command: input,
    command: input.split(" ")[0],
    commandArguments: {},
    flags: {},
  }

  const commandDef = possiblesCommands.find((cmd) =>
    input.startsWith(cmd.command.split(" ")[0])
  )

  if (!commandDef) {
    return {
      full_command: input,
      command: input,
      commandArguments: {},
      flags: {},
    }
  }

  const templateArgs = [...commandDef.command.matchAll(/{(\w+)}/g)].map(
    (m) => m[1]
  )

  const tokens = input.match(/(?:[^\s"]+|"[^"]*")+/g)

  // On récupère les arguments obligatoires
  let requiredIndex = 1
  for (const argName of templateArgs) {
    if (tokens[requiredIndex]) {
      result.commandArguments[argName] = tokens[requiredIndex].replace(
        /^"|"$/g,
        ""
      )
      requiredIndex++
    }
  }

  // Ensuite, on récupère les options (facultatives)
  for (let i = requiredIndex; i < tokens.length; i++) {
    if (tokens[i].startsWith("--")) {
      let key = tokens[i].replace(/^--/, "")
      let value = true // Valeur par défaut si pas de valeur fournie

      // --params value
      if (tokens[i + 1] && !tokens[i + 1].startsWith("--")) {
        value = tokens[i + 1].replace(/^"|"$/g, "")
        i++ // On saute la valeur
      }
      // --params=value
      else if (tokens[i].includes("=")) {
        const parts = tokens[i].split("=")
        if (parts.length > 1) {
          value = parts[1].replace(/^"|"$/g, "")
        }

        key = parts[0].replace(/^--/, "")
      }

      result.flags[key] = value
    }
  }

  return result
}

function findDataAction(parsedCommand) {
  const foundedDataAction = possiblesCommands.find(
    (action) => action.command.split(" ")[0] === parsedCommand.command
  )?.data

  if (!foundedDataAction) {
    return {
      action: "unknown",
      args: {
        commandArguments: parsedCommand.commandArguments,
        flags: parsedCommand.flags,
      },
    }
  }

  const newDataAction = {
    ...foundedDataAction,
    args: {
      commandArguments: parsedCommand.commandArguments,
      flags: parsedCommand.flags,
    },
  }

  return newDataAction
}

function createHistory(command, data) {
  data.callbackOutput = data.callback ? data.callback(data.args) : ""

  history.value = [
    ...history.value,
    {
      id: self.crypto.randomUUID(),
      command,
      data,
      hide: false,
      timestamp: new Date().toISOString(),
    },
  ]

  data.afterCallback?.(data.args)
}

function handleKey(event) {
  switch (event.key) {
    case "ArrowUp":
      handleHistoryNavigation(-1)
      break
    case "ArrowDown":
      handleHistoryNavigation(1)
      break
    case "Enter":
      handleNewCommand(event.target.value, event)
      break
  }
}

function handleHistoryNavigation(direction) {
  // cancel action if the input is not in history mode and try to go down
  if (actualHistory.value === undefined && direction === 1) {
    return
  }

  // start with the last command in history
  if (actualHistory.value === undefined) {
    actualHistory.value = history.value.length - 1
  } else {
    actualHistory.value += direction
  }

  // if we go too down, stop the history mode
  if (actualHistory.value > history.value.length) {
    actualHistory.value = undefined
    inputTermRef.value.value = ""
    return
  }

  // oldest command
  if (actualHistory.value < 0) {
    actualHistory.value = 0
  }

  const command = history.value[actualHistory.value]?.command || ""

  inputTermRef.value.value = command
  inputTermRef.value.focus()
  requestAnimationFrame(() => {
    inputTermRef.value.setSelectionRange(command.length, command.length)
  })
}
</script>

<template>
  <div class="modal" v-show="props.isModalOpen" @keydown.esc="emits('close')">
    <div class="terminal" @click.stop="inputTermRef.focus()">
      <div class="line" v-for="line in historyShow" :key="line.id">
        <div class="name">
          <span class="user">bradley@barbier</span>
          <span class="colon">:</span>
          <span class="directory">~/</span>
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
            <span>
              <span class="accent">zsh</span>: Command not found:
              {{ line.command }}
            </span>
            <br />
            <span>
              Try <span class="accent">help</span> to see available commands.
            </span>
          </span>
        </div>
      </div>

      <div class="line" v-show="isActionFinish">
        <div class="name">
          <span class="user">bradley@barbier</span>
          <span class="colon">:</span>
          <span class="directory">~/</span>
          <input
            ref="inputTermRef"
            class="input"
            type="text"
            @keydown="handleKey"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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

  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);

  letter-spacing: -0.07rem;

  .terminal {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-family: v.$font-family-mono;
    overflow: auto;

    .line {
      .name {
        display: flex;
        align-items: center;
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
        font-size: 1rem;
        padding: 0;
        height: 17.6px;
        letter-spacing: -0.07rem;

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
