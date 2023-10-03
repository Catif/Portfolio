<script setup>
import { onMounted, ref, watch } from 'vue'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

const props = defineProps({
  markdown: {
    type: String,
    required: true,
  },
})
const outputMarkdown = ref(null)
const marked = ref(null)

watch(() => props.markdown, (markdown) => {
  if (marked.value === null)
    return
  generateMarkdown(markdown)
})


function generateMarkdown(markdown) {
  outputMarkdown.value.innerHTML = ''

  const contentHtml = marked.value.parse(markdown)

  const divParent = document.createElement('div')
  divParent.innerHTML = contentHtml

  const listCode = divParent.querySelectorAll('code')

  listCode.forEach((code) => {
    const basicCode = code.innerHTML
    const codeTextOnly = code.innerText
    code.innerHTML = ''
    code.appendChild(generateHeader(code, codeTextOnly))
    code.appendChild(generateLines(basicCode))
    code.appendChild(generateFooter(code))
    return true
  })

  outputMarkdown.value.appendChild(divParent)
}

function generateHeader(code, codeTextOnly) {
  const el = document.createElement('div')
  el.classList.add('code-header')
  el.appendChild(generateLanguage(code))
  el.appendChild(generateCopyButton(codeTextOnly))

  return el
}

function generateFooter(code) {
  const div = document.createElement('div')
  div.classList.add('code-footer')

  return div
}

function generateLanguage(code) {
  const el = document.createElement('div')
  el.classList.add('language')
  el.innerText = code.classList[0].split('-')[1]
  return el
}

function generateCopyButton(codeTextOnly) {
  const button = document.createElement('button')
  button.classList.add('copy-button')
  button.innerText = 'copy'
  button.addEventListener('click', () => {
    navigator.clipboard.writeText(codeTextOnly)
  })
  return button
}

function generateLines(code) {
  // Create body of <code> balise
  const contentEl = document.createElement('div')
  contentEl.classList.add('code-content')

  // Split code by line
  const listSplitCode = code.split('\n')

  // For each line
  listSplitCode.forEach((line, index) => {
    // If last line, don't add (void line)
    if (listSplitCode.length - 1 === index)
      return

    // Create div for one line
    const lineEl = document.createElement('div')
    lineEl.classList.add('line')

    // Create number of the line
    const lineNumber = index + 1
    const numberEl = document.createElement('span')
    numberEl.classList.add('number')
    numberEl.innerText = lineNumber
    lineEl.appendChild(numberEl)

    // Create content of the line
    const lineContentEl = document.createElement('div')
    lineContentEl.classList.add('line-content')
    lineContentEl.innerHTML = line
    lineEl.appendChild(lineContentEl)

    // Add line to the body of <code> balise
    contentEl.appendChild(lineEl)
  })

  // Return body of <code> balise
  return contentEl
}


onMounted(() => {
  marked.value = new Marked(
    markedHighlight({
      prefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      },
    }),
  )

  const renderer = new marked.value.Renderer()
  renderer.link = (href, title, text) => `<a target="_blank" href="${href}">${text}</a>`

  // Marked settings
  marked.value.setOptions({
    mangle: false,
    headerIds: false,
    renderer,
  })

  generateMarkdown(props.markdown)
})
</script>



<template>
  <div ref="outputMarkdown" class="Markdown" />
</template>



<style lang="scss">
@import '@/assets/highlightjs/github-dark-dimmed.css';

.Markdown {
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 6rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  hr {
    border: 1px solid $color-font;
    opacity: 0.2;
    margin: 1.5rem 0;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
    text-align: justify;
  }

  a {
    color: $color-link;

    &:hover {
      color: $color-link-hover;
    }
  }

  p:has(img) {
    text-align: center;
  }
  img {
    width: 90%;
    max-width: fit-content;
    height: auto;
    border-radius: 5px;
  }

  ul {
    list-style: disc;
    margin-left: 2rem;

    li {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 0.5rem;
    }

    ul {
      list-style: circle;
    }
  }

  pre {
    background-color: $color-secondary-background;
    font-family: $font-family-mono;
    font-size: .9em;
    width: 100%;
    border-radius: 5px;
    white-space: pre-wrap;
    margin-bottom: 2rem;
    border: 1px solid $color-font;
    opacity: 0.9;

    code {
      display: flex;
      gap: 1rem;
      flex-direction: column;
    }

    .code-header {
      width: 100%;
      border-bottom: 1px solid $color-font;
      padding: .5rem 1rem;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .copy-button {
        background-color: $color-secondary-background;
        border: 1px solid $color-font;
        border-radius: 5px;
        padding: .5rem 1rem;
        cursor: pointer;
        transition: all .2s ease-in-out;
        color: $color-font;
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }
      }
    }

    .code-content {
      display: flex;
      flex-direction: column;
      gap: 0px;
      overflow-x: auto;
      white-space: pre;
    }

    .line {
      display: flex;

      .number {
        display: inline-block;
        min-width: 4rem;
        margin-right: 1rem;
        border-right: 1px solid $color-font;
        padding: 0 1rem;
        text-align: right;

        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
  }
}
</style>
